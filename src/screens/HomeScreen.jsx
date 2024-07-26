// src/screens/HomeScreen.jsx
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View, TouchableOpacity} from 'react-native';
import Header from '../components/Header';
import SongCardWithCategory from '../components/SongCardWithCategory';
import FloatingPlayer from '../components/FloatingPlayer';
import {useTheme} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {spacing, iconSizes} from '../constants/dimensions';

const HomeScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [songsWithCategory, setSongsWithCategory] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songCollection = await firestore().collection('songs').get();
        const recommendedSongs = songCollection.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          release_date: doc.data().release_date.toDate(), // convert timestamp to Date object
        }));

        const categories = [
          {
            title: 'Recommended For You',
            songs: recommendedSongs,
          },
          {
            title: 'New Release',
            songs: recommendedSongs,
          },
          {
            title: 'NCS Songs',
            songs: recommendedSongs,
          },
        ];

        setSongsWithCategory(categories);
      } catch (error) {
        console.error('Error fetching songs: ', error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <Header onSearchPress={() => navigation.navigate('SEARCH_SCREEN')} />
      <FlatList
        data={songsWithCategory}
        renderItem={({item}) => <SongCardWithCategory item={item} />}
        contentContainerStyle={{
          paddingBottom: 400,
        }}
      />
      <FloatingPlayer />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
