import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { fontSize, iconSizes, spacing } from '../constants/dimensions'
import { fontFamilies } from '../constants/fonts'
import { useTheme } from '@react-navigation/native'
import { useThemeStore } from '../store/themeStore'

//icons
import AntDesign from "react-native-vector-icons/AntDesign"
import Octicons from "react-native-vector-icons/Octicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"

const CustomDrawerContent = (props) => {
    const { colors } = useTheme()
    const { isDarkMode, toggleTheme } = useThemeStore()

    const toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    return (
        <DrawerContentScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.headerIconContainer}>
                <TouchableOpacity onPress={toggleDrawer}>
                    <AntDesign name={"close"} color={colors.iconPrimary} size={iconSizes.lg} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggleTheme()}>
                    <Octicons
                        name={isDarkMode ? "sun" : "moon"}
                        color={colors.iconPrimary}
                        size={iconSizes.lg} />
                </TouchableOpacity>
            </View>
            <View style={styles.drawerItemContainer}>
                <DrawerItem
                    label={"Profile"}
                    icon={() => (
                        <FontAwesome
                            name={"user"}
                            size={iconSizes.md}
                            color={colors.iconSecondary}
                        />
                    )}
                    labelStyle={[styles.labelStyle, { color: colors.textPrimary }]}
                    style={styles.drawerItem}
                    onPress={() => { props.navigation.navigate("LIKE_SCREEN") }}
                />
                <DrawerItem
                    label={"Liked Songs"}
                    icon={() => (
                        <AntDesign
                            name={"hearto"}
                            size={iconSizes.md}
                            color={colors.iconSecondary}
                        />
                    )}
                    labelStyle={[styles.labelStyle, { color: colors.textPrimary }]}
                    style={styles.drawerItem}
                    onPress={() => { props.navigation.navigate("LIKE_SCREEN") }}
                />
                <DrawerItem
                    label={"Language"}
                    icon={() => (
                        <FontAwesome
                            name={"language"}
                            size={iconSizes.md}
                            color={colors.iconSecondary}
                        />
                    )}
                    labelStyle={[styles.labelStyle, { color: colors.textPrimary }]}
                    style={styles.drawerItem}
                    onPress={() => { props.navigation.navigate("LIKE_SCREEN") }}
                />
                <DrawerItem
                    label={"Contact Us"}
                    icon={() => (
                        <FontAwesome
                            name={"envelope-o"}
                            size={iconSizes.md}
                            color={colors.iconSecondary}
                        />
                    )}
                    labelStyle={[styles.labelStyle, { color: colors.textPrimary }]}
                    style={styles.drawerItem}
                    onPress={() => { props.navigation.navigate("LIKE_SCREEN") }}
                />
                <DrawerItem
                    label={"FAQs"}
                    icon={() => (
                        <FontAwesome
                            name={"question-circle-o"}
                            size={iconSizes.md}
                            color={colors.iconSecondary}
                        />
                    )}
                    labelStyle={[styles.labelStyle, { color: colors.textPrimary }]}
                    style={styles.drawerItem}
                    onPress={() => { props.navigation.navigate("LIKE_SCREEN") }}
                />
                <DrawerItem
                    label={"Settings"}
                    icon={() => (
                        <FontAwesome
                            name={"cog"}
                            size={iconSizes.md}
                            color={colors.iconSecondary}
                        />
                    )}
                    labelStyle={[styles.labelStyle, { color: colors.textPrimary }]}
                    style={styles.drawerItem}
                    onPress={() => { props.navigation.navigate("LIKE_SCREEN") }}
                />
            </View>
        </DrawerContentScrollView>
    )
}

export default CustomDrawerContent

const styles = StyleSheet.create({
    container: {
        padding: spacing.lg,
    },
    headerIconContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    drawerItemContainer: {
        marginVertical: spacing.lg
    },
    labelStyle: {
        fontSize: fontSize.md,
        fontFamily: fontFamilies.medium
    },
    drawerItem: {
        marginVertical: spacing.sm,
    }
})