import { fireEvent, screen } from "@testing-library/react-native";

import HomeScreen from ".";
import { renderWithProvider } from "../../testing/helpers";

const mockedNavigate = jest.fn();

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: mockedNavigate }),
}));

describe("Home Screen", () => {
  it("should render a MapView", () => {
    renderWithProvider(<HomeScreen />);
    const map = screen.getByTestId("mapview");
    expect(map).toBeDefined();
  });

  it("should call navigate to Details screen with coordinate when clicking on the map", () => {
    renderWithProvider(<HomeScreen />);
    const map = screen.getByTestId("mapview");

    const mapEventCoordinate = {
      coordinate: {
        latitude: 1,
        longitude: 2,
      },
    };

    fireEvent.press(map, {
      nativeEvent: mapEventCoordinate,
    });

    expect(mockedNavigate).toHaveBeenCalledWith("Details", mapEventCoordinate);
  });
});
