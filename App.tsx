import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MarkersProvider } from "./src/context/Markers";
import DetailsScreen from "./src/screens/DetailsScreen";
import HomeScreen from "./src/screens/HomeScreen";
import { RootStackParamList } from "./src/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <MarkersProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={DetailsScreen} options={{ title: "" }} />
        </Stack.Navigator>
      </MarkersProvider>
    </NavigationContainer>
  );
}
