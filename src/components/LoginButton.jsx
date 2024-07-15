import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LoginButton = ({ title, onPress, buttonStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, buttonStyle]}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

export default LoginButton;

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    title: {
        color: "white",
        fontSize: 20,
    }
});
