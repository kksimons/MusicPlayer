import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { iconSizes, spacing, fontSize, fontFamilies } from '../constants/dimensions';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <AntDesign name={"arrowleft"} color={colors.iconPrimary} size={iconSizes.md} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Settings</Text>
      {/* Add your settings options here */}
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PROFILE_SCREEN')}>
        <Text style={[styles.optionText, { color:'black' }]}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    padding: spacing.lg,
  },
  option: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#eee',
    marginVertical: 10,
    width: '100%',
  },
  optionText: {
    fontSize: 18,
  },
});
