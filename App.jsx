import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import { useEffect } from "react";
import { useSetupPlayer } from "./src/hooks/useSetupTrackPlayer";
import useLikeSongs from "./src/store/likeStore";
import { darkTheme } from "./src/theme/darkTheme";
import { lightTheme } from "./src/theme/lightTheme";
import { useThemeStore } from "./src/store/themeStore";
import messaging from '@react-native-firebase/messaging';
import { PlaylistProvider } from "./src/context/PlaylistContext";// Corrected import path
import { useColorScheme } from 'react-native'; // Add this import

const App = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { loadLikedSongs } = useLikeSongs();
  const scheme = useColorScheme(); // Use this hook to get the current color scheme

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log("Token = ", token);
  }

  useEffect(() => {
    requestUserPermission();
    getToken();
  }, []);

  useEffect(() => {
    loadLikedSongs();
    scheme === "light" ? toggleTheme(false) : toggleTheme(true);
  }, [scheme]);

  const onLoad = () => {
    console.log("track player setup");
  }

  useSetupPlayer({ onLoad });

  return (
    <PlaylistProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
          <DrawerNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </PlaylistProvider>
  );
}

export default App;
