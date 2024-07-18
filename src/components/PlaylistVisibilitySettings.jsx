// components/LikedSongsVisibility.jsx

import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';

const PlaylistVisibilitySettings = () => {
  const {colors} = useTheme();
  const [isVisible, setIsVisible] = React.useState(true);

  return (
    isVisible !== undefined && ( // Check if isVisible is defined
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <Text style={[styles.text, {color: colors.textPrimary}]}>
          Visibility:
        </Text>
        <Switch
          trackColor={{
            false: colors.switchTrackOff,
            true: colors.switchTrackOn,
          }}
          thumbColor={colors.switchThumb}
          ios_backgroundColor={colors.switchTrackOff}
          onValueChange={setIsVisible}
          value={isVisible}
        />
        <Text style={[styles.visibilityText, {color: colors.textSecondary}]}>
          {isVisible ? 'Public' : 'Only Me'}
        </Text>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  visibilityText: {
    fontSize: 16,
  },
});

export default PlaylistVisibilitySettings;
