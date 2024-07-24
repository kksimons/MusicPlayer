import {
  Alert,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import LoginButton from '../components/LoginButton';
import LoginTextInput from '../components/LoginTextInput';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useTheme} from '@react-navigation/native';

const SignUpScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const generateRandomCatPhotoURL = () => {
    return `https://cataas.com/cat?width=200&height=200&random=${Math.floor(
      Math.random() * 1000,
    )}`;
  };

  const signUpTestFn = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async userCredential => {
        const user = userCredential.user;
        const username = email.substring(0, email.indexOf('@')); // get texts before email '@' as auto generated username
        const randomCatPhotoURL = generateRandomCatPhotoURL(); // generate a random cat photo as auto generated profile picture

        // Add user to Firestore
        await firestore().collection('users').doc(user.uid).set({
          email: email,
          username: username,
          photoURL: randomCatPhotoURL,
        });

        Alert.alert('Success', `User created with ${email}; Please login`);
        navigation.navigate('LOGIN_SCREEN');
      })
      .catch(err => {
        console.log(err);
        const errorMessage =
          err.nativeErrorMessage ||
          err.message ||
          'An error occurred during sign-up';
        Alert.alert('Error', errorMessage);
      });
  };

  return (
    <View style={[styles.container, {backgroundColor: '#2c2d33'}]}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <LoginTextInput
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Email or Username"
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, {borderColor: '#FFA300', color: 'white'}]}
        />
        <LoginTextInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, {borderColor: '#FFA300', color: 'white'}]}
        />
        <LoginTextInput
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          placeholder="Confirm Password"
          secureTextEntry
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, {borderColor: '#FFA300', color: 'white'}]}
        />
        <View style={styles.buttonWrapper}>
          <LoginButton
            onPress={signUpTestFn}
            title={'Sign Up'}
            buttonStyle={{backgroundColor: '#FFA300'}}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('LOGIN_SCREEN')}>
          <Text style={[styles.orText, {color: colors.textSecondary}]}>
            Back to the sign in page
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonWrapper: {
    width: '100%',
    height: 50,
    marginTop: 5,
  },
  orText: {
    fontSize: 12,
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
