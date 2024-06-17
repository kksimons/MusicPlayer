import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SongCard from './SongCard'
import { colors } from '../constants/colors';
import { fontSize, iconSizes, spacing } from '../constants/dimensions';
import { fontFamilies } from '../constants/fonts';

const SongCardWithCategory = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Recommended for you</Text>
            <FlatList
                data={[1, 2, 3, 4, 5]}
                renderItem={SongCard}
                horizontal={true}
                ItemSeparatorComponent={<View style={{ marginHorizontal: spacing.sm }} />}
                contentContainerStyle={{ paddingHorizontal: spacing.lg }}
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