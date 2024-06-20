import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import HomeScreen from '../Screen/HomeScreen';
import LikeScreen from '../Screen/LikeScreen';
import PlayerScreen from '../Screen/PlayerScreen';

const Stack = createNativeStackNavigator()

const StackNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}
        >
            <Stack.Screen name="HOME_SCREEN" component={HomeScreen} />
            <Stack.Screen name="LIKE_SCREEN" component={LikeScreen} />
            <Stack.Screen name="PLAYER_SCREEN" component={PlayerScreen} />
        </Stack.Navigator>
    )
}

export default StackNavigation

const styles = StyleSheet.create({})