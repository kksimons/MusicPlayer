// screens/FollowScreen.jsx
import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {iconSizes, spacing, fontSize} from '../constants/dimensions';
import {fontFamilies} from '../constants/fonts';
import AddFollow from '../components/AddFollow';
import FollowList from '../components/FollowList';

const FollowScreen = () => {
  const {colors} = useTheme();
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleUserFollowed = () => {
    setRefresh(!refresh); // Toggle the refresh state to trigger useEffect in FollowList
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <AntDesign
            name="arrowleft"
            color={colors.iconPrimary}
            size={iconSizes.md}
          />
        </TouchableOpacity>
        <Text style={[styles.headingText, {color: colors.textPrimary}]}>
          Followings
        </Text>
      </View>
      <FlatList
        data={[]}
        ListHeaderComponent={
          <>
            <AddFollow onUserFollowed={handleUserFollowed} />
            <FollowList refresh={refresh} />
          </>
        }
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    paddingBottom: spacing.lg,
  },
});

export default FollowScreen;
