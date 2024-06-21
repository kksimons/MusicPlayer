import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import { fontSize, iconSizes, spacing } from '../constants/dimensions';
import { fontFamilies } from '../constants/fonts';
import SongCard from '../components/SongCard';
import SongCardWithCategory from '../components/SongCardWithCategory';
import FloatingPlayer from '../components/FloatingPlayer';
import { songsWithCategory } from '../data/songsWithCategory';
import { useTheme } from '@react-navigation/native';

const HomeScreen = () => {
    const { colors } = useTheme()

    return (
        <View style={[, { backgroundColor: colors.background }]}>
            <Header />
            <FlatList
                data={songsWithCategory}
                renderItem={({ item }) => <SongCardWithCategory item={item} />}
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
        flex: 1
    }
})
