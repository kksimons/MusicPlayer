import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import { colors } from '../constants/colors';
import { iconSizes, spacing } from '../constants/dimensions';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Header />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
    },
});

export default HomeScreen;
