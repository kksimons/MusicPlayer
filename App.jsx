import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native"
import HomeScreen from "./src/Screen/HomeScreen";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LikeScreen from "./src/Screen/LikeScreen";
import PlayerScreen from "./src/Screen/PlayerScreen";


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false,
        }}
          initialRouteName="PLAYER_SCREEN"
        >
          <Stack.Screen name="HOME_SCREEN" component={HomeScreen} />
          <Stack.Screen name="LIKE_SCREEN" component={LikeScreen} />
          <Stack.Screen name="PLAYER_SCREEN" component={PlayerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App;