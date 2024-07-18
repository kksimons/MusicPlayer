// screens/LikeScreen.jsx

import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {fontSize, iconSizes, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import SongCard from '../components/SongCard';
import useLikeSongs from '../store/likeStore';
import {useNavigation, useTheme} from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
import RNFS from 'react-native-fs';
//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import PlaylistVisibilitySettings from '../components/PlaylistVisibilitySettings';

const LikeScreen = () => {
  const {colors} = useTheme();
  const {likedSongs, addToLiked} = useLikeSongs();
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePlayTrack = async (selectedTrack, track) => {
    const trackIndex = likedSongs.findIndex(
      t =>
        t.url === track.url ||
        `file://${RNFS.DocumentDirectoryPath}/${t.title}.mp3` === selectedTrack,
    );

    if (trackIndex === -1) {
      console.warn('Track not found!');
      return;
    }

    const prevTracks = likedSongs.slice(0, trackIndex);
    const nextTracks = likedSongs.slice(trackIndex + 1);

    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: track.id,
      url: selectedTrack,
      title: track.title,
      artist: track.artist,
      artwork: track.artwork,
    });
    await TrackPlayer.add(nextTracks);
    await TrackPlayer.add(prevTracks);
    await TrackPlayer.play();
  };

  const handleDownload = async (song, isDownloaded, setIsDownloaded) => {
    const downloadDest = `${RNFS.DocumentDirectoryPath}/${song.title}.mp3`;

    if (isDownloaded) {
      // We don't want it anymore
      try {
        await RNFS.unlink(downloadDest);
        setIsDownloaded(false);
        console.log('File removed from:', downloadDest);
      } catch (error) {
        console.error('Error removing file:', error);
      }
    } else {
      // We want it so download it
      try {
        const downloadResult = await RNFS.downloadFile({
          fromUrl: song.url,
          toFile: downloadDest,
        }).promise;

        if (downloadResult.statusCode === 200) {
          setIsDownloaded(true);
          console.log('File downloaded to:', downloadDest);
        }
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <AntDesign
            name={'arrowleft'}
            color={colors.iconPrimary}
            size={iconSizes.md}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <SimpleLineIcons
            name={'equalizer'}
            color={colors.iconPrimary}
            size={iconSizes.md}
          />
        </TouchableOpacity>
      </View>

      {/* Liked Songs Visibility */}
      <PlaylistVisibilitySettings />

      {/* Liked Songs List */}
      <FlatList
        ListHeaderComponent={
          <Text style={[styles.headingText, {color: colors.textPrimary}]}>
            Liked Songs
          </Text>
        }
        data={likedSongs}
        renderItem={({item}) => (
          <SongCard
            containerStyle={{width: '47%'}}
            imageStyle={{height: 160, width: 160}}
            item={item}
            handlePlay={playUrl => handlePlayTrack(playUrl, item)}
            handleDownload={handleDownload}
          />
        )}
        numColumns={2}
        key={(2).toString()} // Force re-render with numColumns as a key
        contentContainerStyle={{
          paddingBottom: 500,
          paddingHorizontal: spacing.lg,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginVertical: spacing.lg,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  headingText: {
    fontSize: fontSize.xl,
    fontFamily: fontFamilies.bold,
    padding: spacing.lg,
  },
});

export default LikeScreen;
