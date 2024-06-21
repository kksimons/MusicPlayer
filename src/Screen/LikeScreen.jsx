import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { fontSize, iconSizes, spacing } from '../constants/dimensions'
import { fontFamilies } from '../constants/fonts'
import SongCard from '../components/SongCard'
import useLikeSongs from '../store/likeStore'
import { useNavigation, useTheme } from '@react-navigation/native'
import TrackPlayer from 'react-native-track-player'
//icons
import AntDesign from "react-native-vector-icons/AntDesign"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"

const LikeScreen = () => {
    const { colors } = useTheme()

    const { likedSongs, addToLiked } = useLikeSongs()
    const navigation = useNavigation()

    const handleGoBack = () => {
        navigation.goBack()
    }

    const handlePlayTrack = async (selectedTrack, songs = likedSongs) => {

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
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* header */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleGoBack}>
                    <AntDesign name={"arrowleft"} color={colors.iconPrimary} size={iconSizes.md} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <SimpleLineIcons name={"equalizer"} color={colors.iconPrimary} size={iconSizes.md} />
                </TouchableOpacity>
            </View>
            <FlatList
                ListHeaderComponent={<Text style={[styles.headingText, { color: colors.textPrimary }]}>Liked Songs</Text>}
                data={likedSongs}
                renderItem={({ item }) => (
                    <SongCard
                        containerStyle={{ width: "47%" }}
                        imageStyle={{ height: 160, width: 160 }}
                        item={item}
                        handlePlay={(item) => {
                            handlePlayTrack(item)
                        }}
                    />
                )}
                numColumns={2}
                key={(2).toString()}  // Force re-render with numColumns as a key
                contentContainerStyle={{
                    paddingBottom: 500,
                    paddingHorizontal: spacing.lg,
                }}
                columnWrapperStyle={{
                    justifyContent: "space-between",
                    marginVertical: spacing.lg,
                }}
            />
        </View>
    )
}

export default LikeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: spacing.md,
        paddingHorizontal: spacing.md,
    },
    headingText: {
        fontSize: fontSize.xl,
        fontFamily: fontFamilies.bold,
        padding: spacing.lg,
    }
})