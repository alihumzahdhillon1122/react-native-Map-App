import { View, Text, ScrollView, TextInput } from "react-native";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState("");

  function changeTitleHandler(enteredTitle) {
    setEnteredTitle(enteredTitle);
  }
  return (
    <ScrollView className="flex-1 p-6 mb-1 ">
      <View>
        <Text style={{ color: Colors.primary500 }} className="font-bold">
          Title
        </Text>
        <TextInput
          className="my-2 px-1 py-2 border-b-2 border-blue-500  bg-blue-200"
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  );
}

export default PlaceForm;
