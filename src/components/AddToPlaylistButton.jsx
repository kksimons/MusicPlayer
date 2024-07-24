import React from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { usePlaylists } from '../playList/playListContext';

const AddToPlaylistButton = ({ song }) => {
    const { playlists, addSongToPlaylist } = usePlaylists();

    const handleAddToPlaylist = (playlistId) => {
        addSongToPlaylist(playlistId, song);
    };

    return (
        <View style={styles.container}>
            {playlists.map((playlist) => (
                <TouchableOpacity key={playlist.id} onPress={() => handleAddToPlaylist(playlist.id)} style={styles.button}>
                    <Text style={styles.text}>{playlist.name}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#008CBA',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});

export default AddToPlaylistButton;
