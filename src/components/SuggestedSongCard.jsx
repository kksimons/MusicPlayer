import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {fontSize, iconSizes, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import TrackPlayer from 'react-native-track-player';
import AddToPlaylistButton from './AddToPlaylistButton'; // Import AddToPlaylistButton

const fallbackImageUrl =
  'https://ncsmusic.s3.eu-west-1.amazonaws.com/tracks/000/000/152/325x325/1705340894_JZ2NifV4gB_2024---CARTOON-JEYJA---On--On-ft.-Daniel-Levi.jpg';

const SuggestedSongCard = ({song}) => {
  const {colors} = useTheme();
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    const checkIfDownloaded = async () => {
      const downloadDest = `${RNFS.DocumentDirectoryPath}/${song.title}.mp3`;
      const exists = await RNFS.exists(downloadDest);
      setIsDownloaded(exists);
    };

    checkIfDownloaded();
  }, [song]);

  const playUrl = isDownloaded
    ? `file://${RNFS.DocumentDirectoryPath}/${song.title}.mp3`
    : song.url;

  const handlePlay = async () => {
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add({
        id: song.id,
        url: playUrl,
        title: song.title,
        artist: song.artist,
        artwork: song.artwork,
      });
      await TrackPlayer.play();
    } catch (error) {
      console.error('Error playing track:', error);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.songCard,
        {
          backgroundColor: colors.userCardBackgroundColor,
          borderColor: colors.userCardBorderColor,
        },
      ]}
      onPress={handlePlay}>
      <Image
        source={{uri: song.artwork || fallbackImageUrl}}
        style={styles.coverImage}
      />
      <View style={styles.songInfo}>
        <Text style={[styles.title, {color: colors.userCardTextPrimary}]}>
          {song.title}
        </Text>
        <Text style={[styles.artist, {color: colors.userCardTextSecondary}]}>
          {song.artist}
        </Text>
      </View>
      <View style={styles.actionsContainer}>
        <AddToPlaylistButton song={song} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 8,
    marginRight: spacing.md,
    borderWidth: 1,
  },
  coverImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  songInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  title: {
    fontSize: fontSize.md,
    fontFamily: fontFamilies.bold,
  },
  artist: {
    fontSize: fontSize.sm,
    fontFamily: fontFamilies.regular,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton: {
    padding: spacing.sm,
    marginLeft: spacing.md,
  },
});

export default SuggestedSongCard;
