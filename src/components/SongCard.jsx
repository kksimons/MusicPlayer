import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fontSize, iconSizes, spacing } from '../constants/dimensions';
import { fontFamilies } from '../constants/fonts';
import TrackPlayer from 'react-native-track-player';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';

const fallbackImageUrl = 'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/152/325x325/1705340894_JZ2NifV4gB_2024---CARTOON-JEYJA---On--On-ft.-Daniel-Levi.jpg'

const SongCard = ({ item, containerStyle, imageStyle, handlePlay, handleDownload }) => {
    const { colors } = useTheme()
    const [isDownloaded, setIsDownloaded] = useState(false)

    const imageUrl = item?.artwork ? { uri: item.artwork } : { uri: fallbackImageUrl }

    useEffect(() => {
        const checkIfDownloaded = async () => {
            const downloadDest = `${RNFS.DocumentDirectoryPath}/${item.title}.mp3`
            const exists = await RNFS.exists(downloadDest)
            setIsDownloaded(exists)
        };

        checkIfDownloaded()
    }, [item])

    const playUrl = isDownloaded ? `file://${RNFS.DocumentDirectoryPath}/${item.title}.mp3` : item.url

    const handleDownloadToggle = async () => {
        await handleDownload(item, isDownloaded, setIsDownloaded);
    };

    return (
        <TouchableOpacity
            style={[styles.container, containerStyle]}
            onPress={() => handlePlay(playUrl)}
        >
            <Image
                source={imageUrl}
                style={[styles.coverImage, imageStyle]}
            />
            <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>{item?.title}</Text>
            <Text style={[styles.artist, { color: colors.textSecondary }]}>{item?.artist}</Text>
            <TouchableOpacity style={styles.downloadIcon} onPress={handleDownloadToggle}>
                <Ionicons name={isDownloaded ? "download" : "download-outline"} size={iconSizes.sm} color={colors.iconPrimary} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default SongCard

const styles = StyleSheet.create({
    container: {
        width: 250,
        height: 330,
    },
    coverImage: {
        width: 250,
        height: 250,
        borderRadius: 10,
    },
    title: {
        fontFamily: fontFamilies.medium,
        textAlign: "center",
        fontSize: fontSize.lg,
        paddingVertical: spacing.sm,
    },
    artist: {
        textAlign: "center",
        fontSize: fontSize.md,
        fontFamily: fontFamilies.regular,
    }
})