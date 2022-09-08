import { LatLng } from "react-native-maps";

export type MapMarker = {
  coordinate: LatLng;
};

export type MarkersContextValue = {
  markers: MapMarker[];
  addMarker: (marker: MapMarker) => void;
};
