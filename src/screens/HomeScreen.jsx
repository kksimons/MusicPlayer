import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import Header from '../components/Header';
import SongCardWithCategory from '../components/SongCardWithCategory';
import ArtistCard from '../components/ArtistCard';
import FloatingPlayer from '../components/FloatingPlayer';
import { useTheme } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import TrackPlayer from 'react-native-track-player';
import RNFS from 'react-native-fs';
import SongCard from '../components/SongCard';
import { fontFamilies } from '../constants/fonts';
import { fontSize } from '../constants/dimensions';
import { useThemeStore } from '../store/themeStore';

const HomeScreen = () => {
    const { colors } = useTheme();
    const { isDarkMode } = useThemeStore();
    const [songsWithCategory, setSongsWithCategory] = useState([]);
    const [expandedArtist, setExpandedArtist] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const songCollection = await firestore().collection('songs').get();
                const songs = songCollection.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    release_date: doc.data().release_date.toDate(), // convert timestamp to Date object
                }));

                const recommendedSongs = songs;
                const newReleases = [...songs].sort(
                    (a, b) => b.release_date - a.release_date,
                );
                const uniqueArtists = {};

                songs.forEach(song => {
                    song.artist.split(',').forEach(artist => {
                        artist = artist.trim();
                        if (!uniqueArtists[artist]) {
                            uniqueArtists[artist] = {
                                name: artist,
                                artist_img: song.artist_img,
                            };
                        }
                    });
                });

                const featuredArtists = Object.values(uniqueArtists);

                const categories = [
                    {
                        title: 'NCS Music',
                        songs: recommendedSongs,
                    },
                    {
                        title: 'New Releases',
                        songs: newReleases,
                    },
                    {
                        title: 'Featured Artists',
                        artists: featuredArtists,
                    },
                ];

                setSongsWithCategory(categories);
            } catch (error) {
                console.error('Error fetching songs: ', error);
            }
        };

        fetchSongs();
    }, []);

    const handleArtistPress = async artist => {
        if (expandedArtist && expandedArtist.name === artist.name) {
            setExpandedArtist(null); // Collapse if already expanded
        } else {
            const songCollection = await firestore()
                .collection('songs')
                .where('artist', '==', artist.name)
                .get();
            const songs = songCollection.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setExpandedArtist({ ...artist, songs });
        }
    };

    const handlePlayTrack = async (selectedTrack, track) => {
        const trackIndex = expandedArtist.songs.findIndex(
            t =>
                t.url === track.url ||
                `file://${RNFS.DocumentDirectoryPath}/${t.title}.mp3` === selectedTrack,
        );

        if (trackIndex === -1) {
            console.warn('Track not found!');
            return;
        }

        const prevTracks = expandedArtist.songs.slice(0, trackIndex);
        const nextTracks = expandedArtist.songs.slice(trackIndex + 1);

        await TrackPlayer.reset();
        await TrackPlayer.add({
            id: track.id,
            url: selectedTrack,
            title: track.title,
            artist: track.artist,
            artwork: track.artwork,
        });
        await TrackPlayer.add(nextTracks);
        await TrackPlayer.add(prevTracks);
        await TrackPlayer.play();
    };

    const handleDownload = async (song, isDownloaded, setIsDownloaded) => {
        const downloadDest = `${RNFS.DocumentDirectoryPath}/${song.title}.mp3`;

        if (isDownloaded) {
            // We don't want it anymore
            try {
                await RNFS.unlink(downloadDest);
                setIsDownloaded(false);
                console.log('File removed from:', downloadDest);
            } catch (error) {
                console.error('Error removing file:', error);
            }
        } else {
            // We want it so download it
            try {
                const downloadResult = await RNFS.downloadFile({
                    fromUrl: song.url,
                    toFile: downloadDest,
                }).promise;

                if (downloadResult.statusCode === 200) {
                    setIsDownloaded(true);
                    console.log('File downloaded to:', downloadDest);
                }
            } catch (error) {
                console.error('Error downloading file:', error);
            }
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header />
            <FlatList
                data={songsWithCategory}
                renderItem={({ item }) =>
                    item.title === 'Featured Artists' ? (
                        <View>
                            <Text style={[styles.heading, { color: colors.textPrimary }]}>Featured Artists</Text>
                            <FlatList
                                data={item.artists}
                                renderItem={({ item }) => (
                                    <>
                                        <ArtistCard
                                            artist={item}
                                            onPress={() => handleArtistPress(item)}
                                        />
                                        {expandedArtist && expandedArtist.name === item.name && (
                                            <FlatList
                                                data={expandedArtist.songs}
                                                renderItem={({ item }) => (
                                                    <SongCard
                                                        item={item}
                                                        handlePlay={playUrl =>
                                                            handlePlayTrack(playUrl, item)
                                                        }
                                                        handleDownload={handleDownload}
                                                    />
                                                )}
                                                keyExtractor={item => item.id}
                                                horizontal
                                                contentContainerStyle={styles.songsList}
                                                showsHorizontalScrollIndicator={false}
                                            />
                                        )}
                                    </>
                                )}
                                keyExtractor={item => item.name}
                                contentContainerStyle={styles.artistList}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                            />
                        </View>
                    ) : (
                        <SongCardWithCategory item={item} />
                    )
                }
                contentContainerStyle={{
                    paddingBottom: 400,
                }}
            />
            <FloatingPlayer />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    artistList: {
        paddingHorizontal: 20,
    },
    songsList: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    heading: {
        fontSize: fontSize.xl,
        fontFamily: fontFamilies.bold,
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 20,
    },
});
