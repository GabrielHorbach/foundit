import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import MapView, { LatLng, MapEvent, Marker } from "react-native-maps";

import { regionFrom } from "../../helpers/map";

type MapMarker = {
  coordinate: LatLng;
};

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
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

  const onMapPress = (event: MapEvent<object>) => {
    const { coordinate } = event.nativeEvent;

    setMarkers((markers) => [
      ...markers,
      {
        coordinate,
      },
    ]);
  };

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
        onPress={onMapPress}
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        {markers.map((marker: MapMarker, id: number) => (
          <Marker key={id} coordinate={marker.coordinate} />
        ))}
      </MapView>
    </View>
  );
}
