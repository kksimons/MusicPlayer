import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useTheme} from '@react-navigation/native';
import {fontSize, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import FollowUserCard from './FollowUserCard';
import {useNavigation} from '@react-navigation/native';

const FollowList = ({refresh}) => {
  const [followedUsers, setFollowedUsers] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null); // To track expanded user
  const [userPlaylists, setUserPlaylists] = useState({}); // To store playlists of each user
  const {colors} = useTheme();
  const navigation = useNavigation();

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
      setUserPlaylists(prev => {
        const newPlaylists = {...prev};
        delete newPlaylists[unfollowId];
        return newPlaylists;
      });

      Alert.alert('Unfollowed', `You have unfollowed ${username}.`);
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const toggleUserPlaylists = async userId => {
    if (expandedUserId === userId) {
      setExpandedUserId(null); // Collapse if already expanded
    } else {
      if (!userPlaylists[userId]) {
        try {
          const playlistsSnapshot = await firestore()
            .collection('users')
            .doc(userId)
            .collection('playlists')
            .where('visibility', '==', true)
            .get();

          const userPlaylistsData = playlistsSnapshot.docs.map(doc => ({
            id: doc.id,
            userId: userId,
            ...doc.data(),
          }));

          setUserPlaylists(prev => ({
            ...prev,
            [userId]: userPlaylistsData,
          }));
        } catch (error) {
          console.error('Error fetching playlists:', error);
        }
      }
      setExpandedUserId(userId); // Expand new user
    }
  };

  const renderPlaylist = ({item}) => (
    <TouchableOpacity
      style={[styles.playlistContainer, {backgroundColor: colors.card}]}
      onPress={() =>
        navigation.navigate('PLAYLIST_DETAIL_SCREEN', {
          playlistId: item.id,
          userId: item.userId,
        })
      }>
      {item.artwork && (
        <Image source={{uri: item.artwork}} style={styles.artwork} />
      )}
      <View style={styles.playlistDetails}>
        <Text style={[styles.playlistName, {color: colors.text}]}>
          {item.name}
        </Text>
        <Text style={[styles.songCount, {color: colors.textSecondary}]}>
          {item.songs.length} {item.songs.length === 1 ? 'song' : 'songs'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, {color: colors.textPrimary}]}>
        People you follow
      </Text>
      <FlatList
        data={followedUsers}
        renderItem={({item}) => (
          <>
            <FollowUserCard
              user={item}
              onAction={handleUnfollow}
              isFollowing={true}
              onPress={() => toggleUserPlaylists(item.id)}
            />
            {expandedUserId === item.id && userPlaylists[item.id] && (
              <FlatList
                data={userPlaylists[item.id]}
                renderItem={renderPlaylist}
                keyExtractor={playlist => playlist.id}
                ListEmptyComponent={
                  <Text
                    style={[styles.noUsersText, {color: colors.textSecondary}]}>
                    No playlists found.
                  </Text>
                }
              />
            )}
          </>
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
  playlistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 10,
    marginBottom: spacing.md,
  },
  artwork: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: spacing.md,
  },
  playlistDetails: {
    flex: 1,
  },
  playlistName: {
    fontSize: fontSize.lg,
    fontFamily: fontFamilies.medium,
  },
  songCount: {
    fontSize: fontSize.sm,
    fontFamily: fontFamilies.regular,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default FollowList;
