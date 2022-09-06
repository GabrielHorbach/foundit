import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import MapView from "react-native-maps";

import { regionFrom } from "../../helpers/map";

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const dimensions = Dimensions.get("window");

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      const position = await Location.getCurrentPositionAsync({});
      setLocation(position);
    })();
  }, []);

  return (
    <View className="w-100">
      <MapView
        showsUserLocation
        initialRegion={
          location
            ? regionFrom(
                location.coords.latitude,
                location.coords.longitude,
                location.coords.accuracy!
              )
            : undefined
        }
        style={{ width: dimensions.width, height: dimensions.height }}
      />
    </View>
  );
}
