import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { fontFamilies } from '../constants/fonts'
import { fontSize, spacing } from '../constants/dimensions'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'

const PlayerProgressBar = () => {
    const progress = useSharedValue(0.25);
    const min = useSharedValue(0);
    const max = useSharedValue(1);
    return (
        <View>
            <View style={styles.timeRow}>
                <Text style={styles.timeText}>00:50</Text>
                <Text style={styles.timeText}>{"-"}04:00</Text>
            </View>
            <Slider
                style={styles.sliderContainer}
                containerStyle={{
                    height: 7,
                    borderRadius: spacing.md,
                }}
                theme={{
                    maximumTrackTintColor: colors.minimumTrackTintColor,
                    minimumTrackTintColor: colors.maximumTrackTintColor,
                }}
                progress={progress}
                minimumValue={min}
                maximumValue={max}
                thumbWidth={18}
                renderBubble={() => null}
            />
        </View>
    )
}

export default PlayerProgressBar

const styles = StyleSheet.create({
    timeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: spacing.xl
    },
    timeText: {
        color: colors.textPrimary,
        fontFamily: fontFamilies.regular,
        fontSize: fontSize.sm,
        opacity: 0.75,
    },
    sliderContainer: {
        marginVertical: spacing.xl,
    }
})