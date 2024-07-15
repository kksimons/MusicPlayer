import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import HomeScreen from '../screens/HomeScreen';
import LikeScreen from '../screens/LikeScreen';
import PlayerScreen from '../screens/PlayerScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator()

const StackNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen name="LOGIN_SCREEN" component={LoginScreen} />
            <Stack.Screen name="SIGNUP_SCREEN" component={SignUpScreen} />
            <Stack.Screen name="HOME_SCREEN" component={HomeScreen} />
            <Stack.Screen name="LIKE_SCREEN" component={LikeScreen} />
            <Stack.Screen name="PLAYER_SCREEN" component={PlayerScreen} />
        </Stack.Navigator>
    )
}

export default StackNavigation

const styles = StyleSheet.create({})