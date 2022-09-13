import { fireEvent, screen } from "@testing-library/react-native";

import DetailsScreen from ".";
import { takePhotoAsync } from "../../helpers/camera";
import { renderWithProvider } from "../../testing/helpers";

jest.mock("@react-navigation/elements", () => ({
  useHeaderHeight: jest.fn,
}));
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn,
}));
jest.mock("../../helpers/camera.ts", () => ({
  ...jest.requireActual("../../helpers/camera.ts"),
  takePhotoAsync: jest.fn(() => Promise.resolve("bestImageUriEver")),
}));

describe("Details Screen", () => {
  it("should display a image input if the user has not take a picture", () => {
    renderWithProvider(
      <DetailsScreen
        route={{
          params: { coordinate: { latitude: 1, longitude: 1 } },
          key: "",
          name: "Details",
          path: undefined,
        }}
      />
    );

    expect(screen.getByText("Take a picture")).toBeDefined();
  });

  it("should display an image preview if the user has added a picture", async () => {
    renderWithProvider(
      <DetailsScreen
        route={{
          params: { coordinate: { latitude: 1, longitude: 1 } },
          key: "",
          name: "Details",
          path: undefined,
        }}
      />
    );

    fireEvent.press(screen.getByText("Take a picture"));

    expect(takePhotoAsync).toHaveBeenCalled();

    expect(await screen.findByLabelText("Image preview")).toBeDefined();
  });

  it("should display all other required form elements", () => {
    renderWithProvider(
      <DetailsScreen
        route={{
          params: { coordinate: { latitude: 1, longitude: 1 } },
          key: "",
          name: "Details",
          path: undefined,
        }}
      />
    );

    expect(screen.getByPlaceholderText("Add a description")).toBeDefined();
    expect(screen.getByText("Cancel")).toBeDefined();
    expect(screen.getByText("Save")).toBeDefined();
  });

  it("should disable Save button if all fields are not filled", () => {
    renderWithProvider(
      <DetailsScreen
        route={{
          params: { coordinate: { latitude: 1, longitude: 1 } },
          key: "",
          name: "Details",
          path: undefined,
        }}
      />
    );

    expect(screen.getByTestId("save-button")).toBeDisabled();
  });
});
