import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { iconSizes } from '../constants/dimensions'
import { colors } from '../constants/colors'
import TrackPlayer from 'react-native-track-player'
//icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"


const PlayerShuffleToggle = () => {
    const shuffleSongs = async (songs) => {
        let queue = await TrackPlayer.getQueue()
        await TrackPlayer.reset()
        queue.sort(() => Math.random() - 0.5)
        await TrackPlayer.add(queue)
        await TrackPlayer.play()
    }

    return (
        <TouchableOpacity onPress={shuffleSongs}>
            <MaterialCommunityIcons
                name={"shuffle"}
                size={iconSizes.md}
                color={colors.iconSecondary} />
        </TouchableOpacity>
    )
}

export default PlayerShuffleToggle

const styles = StyleSheet.create({})