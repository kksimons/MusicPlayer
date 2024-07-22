import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {fontSize} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';

const ArtistCard = ({artist, onPress}) => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{uri: artist.artist_img}} style={styles.image} />
      <Text style={[styles.name, {color: colors.textPrimary}]}>
        {artist.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ArtistCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    marginTop: 10,
    fontSize: fontSize.md,
    fontWeight: fontFamilies.bold,
  },
});
