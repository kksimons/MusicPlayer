import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { iconSizes, spacing, fontSize, fontFamilies } from '../constants/dimensions';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();
  const { colors } = useTheme();

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUser(currentUser);
      setEmail(currentUser.email);
      firestore()
        .collection('users')
        .doc(currentUser.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            const userData = documentSnapshot.data();
            setUsername(userData.username);
            setPhotoURL(userData.photoURL);
          }
        });
    }
  }, []);

  const handleUpdateUsername = () => {
    if (user) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .update({ username })
        .then(() => {
          Alert.alert('Profile Updated', 'Your username has been updated successfully.');
        })
        .catch(error => {
          Alert.alert('Error', error.message);
        });
    }
  };

  const handleChangePassword = () => {
    if (user) {
      user.updatePassword(newPassword)
        .then(() => {
          Alert.alert('Password Changed', 'Your password has been updated successfully.');
          setNewPassword('');
        })
        .catch(error => {
          Alert.alert('Error', error.message);
        });
    }
  };

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
      <Text style={styles.title}>Profile</Text>
      {photoURL ? <Image source={{ uri: photoURL }} style={styles.profileImage} /> : null}
      <TextInput
        style={styles.input}
        value={email}
        editable={false}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <Button title="Update Username" onPress={handleUpdateUsername} />
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New Password"
        secureTextEntry
      />
      <Button title="Change Password" onPress={handleChangePassword} />
    </View>
  );
};

export default ProfileScreen;

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
    color: 'lightblue',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
});
