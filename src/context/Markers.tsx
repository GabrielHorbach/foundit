import { createContext, ReactNode, useContext, useState } from "react";

import { MapMarker, MarkersContextValue } from "./types";

const MarkersContext = createContext<MarkersContextValue>(null!);

export function useMarkers() {
  return useContext(MarkersContext);
}

type MarkersProviderProps = {
  children: ReactNode;
};

export function MarkersProvider({ children }: MarkersProviderProps) {
  const [markers, setMarkers] = useState<MapMarker[]>([
    {
      coordinate: {
        latitude: -29.922951,
        longitude: -51.201088,
      },
    },
  ]);

  const addMarker = (marker: MapMarker) => {
    setMarkers((markers) => [...markers, marker]);
  };

  return (
    <MarkersContext.Provider
      value={{
        markers,
        addMarker,
      }}
    >
      {children}
    </MarkersContext.Provider>
  );
}
