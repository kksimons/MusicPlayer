// components/AddFollow.jsx
import React, {useState, useEffect} from 'react';
import {View, TextInput, FlatList, Text, StyleSheet, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useTheme} from '@react-navigation/native';
import {fontSize, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import SuggestedUserCard from './SuggestedUserCard';

const AddFollow = ({onUserFollowed}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const {colors} = useTheme();

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      if (searchTerm.length > 2) {
        try {
          const usersRef = firestore().collection('users');
          const snapshotByEmail = await usersRef
            .where('email', '>=', searchTerm)
            .where('email', '<=', searchTerm + '\uf8ff')
            .get();
          const snapshotByUsername = await usersRef
            .where('username', '>=', searchTerm)
            .where('username', '<=', searchTerm + '\uf8ff')
            .get();

          const usersByEmail = snapshotByEmail.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          const usersByUsername = snapshotByUsername.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          const users = [
            ...new Map(
              [...usersByEmail, ...usersByUsername].map(item => [
                item.id,
                item,
              ]),
            ).values(),
          ];
          setSuggestedUsers(users);
        } catch (error) {
          console.error('Error fetching users: ', error);
        }
      } else {
        setSuggestedUsers([]);
      }
    };

    fetchSuggestedUsers();
  }, [searchTerm]); // Re-fetch users when searchTerm changes

  const handleAddFollow = async followId => {
    try {
      const currentUserId = auth().currentUser.uid;
      const currentUserRef = firestore().collection('users').doc(currentUserId);

      const doc = await currentUserRef.get();
      if (doc.exists) {
        const currentUserData = doc.data();
        const {follows = []} = currentUserData;

        if (follows.includes(followId)) {
          Alert.alert('You have already followed this user!');
        } else {
          const followUserDoc = await firestore()
            .collection('users')
            .doc(followId)
            .get();
          const followUserData = followUserDoc.data();
          const username = followUserData.username;

          await currentUserRef.update({
            follows: firestore.FieldValue.arrayUnion(followId),
          });

          Alert.alert('Followed!', `You are now following ${username}.`, [
            {text: 'OK'},
          ]);

          if (onUserFollowed) {
            onUserFollowed();
          }
        }
      } else {
        console.error('User document not found');
      }
    } catch (error) {
      console.error('Error updating follows:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, {color: colors.textPrimary}]}>
        Follow other users:
      </Text>
      <TextInput
        placeholder="Search by email or username"
        placeholderTextColor={colors.textSecondary}
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={[
          styles.searchBar,
          {borderColor: colors.border, color: colors.textSecondary},
        ]}
      />
      <FlatList
        data={suggestedUsers}
        renderItem={({item}) => (
          <SuggestedUserCard user={item} onAdd={handleAddFollow} />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          suggestedUsers.length > 0 && (
            <Text style={[styles.heading, {color: colors.textPrimary}]}>
              Suggested Users
            </Text>
          )
        }
        ListEmptyComponent={
          searchTerm.length > 2 && (
            <Text style={[styles.noUsersText, {color: colors.textSecondary}]}>
              No user found
            </Text>
          )
        }
        contentContainerStyle={styles.suggestedUsersContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
  },
  headerText: {
    fontSize: fontSize.lg,
    fontFamily: fontFamilies.bold,
    marginVertical: spacing.md,
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
  suggestedUsersContainer: {
    paddingVertical: spacing.md,
  },
  heading: {
    fontSize: fontSize.lg,
    fontFamily: fontFamilies.bold,
    marginBottom: spacing.md,
  },
  noUsersText: {
    fontSize: fontSize.md,
    fontFamily: fontFamilies.regular,
    padding: spacing.md,
  },
});

export default AddFollow;
