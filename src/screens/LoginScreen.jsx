import { Alert, TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import LoginButton from '../components/LoginButton';
import LoginTextInput from '../components/LoginTextInput';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useTheme } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '133193443453-pdgm3lo5633s7afobtff096anitrbpn4.apps.googleusercontent.com',
        });
    }, []);

    async function onGoogleButtonPress() {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            await auth().signInWithCredential(googleCredential);
            console.log('Signed in with Google!');
            navigation.navigate("HOME_SCREEN");
        } catch (error) {
            console.error(error);
        }
    }

    const loginWithEmailAndPass = () => {
        if (!email || !password) {
            Alert.alert("Error", "Email and Password cannot be empty");
            return;
        }

        auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res);
                Alert.alert("Logged In Successfully");
                navigation.navigate("HOME_SCREEN");
            })
            .catch((err) => {
                console.log(err);
                const errorMessage = err.nativeErrorMessage || err.message || "An error occurred during sign-in";
                Alert.alert("Error", errorMessage);
            });
    };

    return (
        <View style={[styles.container, { backgroundColor: '#2c2d33' }]}>
            <Image source={require('../../assets/logo.png')} style={styles.logo} />
            <View style={styles.inputContainer}>
                <LoginTextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder="Email or Username"
                    placeholderTextColor={colors.textSecondary}
                    style={[styles.input, { borderColor: '#FFA300', color: colors.textPrimary }]}
                />
                <LoginTextInput
                    value={password}
                    onChangeText={text => setPassword(text)}
                    placeholder="Password"
                    secureTextEntry
                    placeholderTextColor={colors.textSecondary}
                    style={[styles.input, { borderColor: '#FFA300', color: colors.textPrimary }]}
                />
                <View style={styles.textNoAccountContainer}>
                    <Text style={[styles.textNoAccount, { color: colors.textSecondary }]}>
                        Don't have an account yet?
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("SIGNUP_SCREEN")}>
                        <Text style={styles.signUp}> Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonWrapper}>
                    <LoginButton onPress={loginWithEmailAndPass} title={"Login"} buttonStyle={{ backgroundColor: '#FFA300' }} />
                </View>
                <Text style={[styles.orText, { color: colors.textSecondary }]}>OR</Text>
                <TouchableOpacity onPress={onGoogleButtonPress}>
                    <Text style={styles.googleSignIn}>Sign in with Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;

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
    textNoAccountContainer: {
        flexDirection: 'row',
        alignSelf: "flex-end",
        marginRight: 10,
    },
    textNoAccount: {
        color: 'white',
    },
    orText: {
        fontSize: 20,
        marginTop: 20,
    },
    signUp: {
        textDecorationLine: 'underline',
        color: 'white',
    },
    googleSignIn: {
        color: 'white',
        textDecorationLine: 'underline',
        marginTop: 10,
        fontSize: 18,
    },
});
