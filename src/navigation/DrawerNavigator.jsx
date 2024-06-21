import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import StackNavigation from './StackNavigation'
import CustomDrawerCustom from './CustomDrawerCustom'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator screenOptions={{
            headerShown: false,
            drawerType: "slide",
            swipeEdgeWidth: 0,
        }}
            drawerContent={(props) => <CustomDrawerCustom {...props} />}
        >
            <Drawer.Screen name="DRAWER_HOME" component={StackNavigation} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigator