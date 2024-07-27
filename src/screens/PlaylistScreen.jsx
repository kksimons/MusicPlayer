// src/screens/PlaylistScreen.jsx
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import {PlaylistContext} from '../context/PlaylistContext';
import PlaylistList from '../components/PlaylistList';
import CustomModal from '../components/CustomModal';
import {useTheme} from '@react-navigation/native';
import {fontSize, spacing, iconSizes} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const PlaylistScreen = ({route}) => {
  const {createPlaylist} = useContext(PlaylistContext);
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName('');
      setModalVisible(false);
    } else {
      Alert.alert('Playlist name cannot be empty');
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <AntDesign name={'arrowleft'} color={colors.iconPrimary} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headingText, {color: colors.textPrimary}]}>
          Your Playlists
        </Text>
      </View>

      <PlaylistList />

      <TouchableOpacity
        style={[styles.createContainer, {backgroundColor: colors.card}]}
        onPress={() => setModalVisible(true)}>
        <Ionicons
          name="add-circle"
          size={iconSizes.lg}
          color={colors.primary}
        />
        <Text style={[styles.createText, {color: colors.textPrimary}]}>
          Create Playlist
        </Text>
      </TouchableOpacity>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}>
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
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  headingText: {
    fontSize: fontSize.xl,
    fontFamily: fontFamilies.bold,
    padding: spacing.lg,
  },
  createContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    borderRadius: 10,
    marginTop: spacing.md,
  },
  createText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamilies.medium,
    marginLeft: spacing.sm,
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

export default PlaylistScreen;
