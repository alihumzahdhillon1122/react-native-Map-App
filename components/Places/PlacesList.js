import { FlatList, View, Text } from "react-native";
import Placesitem from "./PlaceItem";

function PlacesList({ places }) {
  if (!places || places.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-base text-black">
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
