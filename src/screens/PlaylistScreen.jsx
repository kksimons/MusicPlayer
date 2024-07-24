import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput, Button, Share } from 'react-native';
import { PlaylistContext } from '../context/PlaylistContext';
import { useTheme } from '@react-navigation/native';
import { fontSize, spacing } from '../constants/dimensions';
import { fontFamilies } from '../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const PlaylistScreen = ({ route }) => {
    const { song } = route.params || {};
    const { playlists, removePlaylist, removeSongFromPlaylist, createPlaylist, addSongToPlaylist } = useContext(PlaylistContext);
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [visibility, setVisibility] = useState('private');
    const [sortOption, setSortOption] = useState(null);

    const handleRemovePlaylist = (playlistId) => {
        Alert.alert(
            'Delete Playlist',
            'Are you sure you want to delete this playlist?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => removePlaylist(playlistId),
                },
            ],
            { cancelable: true }
        );
    };

    const handleRemoveSong = (playlistId, songId) => {
        removeSongFromPlaylist(playlistId, songId);
    };

    const handleCreatePlaylist = () => {
        if (newPlaylistName.trim()) {
            const newPlaylist = {
                id: Date.now().toString(),
                name: newPlaylistName.trim(),
                songs: [{ ...song, release_date: new Date(song.release_date) }],
                visibility: visibility,
            };
            createPlaylist(newPlaylist.name);
            addSongToPlaylist(newPlaylist.id, newPlaylist.songs[0]);
            setNewPlaylistName('');
            setSelectedPlaylist(newPlaylist);
        } else {
            Alert.alert('Playlist name cannot be empty');
        }
    };

    const handleSharePlaylist = (playlist) => {
        const songList = playlist.songs.map(song => song.title).join(', ');
        Share.share({
            message: `Check out my playlist "${playlist.name}": ${songList}`
        });
    };

    const renderPlaylist = ({ item }) => (
        <TouchableOpacity
            style={[styles.playlistContainer, { backgroundColor: colors.card }]}
            onPress={() => setSelectedPlaylist(item)}
        >
            <Text style={[styles.playlistName, { color: colors.text }]}>{item.name}</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => handleSharePlaylist(item)}>
                    <Ionicons name="share-social" size={24} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemovePlaylist(item.id)}>
                    <Ionicons name="trash" size={24} color={colors.primary} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const renderSong = ({ item }) => (
        <View style={[styles.songContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.songTitle, { color: colors.text }]}>{item.title}</Text>
            <TouchableOpacity onPress={() => handleRemoveSong(selectedPlaylist.id, item.id)}>
                <Ionicons name="trash" size={24} color={colors.primary} />
            </TouchableOpacity>
        </View>
    );

    const handleSortChange = (option) => {
        setSortOption(option);
        let sortedSongs = [...selectedPlaylist.songs];
        if (option === 'year') {
            sortedSongs.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        } else if (option === 'artist') {
            sortedSongs.sort((a, b) => a.artist.localeCompare(b.artist));
        } else if (option === 'genre') {
            sortedSongs.sort((a, b) => a.genre.localeCompare(b.genre));
        }
        setSelectedPlaylist({ ...selectedPlaylist, songs: sortedSongs });
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Ionicons name="arrow-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <Text style={[styles.heading, { color: colors.text }]}>
                    {selectedPlaylist ? `Playlist: ${selectedPlaylist.name}` : 'Your Playlists'}
                </Text>
            </View>
            {selectedPlaylist ? (
                <>
                    <Button title="Back to Playlists" onPress={() => setSelectedPlaylist(null)} />
                    <View style={styles.sortContainer}>
                        <Button title="Sort by Year" onPress={() => handleSortChange('year')} />
                        <Button title="Sort by Artist" onPress={() => handleSortChange('artist')} />
                        <Button title="Sort by Genre" onPress={() => handleSortChange('genre')} />
                    </View>
                    <FlatList
                        data={selectedPlaylist.songs}
                        renderItem={renderSong}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.listContainer}
                    />
                </>
            ) : (
                <>
                    <FlatList
                        data={playlists}
                        renderItem={renderPlaylist}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.listContainer}
                    />
                    {song && (
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.textInput, { borderColor: colors.border, color: colors.text }]}
                                placeholder="New Playlist Name"
                                placeholderTextColor={colors.textSecondary}
                                value={newPlaylistName}
                                onChangeText={setNewPlaylistName}
                            />
                            <View style={styles.visibilityContainer}>
                                <Text style={{ color: colors.text }}>Visibility:</Text>
                                <TouchableOpacity onPress={() => setVisibility('private')}>
                                    <Text style={[styles.visibilityOption, { color: visibility === 'private' ? colors.primary : colors.textSecondary }]}>Private</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setVisibility('public')}>
                                    <Text style={[styles.visibilityOption, { color: visibility === 'public' ? colors.primary : colors.textSecondary }]}>Public</Text>
                                </TouchableOpacity>
                            </View>
                            <Button title="Create and Add Song" onPress={handleCreatePlaylist} />
                        </View>
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.lg,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    heading: {
        fontSize: fontSize.xl,
        fontFamily: fontFamilies.bold,
        marginLeft: spacing.sm,
    },
    listContainer: {
        paddingBottom: spacing.xxl,
    },
    playlistContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
        borderRadius: 10,
        marginBottom: spacing.md,
    },
    playlistName: {
        fontSize: fontSize.lg,
        fontFamily: fontFamilies.medium,
    },
    songContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
        borderRadius: 10,
        marginBottom: spacing.md,
    },
    songTitle: {
        fontSize: fontSize.lg,
        fontFamily: fontFamilies.medium,
    },
    inputContainer: {
        marginTop: spacing.lg,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 5,
        padding: spacing.sm,
        marginBottom: spacing.md,
    },
    visibilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    visibilityOption: {
        marginHorizontal: spacing.sm,
    },
    sortContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: spacing.lg,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default PlaylistScreen;
