// src/navigation/StackNavigation.js
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LikeScreen from '../screens/LikeScreen';
import PlayerScreen from '../screens/PlayerScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import PlaylistScreen from '../screens/PlaylistScreen';
import PlaylistDetailScreen from '../screens/PlaylistDetailScreen';
import FollowScreen from '../screens/FollowScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import FAQFormScreen from '../screens/FAQFormScreen';
import AdminScreen from '../screens/AdminScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LOGIN_SCREEN" component={LoginScreen} />
      <Stack.Screen name="SIGNUP_SCREEN" component={SignUpScreen} />
      <Stack.Screen name="HOME_SCREEN" component={HomeScreen} />
      <Stack.Screen name="LIKE_SCREEN" component={LikeScreen} />
      <Stack.Screen name="PLAYER_SCREEN" component={PlayerScreen} />
      <Stack.Screen name="PLAYLIST_SCREEN" component={PlaylistScreen} />
      <Stack.Screen name="FOLLOW_SCREEN" component={FollowScreen} />
      <Stack.Screen
        name="PLAYLIST_DETAIL_SCREEN"
        component={PlaylistDetailScreen}
      />
      <Stack.Screen name="SEARCH_SCREEN" component={SearchScreen} />
      <Stack.Screen name="SETTINGS_SCREEN" component={SettingsScreen} />
      <Stack.Screen name="FAQ_FORM_SCREEN" component={FAQFormScreen} />
      <Stack.Screen name="ADMIN" component={AdminScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
