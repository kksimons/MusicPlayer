import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { fontSize, iconSizes, spacing } from '../constants/dimensions'
import { fontFamilies } from '../constants/fonts'
import { GoToNextButton, GoToPreviousButton, PlayPauseButton } from './PlayerControls'
import { useSharedValue } from 'react-native-reanimated'
import { Slider } from 'react-native-awesome-slider'
import MovingText from './MovingText'
import { useNavigation } from '@react-navigation/native'

const imageUrl = 'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/001/701/325x325/nostalgia-1718323267-zWVQ91T49m.jpg'


const FloatingPlayer = () => {
    const navigation = useNavigation();
    const progress = useSharedValue(30);
    const min = useSharedValue(0);
    const max = useSharedValue(100);

    const handleOpenPlayerScreen = () => {
        navigation.navigate("PLAYER_SCREEN");
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
                    renderBubble={() => <View />}
                />
            </View>
            <TouchableOpacity style={styles.container} activeOpacity={0.85} onPress={handleOpenPlayerScreen}>
                <Image source={{ uri: imageUrl }} style={styles.coverImage} />
                <View style={styles.titleContainer}>
                    <MovingText
                        text={"Nostalgia"}
                        style={styles.title}
                        animationThreshold={15}
                    />
                    <Text style={styles.artist}>Johnning, Janji</Text>
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
        color: colors.textPrimary,
        fontSize: fontSize.lg,
        fontFamily: fontFamilies.medium,
    },
    artist: {
        color: colors.textSecondary,
        fontSize: fontSize.md,
    },
    playerControlContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        paddingRight: spacing.lg,
    }
})