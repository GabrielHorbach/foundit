import { View } from "react-native";

import Map from "../../components/Map";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-blue-400 items-center justify-center">
      <Map />
    </View>
  );
}
