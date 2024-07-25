// src/components/PlaylistList.jsx
import React, {useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {useTheme, useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fontSize, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import {PlaylistContext} from '../context/PlaylistContext';

const PlaylistList = () => {
  const {playlists, removePlaylist} = useContext(PlaylistContext);
  const {colors} = useTheme();
  const navigation = useNavigation();

  const handleDeletePlaylist = playlistId => {
    Alert.alert(
      'Delete Playlist',
      'Are you sure you want to delete this playlist?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => removePlaylist(playlistId),
        },
      ],
      {cancelable: true},
    );
  };

  const renderPlaylist = ({item}) => (
    <TouchableOpacity
      style={[styles.playlistContainer, {backgroundColor: colors.card}]}
      onPress={() =>
        navigation.navigate('PLAYLIST_DETAIL_SCREEN', {playlistId: item.id})
      }>
      {item.artwork && (
        <Image source={{uri: item.artwork}} style={styles.artwork} />
      )}
      <View style={styles.playlistDetails}>
        <Text style={[styles.playlistName, {color: colors.text}]}>
          {item.name}
        </Text>
        <Text style={[styles.songCount, {color: colors.textSecondary}]}>
          {item.songs.length} {item.songs.length === 1 ? 'song' : 'songs'}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleDeletePlaylist(item.id)}>
        <Ionicons name="trash" size={24} color={colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {playlists.length === 0 ? (
        <Text style={[styles.noPlaylistsText, {color: colors.textSecondary}]}>
          No playlist created.
        </Text>
      ) : (
        <FlatList
          data={playlists}
          renderItem={renderPlaylist}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  listContainer: {
    paddingBottom: spacing.xxl,
  },
  playlistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 10,
    marginBottom: spacing.md,
  },
  artwork: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: spacing.md,
  },
  playlistDetails: {
    flex: 1,
  },
  playlistName: {
    fontSize: fontSize.lg,
    fontFamily: fontFamilies.medium,
  },
  songCount: {
    fontSize: fontSize.sm,
    fontFamily: fontFamilies.regular,
  },
  noPlaylistsText: {
    fontSize: fontSize.md,
    fontFamily: fontFamilies.regular,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PlaylistList;
