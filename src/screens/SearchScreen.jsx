import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Button,
  Alert,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {spacing, fontSize, iconSizes} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SuggestedSongCard from '../components/SuggestedSongCard';

const SearchScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const currentUserId = auth().currentUser.uid;

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playlistRef = firestore()
          .collection('users')
          .doc(currentUserId)
          .collection('playlists');
        const snapshot = await playlistRef.get();

        const fetchedPlaylists = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPlaylists(fetchedPlaylists);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, [currentUserId]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length >= 3) {
        try {
          const songsSnapshot = await firestore().collection('songs').get();
          const allSongs = songsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          const lowerCaseSearchTerm = searchTerm.toLowerCase();

          const filteredSongs = allSongs.filter(
            song =>
              song.title.toLowerCase().includes(lowerCaseSearchTerm) ||
              song.artist.toLowerCase().includes(lowerCaseSearchTerm),
          );

          setSuggestions(filteredSongs);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  const handleAddSongToPlaylist = async () => {
    if (selectedPlaylist && selectedSong) {
      try {
        await firestore()
          .collection('users')
          .doc(currentUserId)
          .collection('playlists')
          .doc(selectedPlaylist.id)
          .update({
            songs: firestore.FieldValue.arrayUnion(selectedSong.id),
          });

        Alert.alert(
          'Song Added',
          `The song has been added to ${selectedPlaylist.name}.`,
          [
            {
              text: 'OK',
              onPress: () =>
                navigation.navigate('PLAYLIST_DETAIL_SCREEN', {
                  playlistId: selectedPlaylist.id,
                }),
            },
          ],
        );

        setIsModalVisible(false);
      } catch (error) {
        console.error('Error adding song to playlist:', error);
      }
    } else {
      Alert.alert('Please select a playlist.');
    }
  };

  const renderSuggestion = ({item}) => (
    <SuggestedSongCard
      song={item}
      onAdd={song => {
        setSelectedSong(song);
        setIsModalVisible(true);
      }}
    />
  );

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
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="close"
            size={iconSizes.md}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
        <Text style={[styles.headerText, {color: colors.textPrimary}]}>
          Search
        </Text>
      </View>
      <TextInput
        style={[
          styles.searchBar,
          {borderColor: colors.border, color: colors.textSecondary},
        ]}
        placeholder="Search for songs or artists"
        placeholderTextColor={colors.textSecondary}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={suggestions}
        renderItem={renderSuggestion}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          suggestions.length > 0 && (
            <Text style={[styles.heading, {color: colors.textPrimary}]}>
              Suggested Songs
            </Text>
          )
        }
        ListEmptyComponent={
          searchTerm.length > 2 && (
            <Text style={[styles.noResultsText, {color: colors.textSecondary}]}>
              No results found
            </Text>
          )
        }
        contentContainerStyle={styles.suggestionsContainer}
      />
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, {backgroundColor: colors.card}]}>
            <Text style={[styles.modalTitle, {color: colors.textPrimary}]}>
              Select Playlist
            </Text>
            <FlatList
              data={playlists}
              renderItem={renderPlaylistOption}
              keyExtractor={item => item.id}
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
              <Button title="Confirm" onPress={handleAddSongToPlaylist} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  headerText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamilies.bold,
    marginVertical: spacing.md,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamilies.bold,
    marginLeft: spacing.sm,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: spacing.md,
    marginBottom: spacing.md,
    fontSize: fontSize.md,
    fontFamily: fontFamilies.regular,
  },
  suggestionsContainer: {
    paddingVertical: spacing.md,
  },
  heading: {
    fontSize: fontSize.lg,
    fontFamily: fontFamilies.bold,
    marginBottom: spacing.md,
  },
  noResultsText: {
    fontSize: fontSize.md,
    fontFamily: fontFamilies.regular,
    padding: spacing.md,
  },
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
});

export default SearchScreen;
