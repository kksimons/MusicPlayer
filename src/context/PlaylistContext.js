// src/context/PlaylistContext.js
import React, { createContext, useState } from 'react';

export const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
    const [playlists, setPlaylists] = useState([]);

    const createPlaylist = (name) => {
        const newPlaylist = { id: Date.now().toString(), name, songs: [] };
        setPlaylists([...playlists, newPlaylist]);
    };

    const addSongToPlaylist = (playlistId, song) => {
        setPlaylists(playlists.map(playlist => 
            playlist.id === playlistId 
                ? { ...playlist, songs: [...playlist.songs, song] } 
                : playlist
        ));
    };

    const removePlaylist = (playlistId) => {
        setPlaylists(playlists.filter(playlist => playlist.id !== playlistId));
    };

    const removeSongFromPlaylist = (playlistId, songId) => {
        setPlaylists(playlists.map(playlist => 
            playlist.id === playlistId 
                ? { ...playlist, songs: playlist.songs.filter(song => song.id !== songId) } 
                : playlist
        ));
    };

    return (
        <PlaylistContext.Provider
            value={{ playlists, createPlaylist, addSongToPlaylist, removePlaylist, removeSongFromPlaylist }}>
            {children}
        </PlaylistContext.Provider>
    );
};
