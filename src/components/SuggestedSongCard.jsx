// src/components/SuggestedSongCard.jsx
import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {fontSize, iconSizes, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';

const SuggestedSongCard = ({song, onAdd}) => {
  const {colors} = useTheme();

  return (
    <View
      style={[
        styles.songCard,
        {
          backgroundColor: colors.userCardBackgroundColor,
          borderColor: colors.userCardBorderColor,
        },
      ]}>
      <Image source={{uri: song.artwork}} style={styles.coverImage} />
      <View style={styles.songInfo}>
        <Text style={[styles.title, {color: colors.userCardTextPrimary}]}>
          {song.title}
        </Text>
        <Text style={[styles.artist, {color: colors.userCardTextSecondary}]}>
          {song.artist}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onAdd(song)} style={styles.addButton}>
        <AntDesign
          name="pluscircleo"
          size={iconSizes.md}
          color={colors.iconPrimary}
        />
      </TouchableOpacity>
    </View>
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
  addButton: {
    padding: spacing.sm,
    marginLeft: spacing.md,
  },
});

export default SuggestedSongCard;
