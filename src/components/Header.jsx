import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {iconSizes, spacing} from '../constants/dimensions';
//icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Header = ({onSearchPress}) => {
  const {colors} = useTheme();

  const navigation = useNavigation();
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleDrawer}>
        <FontAwesome5
          name="grip-lines"
          color={colors.iconPrimary}
          size={iconSizes.lg}
        />
      </TouchableOpacity>
      <Text style={[styles.heading, {color: colors.text}]}>StreamSonic</Text>
      <TouchableOpacity onPress={onSearchPress} style={styles.searchIcon}>
        <Ionicons
          name="search"
          size={iconSizes.md}
          color={colors.iconPrimary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
    paddingHorizontal: spacing.lg,
  },
});
