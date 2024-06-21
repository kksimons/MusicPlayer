import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { fontSize } from '../constants/dimensions'
import { useTrackPlayerRepeatMode } from '../hooks/useTrackPlayerRepeatMode'
import { RepeatMode } from 'react-native-track-player'

//icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const repeatOrder = [RepeatMode.Off, RepeatMode.Track, RepeatMode.Queue]

const PlayerRepeatToggle = () => {
    const { repeatMode, ChangeRepeatMode } = useTrackPlayerRepeatMode()

    const toggleRepeatMode = () => {
        if (repeatMode == null) {
            return
        }
        const currentIndex = repeatOrder.indexOf(repeatMode)
        const nextIndex = (currentIndex + 1) % repeatOrder.length
        ChangeRepeatMode(nextIndex)
    }

    let iconName = "repeat"
    switch (repeatMode) {
        case RepeatMode.Off:
            iconName = "repeat-off"
            break
        case RepeatMode.Queue:
            iconName = "repeat"
            break
        case RepeatMode.Track:
            iconName = "repeat-once"
            break
    }

    return (
        <TouchableOpacity onPress={toggleRepeatMode}>
            <MaterialCommunityIcons
                name={iconName}
                color={colors.iconSecondary}
                size={fontSize.xl}
            />
        </TouchableOpacity>
    );
};

export default PlayerRepeatToggle

const styles = StyleSheet.create({})