import React, { useState, useLayoutEffect, useCallback } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Alert } from "react-native";
import IconButton from "../components/UI/IconButton";

function Map({ navigation }) {
  const [selectLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 30.82609,
    longitude: 73.47224,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    console.log(event);
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectLocation) {
      Alert.alert(
        "No location picked!",
        "YOu have to pick a location (by tapping on the map) first"
      );
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLat: selectLocation.lat,
      pickedLng: selectLocation.lng,
    });
  }, [navigation, selectLocation]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      initialRegion={region}
      style={styles.map}
      onPress={selectLocationHandler}
      showsUserLocation={true}
    >
      {selectLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectLocation.lat,
            longitude: selectLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
