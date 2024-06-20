import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View } from "react-native"
import HomeScreen from "./src/Screen/HomeScreen";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LikeScreen from "./src/Screen/LikeScreen";
import PlayerScreen from "./src/Screen/PlayerScreen";
import StackNavigation from "./src/navigation/StackNavigation";
import DrawerNavigator from "./src/navigation/DrawerNavigator";


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {/* <StackNavigation /> */}
        <DrawerNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

export default App;