// src/screens/PlaylistScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { PlaylistContext } from '../context/PlaylistContext';
import { useTheme, useNavigation } from '@react-navigation/native';
import { fontSize, spacing } from '../constants/dimensions';
import { fontFamilies } from '../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PlaylistScreen = () => {
  const { playlists, removePlaylist, removeSongFromPlaylist } = useContext(PlaylistContext);
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handleRemovePlaylist = (playlistId) => {
    Alert.alert(
      'Delete Playlist',
      'Are you sure you want to delete this playlist?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => removePlaylist(playlistId),
        },
      ],
      { cancelable: true }
    );
  };

  const handleRemoveSong = (playlistId, songId) => {
    removeSongFromPlaylist(playlistId, songId);
  };

  const renderPlaylist = ({ item }) => (
    <TouchableOpacity
      style={[styles.playlistContainer, { backgroundColor: colors.card }]}
      onPress={() => setSelectedPlaylist(item)}
    >
      <Text style={[styles.playlistName, { color: colors.text }]}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleRemovePlaylist(item.id)}>
        <Ionicons name="trash" size={24} color={colors.primary} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderSong = ({ item }) => (
    <View style={[styles.songContainer, { backgroundColor: colors.card }]}>
      <Text style={[styles.songTitle, { color: colors.text }]}>{item.title}</Text>
      <TouchableOpacity onPress={() => handleRemoveSong(selectedPlaylist.id, item.id)}>
        <Ionicons name="trash" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={[styles.heading, { color: colors.text }]}>
          {selectedPlaylist ? `Playlist: ${selectedPlaylist.name}` : 'Your Playlists'}
        </Text>
      </View>
      {selectedPlaylist ? (
        <FlatList
          data={selectedPlaylist.songs}
          renderItem={renderSong}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <FlatList
          data={playlists}
          renderItem={renderPlaylist}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  heading: {
    fontSize: fontSize.xl,
    fontFamily: fontFamilies.bold,
    marginLeft: spacing.sm,
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
  playlistName: {
    fontSize: fontSize.lg,
    fontFamily: fontFamilies.medium,
  },
  songContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 10,
    marginBottom: spacing.md,
  },
  songTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamilies.medium,
  },
});

export default PlaylistScreen;
