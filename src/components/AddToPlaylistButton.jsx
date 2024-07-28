import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Button,
  Alert,
  TextInput,
} from 'react-native';
import {useTheme, useNavigation, useRoute} from '@react-navigation/native'; // Import useRoute
import Ionicons from 'react-native-vector-icons/Ionicons';
import {spacing, fontSize, iconSizes} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import {PlaylistContext} from '../context/PlaylistContext';
import CustomModal from './CustomModal';
import auth from '@react-native-firebase/auth';

const AddToPlaylistButton = ({song}) => {
  const {colors} = useTheme();
  const {playlists, addSongToPlaylist, createPlaylist} =
    useContext(PlaylistContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [newPlaylistModalVisible, setNewPlaylistModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const navigation = useNavigation();
  const route = useRoute(); // Initialize useRoute

  const handleAddSongToPlaylist = async () => {
    if (selectedPlaylist && song) {
      await addSongToPlaylist(selectedPlaylist.id, song);
      setIsModalVisible(false);
      Alert.alert(
        'Song Added',
        `"${song.title}" has been added to ${selectedPlaylist.name} playlist.`,
        [
          {
            text: 'Go to playlist',
            onPress: () => {
              if (
                route.name === 'PLAYLIST_DETAIL_SCREEN' &&
                route.params.playlistId === selectedPlaylist.id
              ) {
                // If already on the same playlist, do nothing
                return;
              } else if (route.name === 'PLAYLIST_DETAIL_SCREEN') {
                // Update the route params if already on the PlaylistDetailScreen
                navigation.setParams({
                  playlistId: selectedPlaylist.id,
                  userId: auth().currentUser.uid,
                });
              } else {
                // Navigate to PlaylistDetailScreen if not already on it
                navigation.navigate('PLAYLIST_DETAIL_SCREEN', {
                  playlistId: selectedPlaylist.id,
                  userId: auth().currentUser.uid,
                });
              }
            },
          },
          {
            text: 'OK',
            style: 'cancel',
          },
        ],
      );
    } else {
      Alert.alert('Please select a playlist.');
    }
  };

  const handleCreatePlaylist = async () => {
    if (newPlaylistName.trim()) {
      await createPlaylist(newPlaylistName.trim());
      setNewPlaylistName('');
      setNewPlaylistModalVisible(false);
      setIsModalVisible(true);
    } else {
      Alert.alert('Playlist name cannot be empty');
    }
  };

  const renderPlaylistOption = ({item}) => (
    <TouchableOpacity
      style={styles.playlistOption}
      onPress={() => setSelectedPlaylist(item)}>
      <Ionicons
        name={
          selectedPlaylist?.id === item.id
            ? 'checkbox-outline'
            : 'square-outline'
        }
        size={iconSizes.md}
        color={colors.iconPrimary}
      />
      <Text style={[styles.playlistOptionText, {color: colors.text}]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Ionicons
          name="add-circle-outline"
          size={iconSizes.sm}
          color={colors.iconPrimary}
        />
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, {backgroundColor: colors.card}]}>
            <Text style={[styles.modalTitle, {color: colors.textPrimary}]}>
              Add Song to Playlist
            </Text>
            {playlists.length === 0 ? (
              <View style={styles.noPlaylistsContainer}>
                <Text style={[styles.noPlaylistsText, {color: colors.text}]}>
                  No playlists found. Create a new playlist.
                </Text>
                <Button
                  title="Create Playlist"
                  onPress={() => {
                    setNewPlaylistModalVisible(true);
                    setIsModalVisible(false);
                  }}
                />
              </View>
            ) : (
              <>
                <FlatList
                  data={playlists}
                  renderItem={renderPlaylistOption}
                  keyExtractor={item => item.id}
                />
                <View style={styles.modalButtons}>
                  <Button
                    title="Cancel"
                    onPress={() => setIsModalVisible(false)}
                  />
                  <Button title="Confirm" onPress={handleAddSongToPlaylist} />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      <CustomModal
        visible={newPlaylistModalVisible}
        onClose={() => setNewPlaylistModalVisible(false)}>
        <TextInput
          style={[
            styles.input,
            {borderColor: colors.border, color: colors.text},
          ]}
          placeholder="Playlist Name"
          placeholderTextColor={colors.textSecondary}
          value={newPlaylistName}
          onChangeText={setNewPlaylistName}
        />
        <TouchableOpacity
          onPress={handleCreatePlaylist}
          style={styles.createButton}>
          <Text style={[styles.createButtonText, {color: colors.primary}]}>
            Create
          </Text>
        </TouchableOpacity>
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '90%',
    padding: spacing.lg,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamilies.bold,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  playlistOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
  playlistOptionText: {
    marginLeft: spacing.sm,
    fontSize: fontSize.md,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  noPlaylistsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  noPlaylistsText: {
    fontSize: fontSize.md,
    fontFamily: fontFamilies.regular,
    marginBottom: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  createButton: {
    backgroundColor: 'blue',
    padding: spacing.md,
    borderRadius: 5,
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: fontSize.md,
    fontFamily: fontFamilies.bold,
  },
});

export default AddToPlaylistButton;
