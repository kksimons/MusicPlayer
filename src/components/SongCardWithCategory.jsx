import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SongCard from './SongCard'
import { fontSize, iconSizes, spacing } from '../constants/dimensions';
import { fontFamilies } from '../constants/fonts';
import TrackPlayer from 'react-native-track-player';
import { useTheme } from '@react-navigation/native';
import RNFS from 'react-native-fs';

const SongCardWithCategory = ({ item }) => {
    const { colors } = useTheme()

    const handlePlayTrack = async (selectedTrack, track) => {
        const trackIndex = item.songs.findIndex((t) => t.url === track.url || `file://${RNFS.DocumentDirectoryPath}/${t.title}.mp3` === selectedTrack)

        if (trackIndex === -1) {
            console.warn("Track not found!")
            return
        }

        const prevTracks = item.songs.slice(0, trackIndex)
        const nextTracks = item.songs.slice(trackIndex + 1)

        await TrackPlayer.reset()
        await TrackPlayer.add({
            id: track.id,
            url: selectedTrack,
            title: track.title,
            artist: track.artist,
            artwork: track.artwork,
        });
        await TrackPlayer.add(nextTracks)
        await TrackPlayer.add(prevTracks)
        await TrackPlayer.play()
    }

    const handleDownload = async (song, isDownloaded, setIsDownloaded) => {
        const downloadDest = `${RNFS.DocumentDirectoryPath}/${song.title}.mp3`;

        if (isDownloaded) {
            // We don't want it anymore
            try {
                await RNFS.unlink(downloadDest)
                setIsDownloaded(false)
                console.log('File removed from:', downloadDest)
            } catch (error) {
                console.error('Error removing file:', error)
            }
        } else {
            // We want it so download it
            try {
                const downloadResult = await RNFS.downloadFile({
                    fromUrl: song.url,
                    toFile: downloadDest,
                }).promise

                if (downloadResult.statusCode === 200) {
                    setIsDownloaded(true);
                    console.log('File downloaded to:', downloadDest)
                }
            } catch (error) {
                console.error('Error downloading file:', error)
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.headingText, { color: colors.textPrimary }]}>{item.title}</Text>
            <FlatList
                data={item.songs}
                renderItem={({ item }) => (
                    <SongCard
                        item={item}
                        handlePlay={(playUrl) => handlePlayTrack(playUrl, item)}
                        handleDownload={handleDownload}
                    />
                )}
                horizontal
                ItemSeparatorComponent={<View style={{ marginHorizontal: spacing.sm }} />}
                contentContainerStyle={{ paddingHorizontal: spacing.lg }}
                keyExtractor={(item) => item.url}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default SongCardWithCategory

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headingText: {
        fontSize: fontSize.xl,
        fontFamily: fontFamilies.bold,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.lg,
    }
})