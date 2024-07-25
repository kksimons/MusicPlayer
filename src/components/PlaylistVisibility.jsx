// components/PlaylistVisibilitySettings.jsx
import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const PlaylistVisibility = ({playlistId, initialVisibility}) => {
  const {colors} = useTheme();
  const [isVisible, setIsVisible] = React.useState(initialVisibility);

  const handleVisibilityChange = async value => {
    setIsVisible(value);
    try {
      await firestore()
        .collection('users')
        .doc(auth().currentUser.uid)
        .collection('playlists')
        .doc(playlistId)
        .update({visibility: value});
    } catch (error) {
      console.error('Error updating visibility:', error);
    }
  };

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
          onValueChange={handleVisibilityChange}
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

export default PlaylistVisibility;
