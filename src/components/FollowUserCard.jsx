// components/FollowUserCard.jsx
import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {fontSize, iconSizes, spacing} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FollowUserCard = ({user, onAction, isFollowing}) => {
  const {colors} = useTheme();
  const iconName = isFollowing ? 'minuscircleo' : 'pluscircleo';

  return (
    <View
      style={[
        styles.userCard,
        {
          backgroundColor: colors.userCardBackgroundColor,
          borderColor: colors.userCardBorderColor,
        },
      ]}>
      <Image source={{uri: user.photoURL}} style={styles.profilePic} />
      <View style={styles.userInfo}>
        <Text style={[styles.username, {color: colors.userCardTextPrimary}]}>
          {user.username}
        </Text>
        <Text style={[styles.email, {color: colors.userCardTextSecondary}]}>
          {user.email}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => onAction(user.id)}
        style={styles.actionButton}>
        <AntDesign
          name={iconName}
          size={iconSizes.md}
          color={colors.iconPrimary}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: 8,
    marginRight: spacing.md,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  username: {
    fontSize: fontSize.md,
    fontFamily: fontFamilies.bold,
  },
  email: {
    fontSize: fontSize.sm,
    fontFamily: fontFamilies.regular,
  },
  actionButton: {
    padding: spacing.sm,
    marginLeft: spacing.md,
  },
});

export default FollowUserCard;
