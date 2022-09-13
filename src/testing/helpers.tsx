import { render } from "@testing-library/react-native";

import { MarkersProvider } from "../context/Markers";

export const renderWithProvider = (component: JSX.Element) =>
  render(<MarkersProvider>{component}</MarkersProvider>);
