import { Alert, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LoginButton from '../components/LoginButton'
import LoginTextInput from '../components/LoginTextInput'
import SocialMedia from '../components/SocialMedia'
import auth from '@react-native-firebase/auth'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const loginWithEmailAndPass = () => {
        if (!email || !password) {
            Alert.alert("Error", "Email and Password cannot be empty");
            return;
        }

        auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res)
                Alert.alert("Logged In Successfully")
                navigation.navigate("HOME_SCREEN")
            })
            .catch((err) => {
                console.log(err);
                const errorMessage = err.nativeErrorMessage || err.message || "An error occurred during sign-in";
                Alert.alert("Error", errorMessage);
            })
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../../assets/background.png")} style={styles.imageBackground}>
                <Text style={styles.title}>StreamSonic</Text>
                <View style={styles.inputContainer}>
                    <LoginTextInput value={email} onChangeText={text => setEmail(text)} placeholder="Email or Username" />
                    <LoginTextInput value={password} onChangeText={text => setPassword(text)} placeholder="Password" secureTextEntry />
                    <Text style={styles.textNoAccount}>Don't have an account yet? <Text style={styles.signUp}>Sign Up</Text></Text>
                    <View style={styles.buttonWrapper}>
                        <LoginButton onPress={loginWithEmailAndPass} title={"Login"} />
                    </View>
                    <Text style={styles.orText}>OR</Text>
                    <SocialMedia />
                </View>
            </ImageBackground>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageBackground: {
        height: "100%",
        paddingHorizontal: 20,
        alignItems: "center"
    },
    image: {
        height: 50,
        width: 90,
        resizeMode: "stretch",
        position: "absolute",
        right: 20,
        top: 20
    },
    title: {
        fontSize: 40,
        color: "white",
        marginTop: 60
    },
    inputContainer: {
        height: 450,
        width: "100%",
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 80,
        paddingHorizontal: 20,
    },
    buttonWrapper: {
        width: '100%',
        height: 50,
        marginTop: 5,
    },
    textNoAccount: {
        alignSelf: "flex-end",
        marginRight: 10,
        color: "black",
    },
    orText: {
        fontSize: 20,
        color: "gray",
        marginTop: 20
    },
    signUp: {
        textDecorationLine: 'underline',
        color: 'blue'
    }
})
