import React, {createContext, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const PlaylistContext = createContext();

export const PlaylistProvider = ({children}) => {
  const [playlists, setPlaylists] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
        setPlaylists([]);
      }
    });

    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (currentUserId) {
      const playlistRef = firestore()
        .collection('users')
        .doc(currentUserId)
        .collection('playlists');

      const unsubscribe = playlistRef.onSnapshot(snapshot => {
        const fetchedPlaylists = snapshot.docs.map(doc => ({
          id: doc.id, // Ensure unique ID from Firestore
          ...doc.data(),
          songCount: doc.data().songs ? doc.data().songs.length : 0,
        }));

        console.log('Fetched playlists: ', fetchedPlaylists); // Log the fetched playlists

        setPlaylists(fetchedPlaylists);
      });

      return () => unsubscribe();
    }
  }, [currentUserId]);

  const createPlaylist = async name => {
    const newPlaylist = {
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
        .add(newPlaylist); // Add a new document
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
