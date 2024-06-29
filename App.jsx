import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, useColorScheme } from "react-native"
import HomeScreen from "./src/screens/HomeScreen";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LikeScreen from "./src/screens/LikeScreen";
import PlayerScreen from "./src/screens/PlayerScreen";
import StackNavigation from "./src/navigation/StackNavigation";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import TrackPlayer from 'react-native-track-player';
import { useEffect } from "react";
import { useSetupPlayer } from "./src/hooks/useSetupTrackPlayer";
import useLikeSongs from "./src/store/likeStore";
import { darkTheme } from "./src/theme/darkTheme";
import { lightTheme } from "./src/theme/lightTheme";
import { useThemeStore } from "./src/store/themeStore";


const App = () => {
  const { isDarkMode, toggleTheme } = useThemeStore()
  const { loadLikedSongs } = useLikeSongs()
  //get the system default
  const scheme = useColorScheme()

  useEffect(() => {
    loadLikedSongs()
    scheme === "light" ? toggleTheme(false) : toggleTheme(true)
  }, [scheme])

  const onLoad = () => {
    console.log("track player setup")
  }

  useSetupPlayer({ onLoad });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
        {/* <StackNavigation /> */}
        <DrawerNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App;