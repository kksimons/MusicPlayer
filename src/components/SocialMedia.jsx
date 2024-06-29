import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SocialMedia = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/SocialMediaIcons/facebook.png")}
                style={styles.image}
            />
            <Image
                source={require("../../assets/SocialMediaIcons/twitter.png")}
                style={styles.twitterIcon}
            />
            <Image
                source={require("../../assets/SocialMediaIcons/google.png")}
                style={styles.image}
            />
        </View>
    )
}

export default SocialMedia

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center"
    },
    twitterIcon: {
        height: 55,
        width: 55,
        marginTop: 15
    },
    image: {
        height: 40,
        width: 40
    }
})