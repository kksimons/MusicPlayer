import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { iconSizes } from '../constants/dimensions'
import { colors } from '../constants/colors'
//icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"


const PlayerShuffleToggle = () => {
    return (
        <TouchableOpacity>
            <MaterialCommunityIcons name={"shuffle"} size={iconSizes.sm} color={colors.iconSecondary} />
        </TouchableOpacity>
    )
}

export default PlayerShuffleToggle

const styles = StyleSheet.create({})