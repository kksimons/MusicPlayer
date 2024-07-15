import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';

const LoginTextInput = ({ style, ...props }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, style]}
                {...props}
            />
        </View>
    );
};

export default LoginTextInput;

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: "100%",
        justifyContent: "center",
        paddingHorizontal: 1,
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 50,
        color: 'white',
    },
});
