import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import { fontSize } from '../constants/dimensions'

//icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

const PlayerRepeatToggle = () => {
    return (
        <TouchableOpacity>
            <MaterialCommunityIcons name={"repeat"} color={colors.iconSecondary} size={fontSize.lg} />
        </TouchableOpacity>
    )
}

export default PlayerRepeatToggle

const styles = StyleSheet.create({})