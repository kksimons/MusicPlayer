// src/context/PlaylistContext.js
import React, {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const PlaylistContext = createContext();

export const PlaylistProvider = ({children}) => {
  const [playlists, setPlaylists] = useState([]);
  const currentUserId = auth().currentUser.uid;

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playlistRef = firestore()
          .collection('users')
          .doc(currentUserId)
          .collection('playlists');
        const snapshot = await playlistRef.get();

        const fetchedPlaylists = await Promise.all(
          snapshot.docs.map(async doc => {
            const data = doc.data();
            let artwork = null;

            if (data.songs && data.songs.length > 0) {
              const firstSongId = data.songs[0];
              const songDoc = await firestore()
                .collection('songs')
                .doc(firstSongId)
                .get();
              if (songDoc.exists) {
                artwork = songDoc.data().artwork;
              }
            }

            return {
              id: doc.id,
              ...doc.data(),
              artwork,
              songCount: data.songs ? data.songs.length : 0,
            };
          }),
        );

        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, [currentUserId]);

  const createPlaylist = async name => {
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      songs: [],
      visibility: true, // Default visibility
      photoURL: null,
    };

    try {
      await firestore()
        .collection('users')
        .doc(currentUserId)
        .collection('playlists')
        .doc(newPlaylist.id)
        .set(newPlaylist);

      setPlaylists(prevPlaylists => [...prevPlaylists, newPlaylist]);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const addSongToPlaylist = async (playlistId, song) => {
    try {
      await firestore()
        .collection('users')
        .doc(currentUserId)
        .collection('playlists')
        .doc(playlistId)
        .update({
          songs: firestore.FieldValue.arrayUnion(song.id),
        });

      setPlaylists(prevPlaylists =>
        prevPlaylists.map(playlist =>
          playlist.id === playlistId
            ? {...playlist, songs: [...playlist.songs, song]}
            : playlist,
        ),
      );
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    }
  };

  const removePlaylist = async playlistId => {
    try {
      await firestore()
        .collection('users')
        .doc(currentUserId)
        .collection('playlists')
        .doc(playlistId)
        .delete();

      setPlaylists(prevPlaylists =>
        prevPlaylists.filter(playlist => playlist.id !== playlistId),
      );
    } catch (error) {
      console.error('Error deleting playlist:', error);
    }
  };

  const removeSongFromPlaylist = async (playlistId, songId) => {
    try {
      await firestore()
        .collection('users')
        .doc(currentUserId)
        .collection('playlists')
        .doc(playlistId)
        .update({
          songs: firestore.FieldValue.arrayRemove(songId),
        });

      setPlaylists(prevPlaylists =>
        prevPlaylists.map(playlist =>
          playlist.id === playlistId
            ? {
                ...playlist,
                songs: playlist.songs.filter(song => song.id !== songId),
              }
            : playlist,
        ),
      );
    } catch (error) {
      console.error('Error removing song from playlist:', error);
    }
  };

  const updatePlaylistName = async (playlistId, newName) => {
    try {
      await firestore()
        .collection('users')
        .doc(currentUserId)
        .collection('playlists')
        .doc(playlistId)
        .update({name: newName});

      setPlaylists(prevPlaylists =>
        prevPlaylists.map(playlist =>
          playlist.id === playlistId ? {...playlist, name: newName} : playlist,
        ),
      );
    } catch (error) {
      console.error('Error updating playlist name:', error);
    }
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        createPlaylist,
        addSongToPlaylist,
        removePlaylist,
        removeSongFromPlaylist,
        updatePlaylistName,
      }}>
      {children}
    </PlaylistContext.Provider>
  );
};
