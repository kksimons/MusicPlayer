import React, {useEffect, useState, useContext, useCallback} from 'react';
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
import firestore from '@react-native-firebase/firestore';
import AddToPlaylistButton from '../components/AddToPlaylistButton';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PlaylistDetailScreen = ({route}) => {
  const {playlistId, userId} = route.params;
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {playlists, removeSongFromPlaylist, updatePlaylistName} =
    useContext(PlaylistContext);
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const currentUserId = auth().currentUser.uid;

  const fetchPlaylist = useCallback(async () => {
    try {
      const playlistDoc = await firestore()
        .collection('users')
        .doc(userId)
        .collection('playlists')
        .doc(playlistId)
        .get();

      if (playlistDoc.exists) {
        const playlistData = playlistDoc.data();
        setPlaylist(playlistData);
        setPlaylistName(playlistData.name);
        console.log('Fetched playlist data: ', playlistData); // Add logging
        fetchSongDetails(playlistData.songs);
      }
    } catch (error) {
      console.error('Error fetching playlist:', error);
    }
  }, [playlistId, userId]);

  const fetchSongDetails = useCallback(async songIds => {
    try {
      console.log('Fetching song details for song IDs: ', songIds); // Add logging
      const songDetailsPromises = songIds.map(songId =>
        firestore().collection('songs').doc(songId).get(),
      );
      const songDetails = await Promise.all(songDetailsPromises);
      const songDetailsData = songDetails.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Fetched song details: ', songDetailsData); // Add logging
      setSongs(songDetailsData);
    } catch (error) {
      console.error('Error fetching song details:', error);
    }
  }, []);

  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

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
      setSongs(songs.filter(song => song.id !== songId));
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
      Alert.alert('Playlist name updated successfully!');
    } catch (error) {
      console.error('Error updating playlist name:', error);
    }
  };

  const renderItem = useCallback(
    ({item}) => (
      <View>
        <SongCard
          containerStyle={{width: '47%'}}
          imageStyle={{height: 160, width: 160}}
          item={item}
          handlePlay={() => handlePlayTrack(item.url, item)}
          handleDownload={handleDownload}
          handleRemove={() => handleRemoveSong(item.id)}
          showRemoveIcon={userId === currentUserId}
          showAddToPlaylistButton={userId !== currentUserId}
        />
      </View>
    ),
    [
      songs,
      userId,
      currentUserId,
      colors,
      handlePlayTrack,
      handleDownload,
      handleRemoveSong,
    ],
  );

  if (!playlist) {
    return (
      <View style={styles.container}>
        <Text style={[styles.loadingText, {color: colors.textSecondary}]}>
          No playlist found
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
            style={[styles.inputText, {color: colors.textPrimary}]}
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
      {userId === currentUserId && (
        <PlaylistVisibility
          playlistId={playlistId}
          initialVisibility={playlist.visibility}
        />
      )}
      <FlatList
        data={songs}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
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
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default PlaylistDetailScreen;
