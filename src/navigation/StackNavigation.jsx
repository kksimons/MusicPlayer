// src/navigation/StackNavigation.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LikeScreen from '../screens/LikeScreen';
import PlayerScreen from '../screens/PlayerScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import PlaylistScreen from '../screens/PlaylistScreen'; 

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LOGIN_SCREEN" component={LoginScreen} />
            <Stack.Screen name="SIGNUP_SCREEN" component={SignUpScreen} />
            <Stack.Screen name="HOME_SCREEN" component={HomeScreen} />
            <Stack.Screen name="LIKE_SCREEN" component={LikeScreen} />
            <Stack.Screen name="PLAYER_SCREEN" component={PlayerScreen} />
            <Stack.Screen name="PLAYLIST_SCREEN" component={PlaylistScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}

export default StackNavigation;
