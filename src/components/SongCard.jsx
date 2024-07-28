import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {fontSize, iconSizes, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNFS from 'react-native-fs';
import AddToPlaylistButton from './AddToPlaylistButton';

const fallbackImageUrl =
  'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/152/325x325/1705340894_JZ2NifV4gB_2024---CARTOON-JEYJA---On--On-ft.-Daniel-Levi.jpg';

const SongCard = ({
  item,
  containerStyle,
  imageStyle,
  handlePlay,
  handleDownload,
  handleRemove,
  showRemoveIcon,
  showAddToPlaylistButton,
}) => {
  const {colors} = useTheme();
  const [isDownloaded, setIsDownloaded] = useState(false);

  const imageUrl = item?.artwork
    ? {uri: item.artwork}
    : {uri: fallbackImageUrl};

  useEffect(() => {
    const checkIfDownloaded = async () => {
      const downloadDest = `${RNFS.DocumentDirectoryPath}/${item.title}.mp3`;
      const exists = await RNFS.exists(downloadDest);
      setIsDownloaded(exists);
    };

    checkIfDownloaded();
  }, [item]);

  const playUrl = isDownloaded
    ? `file://${RNFS.DocumentDirectoryPath}/${item.title}.mp3`
    : item.url;

  const handleDownloadToggle = async () => {
    await handleDownload(item, isDownloaded, setIsDownloaded);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={() => handlePlay(playUrl)}>
        <Image source={imageUrl} style={[styles.coverImage, imageStyle]} />
      </TouchableOpacity>
      <Text
        style={[styles.title, {color: colors.textPrimary}]}
        numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={[styles.artist, {color: colors.textSecondary}]}>
        {item.artist}
      </Text>
      <View style={styles.actionsContainer}>
        {showRemoveIcon && (
          <TouchableOpacity style={styles.removeIcon} onPress={handleRemove}>
            <AntDesign
              name="delete"
              size={iconSizes.sm}
              color={colors.iconPrimary}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.downloadIcon}
          onPress={handleDownloadToggle}>
          <Ionicons
            name={isDownloaded ? 'download' : 'download-outline'}
            size={iconSizes.sm}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
        {showAddToPlaylistButton && (
          <View style={styles.addToPlaylistIcon}>
            <AddToPlaylistButton song={item} />
          </View>
        )}
      </View>
    </View>
  );
};

export default SongCard;

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
    textAlign: 'center',
    fontSize: fontSize.md,
    paddingVertical: spacing.sm,
  },
  artist: {
    textAlign: 'center',
    fontSize: fontSize.md,
    fontFamily: fontFamilies.regular,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xl,
  },
  removeIcon: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
  },
  downloadIcon: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
  },
  addToPlaylistIcon: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
  },
});
