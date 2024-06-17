import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors';
import { fontSize, iconSizes, spacing } from '../constants/dimensions';
import { fontFamilies } from '../constants/fonts';
const imageUrl = 'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/152/325x325/1705340894_JZ2NifV4gB_2024---CARTOON-JEYJA---On--On-ft.-Daniel-Levi.jpg'

const SongCard = () => {
    return (
        <TouchableOpacity style={styles.container}>
            <Image source={{ uri: imageUrl }} style={styles.coverImage} />
            <Text style={styles.title}>On & On (feat. Daniel Levi)</Text>
            <Text style={styles.artist}>Cartoon, Daniel Levi, Jéja</Text>
        </TouchableOpacity>
    )
}

export default SongCard

const styles = StyleSheet.create({
    container: {
        height: 250,
        width: 250,
    },
    coverImage: {
        width: 250,
        height: 250,
        borderRadius: 10,
    },
    title: {
        color: colors.textPrimary,
        fontFamily: fontFamilies.medium,
        textAlign: "center",
        fontSize: fontSize.lg,
        paddingVertical: spacing.sm,
    },
    artist: {
        color: colors.textSecondary,
        textAlign: "center",
        fontSize: fontSize.md,
        fontFamily: fontFamilies.regular,
    }
})