import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import { colors } from '../constants/colors';
import { fontSize, iconSizes, spacing } from '../constants/dimensions';
import { fontFamilies } from '../constants/fonts';
import SongCard from '../components/SongCard';
import SongCardWithCategory from '../components/SongCardWithCategory';
import FloatingPlayer from '../components/FloatingPlayer';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                data={[1, 2, 3, 4, 5]}
                renderItem={SongCardWithCategory}
                // space after scrolling at the bottom
                contentContainerStyle={{
                    paddingBottom: 400,
                }}
            />
            <FloatingPlayer />
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1
    }
})
