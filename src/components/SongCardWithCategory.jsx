import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SongCard from './SongCard'
import { colors } from '../constants/colors';
import { fontSize, iconSizes, spacing } from '../constants/dimensions';
import { fontFamilies } from '../constants/fonts';
import TrackPlayer from 'react-native-track-player';

const SongCardWithCategory = ({ item }) => {

    const handlePlayTrack = async (selectedTrack, songs = item.songs) => {

        const trackIndex = songs.findIndex((track) => track.url === selectedTrack.url)
        //in case we don't get the track for whatever reason
        if (trackIndex === -1) {
            return;
        }

        const prevTracks = songs.slice(0, trackIndex)
        const nextTracks = songs.slice(trackIndex + 1)

        await TrackPlayer.reset()
        await TrackPlayer.add(selectedTrack)
        await TrackPlayer.add(nextTracks)
        await TrackPlayer.add(prevTracks)

        await TrackPlayer.play()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>{item.title}</Text>
            <FlatList
                data={item.songs}
                renderItem={({ item }) => <SongCard
                    item={item}
                    handlePlay={(selectedTrack) => {
                        handlePlayTrack(selectedTrack)
                    }} />}
                horizontal={true}
                ItemSeparatorComponent={<View style={{ marginHorizontal: spacing.sm }} />}
                contentContainerStyle={{ paddingHorizontal: spacing.lg }}
                keyExtractor={(item) => item.url}
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
        color: colors.textPrimary,
        fontFamily: fontFamilies.bold,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.lg,
    }
})