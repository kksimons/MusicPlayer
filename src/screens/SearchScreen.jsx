import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {spacing, fontSize, iconSizes} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SuggestedSongCard from '../components/SuggestedSongCard';
import FloatingPlayer from '../components/FloatingPlayer';

const SearchScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

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

  const renderSuggestion = ({item}) => <SuggestedSongCard song={item} />;

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
      <FloatingPlayer />
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
});

export default SearchScreen;
