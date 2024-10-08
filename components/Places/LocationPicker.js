import React, { useState } from "react";

import { View, StyleSheet, Alert, Image, Text } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import OutLinedButton from "../UI/OutLinedButton";
import { Colors } from "../../constants/colors";
import { getMapPreview } from "../../utill/location";
import { useNavigation } from "@react-navigation/native";

function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState();

  const navigation = useNavigation();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to grant location permission to use this app."
      );
      return false;
    }
    return true;
  }
  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    console.log(pickedLocation.lat, pickedLocation.lng);
  }
  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No Location Picked yet</Text>;
  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.mapPreviewImage}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.action}>
        <OutLinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutLinedButton>
        <OutLinedButton icon="map" onPress={pickOnMapHandler}>
          Pick On Map
        </OutLinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mapPreviewImage: {
    width: "100%",
    height: "100%",
  },
});
