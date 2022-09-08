import { LatLng } from "react-native-maps";

export type RootStackParamList = {
  Home: undefined;
  Details: { coordinate: LatLng };
};
