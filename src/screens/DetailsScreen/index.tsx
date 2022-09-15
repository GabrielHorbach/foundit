import AntIcons from "@expo/vector-icons/AntDesign";
import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useMarkers } from "../../context/Markers";
import { takePhotoAsync } from "../../helpers/camera";
import { RootStackParamList } from "../../types";

type DetailsScreenProps = Omit<NativeStackScreenProps<RootStackParamList, "Details">, "navigation">;

export default function DetailsScreen({ route }: DetailsScreenProps) {
  const [imageUri, setImageUri] = useState("");
  const [description, setDescription] = useState("");
  const headerHeight = useHeaderHeight();
  const scrollViewRef = useRef<ScrollView>(null);
  const { addMarker } = useMarkers();
  const navigator = useNavigation();
  const { coordinate } = route.params;

  const saveButtonDisabled = !imageUri || !description;

  async function handleSave() {
    const marker = {
      coordinate,
    };
    addMarker(marker);

    navigator.goBack();
  }

  async function handleTakePicture() {
    const localUri = await takePhotoAsync();
    setImageUri(localUri ?? "");
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 p-6 bg-white"
      behavior={Platform.select({
        ios: "padding",
        android: "height",
      })}
      keyboardVerticalOffset={headerHeight - 25}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        keyboardShouldPersistTaps="always"
        ref={scrollViewRef}
      >
        <View>
          <Text className="text-2xl font-bold mb-10 text-gray-800">Found a pet?</Text>

          {imageUri ? (
            <Image
              style={{
                height: undefined,
                aspectRatio: 1,
                resizeMode: "contain",
              }}
              className="w-100 rounded-md"
              source={{
                uri: imageUri,
              }}
              accessibilityLabel="Image preview"
            />
          ) : (
            <TouchableOpacity
              onPress={handleTakePicture}
              accessibilityLabel="Take a picture"
              className="p-4 w-100 rounded-md border-2 border-gray-200 bg-slate-50 flex-row items-center justify-between"
            >
              <Text className="text-gray-500 font-semibold">Take a picture</Text>
              <AntIcons name="camera" size={28} color="rgb(96, 165, 250)" />
            </TouchableOpacity>
          )}

          <TextInput
            multiline
            className="w-100 h-40 border-2 border-gray-200 bg-slate-50 rounded-md p-4 mt-5 font-semibold text-gray-800"
            placeholder="Add a description"
            placeholderTextColor="rgb(209 213 219)"
            onChangeText={(text) => setDescription(text)}
            onFocus={() => scrollViewRef.current?.scrollToEnd()}
          />
        </View>

        <View className="w-100 flex-row self-end gap-1 my-10">
          <TouchableOpacity
            accessibilityLabel="Cancel"
            className="w-1/2 py-3 mx-1 rounded-md border-2 border-blue-400 shrink"
          >
            <Text
              onPress={navigator.goBack}
              className="text-center text-blue-400 text-base font-bold"
            >
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`w-1/2 bg-blue-400 py-3 mx-1 rounded-md shrink ${
              saveButtonDisabled ? "opacity-75" : "opacity-100"
            }`}
            disabled={saveButtonDisabled}
            onPress={handleSave}
            testID="save-button"
          >
            <Text className="text-white text-center text-base font-bold">Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
