// screens/LikeScreen.jsx

import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {fontSize, iconSizes, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import SongCard from '../components/SongCard';
import useLikeSongs from '../store/likeStore';
import {useNavigation, useTheme} from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import PlaylistVisibilitySettings from '../components/PlaylistVisibilitySettings';

const LikeScreen = () => {
  const {colors} = useTheme();
  const {likedSongs, addToLiked} = useLikeSongs();
  const navigation = useNavigation();
  const [showVisibility, setShowVisibility] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleToggleVisibility = () => {
    setShowVisibility(prevState => !prevState);
  };

  const handlePlayTrack = async (selectedTrack, songs = likedSongs) => {
    const trackIndex = songs.findIndex(
      track => track.url === selectedTrack.url,
    );
    if (trackIndex === -1) {
      return;
    }

    const prevTracks = songs.slice(0, trackIndex);
    const nextTracks = songs.slice(trackIndex + 1);

    await TrackPlayer.reset();
    await TrackPlayer.add(selectedTrack);
    await TrackPlayer.add(nextTracks);
    await TrackPlayer.add(prevTracks);

    await TrackPlayer.play();
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <AntDesign
            name={'arrowleft'}
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
            handlePlay={() => handlePlayTrack(item)}
          />
        )}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
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
