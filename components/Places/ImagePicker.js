import { Button, View, Alert, Image, Text } from "react-native";
import { useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import OutLinedButton from "../UI/OutLinedButton";

function ImagePicker() {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermission() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to grant camera permission to use this app."
      );
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!image.canceled && image.assets.length > 0) {
      setPickedImage(image.assets[0].uri);
      console.log(image.assets); // Log the new URI
    }
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = (
      <Image
        className="w-full h-full"
        height={100}
        width={100}
        source={{ uri: pickedImage }}
      />
    );
  }

  return (
    <View>
      <View className="w-full h-52 justify-center items-center bg-blue-100 rounded-md">
        {imagePreview}
      </View>
      {/* <Button title="Take Image" onPress={takeImageHandler} /> */}
      <OutLinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutLinedButton>
    </View>
  );
}

export default ImagePicker;
