// src/screens/PlaylistDetailScreen.jsx
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {PlaylistContext} from '../context/PlaylistContext';
import {useNavigation, useTheme} from '@react-navigation/native';
import {spacing, fontSize, iconSizes} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TrackPlayer from 'react-native-track-player';
import RNFS from 'react-native-fs';
import FloatingPlayer from '../components/FloatingPlayer';
import PlaylistVisibility from '../components/PlaylistVisibility';
import SongCard from '../components/SongCard';

const PlaylistDetailScreen = ({route}) => {
  const {playlistId} = route.params;
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {playlists, removeSongFromPlaylist, updatePlaylistName} =
    useContext(PlaylistContext);
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [playlistName, setPlaylistName] = useState('');

  useEffect(() => {
    const playlistData = playlists.find(pl => pl.id === playlistId);
    if (playlistData) {
      setPlaylist(playlistData);
      setPlaylistName(playlistData.name);
      setSongs(playlistData.songs);
    }
  }, [playlists, playlistId]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePlayTrack = async (selectedTrack, track) => {
    const trackIndex = songs.findIndex(
      t =>
        t.url === track.url ||
        `file://${RNFS.DocumentDirectoryPath}/${t.title}.mp3` === selectedTrack,
    );

    if (trackIndex === -1) {
      console.warn('Track not found!');
      return;
    }

    const prevTracks = songs.slice(0, trackIndex);
    const nextTracks = songs.slice(trackIndex + 1);

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
      try {
        await RNFS.unlink(downloadDest);
        setIsDownloaded(false);
        console.log('File removed from:', downloadDest);
      } catch (error) {
        console.error('Error removing file:', error);
      }
    } else {
      try {
        // Log the URL before attempting the download
        console.log('Downloading from URL:', song.url);

        // Ensure the URL is valid
        if (!song.url) {
          throw new Error('Invalid URL');
        }

        const downloadResult = await RNFS.downloadFile({
          fromUrl: song.url,
          toFile: downloadDest,
        }).promise;

        if (downloadResult.statusCode === 200) {
          setIsDownloaded(true);
          console.log('File downloaded to:', downloadDest);
        } else {
          throw new Error(
            `Download failed with status code: ${downloadResult.statusCode}`,
          );
        }
      } catch (error) {
        console.error('Error downloading file:', error.message);
      }
    }
  };

  const handleRemoveSong = async songId => {
    try {
      await removeSongFromPlaylist(playlistId, songId);
      Alert.alert('Song removed successfully!');
    } catch (error) {
      console.error('Error removing song:', error);
    }
  };

  const handleEditName = () => {
    setIsEditing(true);
  };

  const handleSaveName = async () => {
    try {
      await updatePlaylistName(playlistId, playlistName);
      setIsEditing(false);
      console.log('Playlist name updated successfully');
      Alert.alert('Playlist name updated successfully ' + playlistName);
    } catch (error) {
      console.error('Error updating playlist name:', error);
    }
  };

  if (!playlist) {
    return (
      <View style={styles.container}>
        <Text style={[styles.loadingText, {color: colors.textSecondary}]}>
          Loading...
        </Text>
      </View>
    );
  }

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
        {isEditing ? (
          <TextInput
            style={[
              styles.headingText,
              styles.inputText,
              {color: colors.textPrimary},
            ]}
            value={playlistName}
            onChangeText={setPlaylistName}
            onBlur={handleSaveName}
            autoFocus
          />
        ) : (
          <TouchableOpacity onPress={handleEditName}>
            <Text style={[styles.headingText, {color: colors.textPrimary}]}>
              {playlist.name}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <PlaylistVisibility
        playlistId={playlistId}
        initialVisibility={playlist.visibility}
      />
      <FlatList
        data={songs}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SongCard
            containerStyle={{width: '47%'}}
            imageStyle={{height: 160, width: 160}}
            item={item}
            handlePlay={() => handlePlayTrack(item.url, item)}
            handleDownload={handleDownload}
            handleRemove={() => handleRemoveSong(item.id)}
            showRemoveIcon
          />
        )}
        numColumns={2}
        key={(2).toString()}
        contentContainerStyle={{
          paddingBottom: 500,
          paddingHorizontal: spacing.lg,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginVertical: spacing.lg,
        }}
      />
      <FloatingPlayer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  headingText: {
    fontSize: fontSize.xl,
    fontFamily: fontFamilies.bold,
    padding: spacing.lg,
    textAlign: 'center',
  },
  inputText: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  loadingText: {
    fontSize: fontSize.md,
    fontFamily: fontFamilies.regular,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 10,
    marginBottom: spacing.md,
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  songDetails: {
    marginLeft: spacing.md,
    flex: 1,
  },
  songTitle: {
    fontSize: fontSize.lg,
    fontFamily: fontFamilies.medium,
  },
  songArtist: {
    fontSize: fontSize.md,
    fontFamily: fontFamilies.regular,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  listContainer: {
    paddingBottom: spacing.lg,
  },
});

export default PlaylistDetailScreen;
