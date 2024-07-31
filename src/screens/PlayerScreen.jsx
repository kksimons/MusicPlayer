import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fontSize, iconSizes, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import PlayerRepeatToggle from '../components/PlayerRepeatToggle';
import PlayerShuffleToggle from '../components/PlayerShuffleToggle';
import PlayerProgressBar from '../components/PlayerProgressBar';
import {
  GoToNextButton,
  GoToPreviousButton,
  PlayPauseButton,
} from '../components/PlayerControls';
import TrackPlayer, {
  useActiveTrack,
  useProgress,
} from 'react-native-track-player';
import {useNavigation, useTheme} from '@react-navigation/native';
import useLikeSongs from '../store/likeStore';
import {isExist} from '../utils/isExist';
//icons
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import AddToPlaylistButton from '../components/AddToPlaylistButton';

const PlayerScreen = () => {
  const {colors} = useTheme();

  const {likedSongs, addToLiked} = useLikeSongs();
  const activeTrack = useActiveTrack();
  const {duration, position} = useProgress();
  const [isMute, setIsMute] = useState(false);
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  //if there is no song playing display alert no song is playing select a song to play and go back to the previous screen
  // useEffect(() => {
  //   if (!activeTrack) {
  //     Alert.alert(
  //       "No Song Playing",
  //       "Select a song to play",
  //       [
  //         {
  //           text: "Go Back",
  //           onPress: handleGoBack
  //         }
  //       ]
  //     );
  //   }
  // }, [activeTrack]);

  const setVolume = async () => {
    const volume = await TrackPlayer.getVolume();
    setIsMute(volume === 0 ? true : false);
  };

  // if loading track, show loader
  if (!activeTrack) {
    return (
      <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleGoBack}>
            <AntDesign
              name={'arrowleft'}
              color={colors.iconPrimary}
              size={iconSizes.md}
            />
          </TouchableOpacity>
          <Text style={[styles.headerText, {color: colors.textPrimary}]}>
            Playing Now
          </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <ActivityIndicator size={'large'} color={colors.iconPrimary} /> */}
        <Text style={[ styles.title, {color: colors.textPrimary}]}>No song selected</Text>
      </View>
      </View>
    );
  }

  const handleToggleVolume = () => {
    TrackPlayer.setVolume(isMute ? 1 : 0);
    setIsMute(!isMute);
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
        <Text style={[styles.headerText, {color: colors.textPrimary}]}>
          Playing Now
        </Text>
      </View>
      {/* image */}
      <View style={styles.coverImageContainer}>
        <Image source={{uri: activeTrack.artwork}} style={styles.coverImage} />
      </View>
      {/* render title and artist */}
      <View style={styles.titleRowHeartContainer}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, {color: colors.textPrimary}]}>
            {activeTrack.title}
          </Text>
          <Text style={[styles.artist, {color: colors.textSecondary}]}>
            {activeTrack.artist}
          </Text>
        </View>
        {/* icon container*/}
        <AddToPlaylistButton song={activeTrack} />
      </View>
      {/* player control */}
      <View style={styles.playerControlContainer}>
        <TouchableOpacity
          style={styles.volumeWrapper}
          onPress={handleToggleVolume}>
          <Feather
            name={isMute ? 'volume-x' : 'volume-1'}
            color={colors.iconSecondary}
            size={iconSizes.lg}
          />
        </TouchableOpacity>
        <View style={styles.repeatShuffleWrapper}>
          <PlayerRepeatToggle />
          <PlayerShuffleToggle />
        </View>
      </View>
      {/* player progress bar */}
      <PlayerProgressBar duration={duration} position={position} />
      <View style={styles.playPauseContainer}>
        <GoToPreviousButton size={iconSizes.lg} />
        <PlayPauseButton size={iconSizes.lg} />
        <GoToNextButton size={iconSizes.lg} />
      </View>
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    textAlign: 'center',
    fontSize: fontSize.lg,
    fontFamily: fontFamilies.medium,
    flex: 1,
  },
  coverImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.lg,
  },
  coverImage: {
    height: 300,
    width: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: fontSize.lg,
    fontFamily: fontFamilies.medium,
  },
  artist: {
    fontSize: fontSize.md,
  },
  titleRowHeartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerControlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  volumeWrapper: {
    flex: 1,
  },
  repeatShuffleWrapper: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  playPauseContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xl,
    marginTop: spacing.xl,
  },
});
