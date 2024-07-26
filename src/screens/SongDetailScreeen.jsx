import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AddToPlaylistButton from '../components/AddToPlaylistButton';

const SongDetailScreen = ({ route }) => {
    const { song } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{song.title}</Text>
            <Text style={styles.artist}>{song.artist}</Text>
            <AddToPlaylistButton song={song} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    artist: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default SongDetailScreen;
