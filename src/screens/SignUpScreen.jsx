import { Alert, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import LoginButton from '../components/LoginButton'
import LoginTextInput from '../components/LoginTextInput'
import SocialMedia from '../components/SocialMedia'
import auth from "@react-native-firebase/auth"

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const signUpTestFn = () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                Alert.alert("Success", `User Created with ${email}; Please login`);
                navigation.navigate("LOGIN_SCREEN");
            })
            .catch((err) => {
                console.log(err);
                const errorMessage = err.nativeErrorMessage || err.message || "An error occurred during sign-up";
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
                    <LoginTextInput value={confirmPassword} onChangeText={text => setConfirmPassword(text)} placeholder="Confirm Password" secureTextEntry />
                    <View style={styles.buttonWrapper}>
                        <LoginButton onPress={signUpTestFn} title={"Sign Up"} />
                    </View>
                    <Text style={styles.orText}>OR</Text>
                    <SocialMedia />
                </View>
            </ImageBackground>
        </View>
    )
}

export default SignUpScreen

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
    }
})
