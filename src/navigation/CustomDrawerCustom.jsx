import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { colors } from '../constants/colors'
import { fontSize, iconSizes, spacing } from '../constants/dimensions'

//icons
import AntDesign from "react-native-vector-icons/AntDesign"
import Octicons from "react-native-vector-icons/Octicons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { fontFamilies } from '../constants/fonts'

const CustomDrawerCustom = (props) => {
    const isDarkMode = true;
    const toggleDrawer = () => {
        props.navigation.toggleDrawer()
    }

    return (
        <DrawerContentScrollView style={styles.container}>
            <View style={styles.headerIconContainer}>
                <TouchableOpacity onPress={toggleDrawer}>
                    <AntDesign name={"close"} color={colors.iconPrimary} size={iconSizes.lg} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Octicons name={isDarkMode ? "moon" : "sun"} color={colors.iconPrimary} size={iconSizes.lg} />
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
                    labelStyle={styles.labelStyle}
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
                    labelStyle={styles.labelStyle}
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
                    labelStyle={styles.labelStyle}
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
                    labelStyle={styles.labelStyle}
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
                    labelStyle={styles.labelStyle}
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
                    labelStyle={styles.labelStyle}
                    style={styles.drawerItem}
                    onPress={() => { props.navigation.navigate("LIKE_SCREEN") }}
                />
            </View>
        </DrawerContentScrollView>
    )
}

export default CustomDrawerCustom

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
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
        color: colors.textPrimary,
        fontFamily: fontFamilies.medium
    },
    drawerItem: {
        marginVertical: spacing.sm,
    }
})