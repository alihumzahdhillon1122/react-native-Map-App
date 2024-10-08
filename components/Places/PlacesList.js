import { FlatList, View, Text } from "react-native";
import Placesitem from "./PlaceItem";
import { Colors } from "../../constants/colors";

function PlacesList({ places }) {
  if (!places || places.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text style={{ color: Colors.primary200 }} className="text-base">
          No Place added yet - start adding Some!
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      keyextractor={(item) => item.id}
      renderItem={({ item }) => <Placesitem place={item} />}
    />
  );
}

export default PlacesList;
