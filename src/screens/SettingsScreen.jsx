import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      {/* Add your settings options here */}
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Car</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Devices</Text>
      </TouchableOpacity>
      {/* Add back button to go back to the previous screen */}
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.goBackButtonText}>Go Back</Text>
      </TouchableOpacity>
      {/* Add more options as needed */}
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  goBackButton: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'lightblue',
    marginVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  goBackButtonText: {
    fontSize: 18,
    color: 'black',
  },
});
