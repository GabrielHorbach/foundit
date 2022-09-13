import * as ImagePicker from "expo-image-picker";

export async function isCameraAllowed() {
  const { granted: alreadyGranted } = await ImagePicker.getCameraPermissionsAsync();
  if (alreadyGranted) return true;

  const { granted } = await ImagePicker.requestCameraPermissionsAsync();
  return granted;
}

export async function takePhotoAsync() {
  if (!(await isCameraAllowed())) {
    alert("need camera permission");
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  if (result.cancelled) {
    return;
  }

  const localUri = result.uri;
  // const filename = localUri.split("/").pop();
  // const match = /\.(\w+)$/.exec(filename!);
  // const type = match ? `image/${match[1]}` : `image`;
  return localUri;
}
