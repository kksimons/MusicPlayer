import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'

const LoginTextInput = ({ ...props }) => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input} {...props} />
            <View style={styles.border} />
        </View>
    )
}

export default LoginTextInput

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: "100%",
        justifyContent: "center",
        paddingHorizontal: 1,
        marginBottom: 20
    },
    input: {
        width: "100%",
        height: 50
    },
    border: {
        width: "100%",
        backgroundColor: "gray",
        height: 1,
        alignSelf: "center"
    }
})
