import { TouchableOpacity } from "react-native"
import { iconSizes } from "../constants/dimensions"
import TrackPlayer, { useIsPlaying } from "react-native-track-player";
import { useTheme } from "@react-navigation/native";
//icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';


export const GoToPreviousButton = ({ size = iconSizes.xl }) => {
    const { colors } = useTheme()

    const handleGoToPrevious = async () => {
        TrackPlayer.skipToPrevious()
    }

    return (
        <TouchableOpacity activeOpacity={0.85} onPress={handleGoToPrevious}>
            <FontAwesome6
                name={"backward"}
                size={size}
                color={colors.iconPrimary}
            />
        </TouchableOpacity>
    )
}

export const PlayPauseButton = ({ size = iconSizes.lg }) => {
    const { colors } = useTheme()

    const { playing } = useIsPlaying();

    const handleTogglePlay = () => {
        if (playing) {
            TrackPlayer.pause()
        } else {
            TrackPlayer.play()
        }
    }
    return (
        <TouchableOpacity activeOpacity={0.85} onPress={handleTogglePlay}>
            <FontAwesome6
                name={playing ? "pause" : "play"}
                size={size}
                color={colors.iconPrimary}
            />
        </TouchableOpacity>
    )
}

export const GoToNextButton = ({ size = iconSizes.xl }) => {
    const { colors } = useTheme()

    const handleGoToNext = async () => {
        TrackPlayer.skipToNext()
    }

    return (
        <TouchableOpacity activeOpacity={0.85} onPress={handleGoToNext}>
            <FontAwesome6
                name={"forward"}
                size={size}
                color={colors.iconPrimary}
            />
        </TouchableOpacity>
    )
}