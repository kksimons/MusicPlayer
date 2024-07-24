// components/FollowList.jsx
import React, {useState, useEffect} from 'react';
import {View, FlatList, Text, StyleSheet, Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useTheme} from '@react-navigation/native';
import {fontSize, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import FollowUserCard from './FollowUserCard';

const FollowList = ({refresh}) => {
  const [followedUsers, setFollowedUsers] = useState([]);
  const {colors} = useTheme();

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      try {
        const currentUserId = auth().currentUser.uid;
        const currentUserRef = firestore()
          .collection('users')
          .doc(currentUserId);

        const doc = await currentUserRef.get();
        if (doc.exists) {
          const currentUserData = doc.data();
          const {follows = []} = currentUserData;

          const followedUsersData = await Promise.all(
            follows.map(async userId => {
              const userDoc = await firestore()
                .collection('users')
                .doc(userId)
                .get();
              return {id: userDoc.id, ...userDoc.data()};
            }),
          );

          setFollowedUsers(followedUsersData);
        }
      } catch (error) {
        console.error('Error fetching followed users:', error);
      }
    };

    fetchFollowedUsers();
  }, [refresh]);

  const handleUnfollow = async unfollowId => {
    try {
      const currentUserId = auth().currentUser.uid;
      const currentUserRef = firestore().collection('users').doc(currentUserId);

      const unfollowUserDoc = await firestore()
        .collection('users')
        .doc(unfollowId)
        .get();
      const unfollowUserData = unfollowUserDoc.data();
      const username = unfollowUserData.username;

      await currentUserRef.update({
        follows: firestore.FieldValue.arrayRemove(unfollowId),
      });

      setFollowedUsers(followedUsers.filter(user => user.id !== unfollowId));
      Alert.alert('Unfollowed', `You have unfollowed ${username}.`);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, {color: colors.textPrimary}]}>
        People you follow
      </Text>
      <FlatList
        data={followedUsers}
        renderItem={({item}) => (
          <FollowUserCard
            user={item}
            onAction={handleUnfollow}
            isFollowing={true}
          />
        )}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={[styles.noUsersText, {color: colors.textSecondary}]}>
            You are not following anyone yet.
          </Text>
        }
        contentContainerStyle={styles.followedUsersContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  heading: {
    fontSize: fontSize.lg,
    fontFamily: fontFamilies.bold,
    marginBottom: spacing.md,
  },
  followedUsersContainer: {
    paddingVertical: spacing.md,
  },
  noUsersText: {
    fontSize: fontSize.md,
    fontFamily: fontFamilies.regular,
    padding: spacing.md,
  },
});

export default FollowList;
