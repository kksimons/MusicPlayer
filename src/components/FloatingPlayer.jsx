import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fontSize, iconSizes, spacing } from '../constants/dimensions'
import { fontFamilies } from '../constants/fonts'
import { GoToNextButton, GoToPreviousButton, PlayPauseButton } from './PlayerControls'
import { useSharedValue } from 'react-native-reanimated'
import { Slider } from 'react-native-awesome-slider'
import MovingText from './MovingText'
import { useNavigation, useTheme } from '@react-navigation/native'
import TrackPlayer, { useActiveTrack, useProgress } from 'react-native-track-player'

const FloatingPlayer = () => {
    const { colors } = useTheme()

    const navigation = useNavigation();
    const activeTrack = useActiveTrack()
    const { duration, position } = useProgress()

    const progress = useSharedValue(0)
    const min = useSharedValue(0);
    const max = useSharedValue(1);
    const isSliding = useSharedValue(false)

    if (!isSliding.value) {
        progress.value = duration > 0 ? position / duration : 0
    }

    const handleOpenPlayerScreen = () => {
        navigation.navigate("PLAYER_SCREEN");
    }

    if (!activeTrack) {
        return null
    }

    return (
        <View>
            <View style={{
                zIndex: 1,
            }}>
                <Slider
                    style={styles.container}
                    progress={progress}
                    minimumValue={min}
                    maximumValue={max}
                    theme={{
                        maximumTrackTintColor: colors.minimumTrackTintColor,
                        minimumTrackTintColor: colors.maximumTrackTintColor,
                    }}
                    //this gets rid of the value on top of the slider bubble
                    renderBubble={() => null}
                    onSlidingStart={() => (isSliding.value = true)}
                    onValueChange={async (value) => {
                        await TrackPlayer.seekTo(value * duration)
                    }}
                    onSlidingComplete={async (value) => {
                        if (!isSliding.value) {
                            return
                        }
                        isSliding.value = false
                        await TrackPlayer.seekTo(value * duration)
                    }}
                />
            </View>
            <TouchableOpacity style={styles.container} activeOpacity={0.85} onPress={handleOpenPlayerScreen}>
                <Image source={{ uri: activeTrack?.artwork }} style={styles.coverImage} />
                <View style={styles.titleContainer}>
                    <MovingText
                        text={activeTrack.title}
                        style={[styles.title, {
                            color: colors.textPrimary,
                        }]}
                        animationThreshold={15}
                    />
                    <Text style={[styles.artist, {
                        color: colors.textSecondary,
                    }]}>{activeTrack.artist}</Text>
                </View>
                <View style={styles.playerControlContainer}>
                    <GoToPreviousButton size={iconSizes.lg} />
                    <PlayPauseButton size={iconSizes.lg} />
                    <GoToNextButton size={iconSizes.lg} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default FloatingPlayer

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    coverImage: {
        height: 60,
        width: 60,
        resizeMode: "cover",
    },
    titleContainer: {
        flex: 1,
        paddingHorizontal: spacing.sm,
        overflow: "hidden",
        marginLeft: spacing.sm,
        marginRight: spacing.lg,
    },
    title: {
        fontSize: fontSize.lg,
        fontFamily: fontFamilies.medium,
    },
    artist: {
        fontSize: fontSize.md,
    },
    playerControlContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        paddingRight: spacing.lg,
    }
})