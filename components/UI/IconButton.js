import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      className={`p-2 m-1 justify-center items-center`}
      onPress={onPress}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  //   button: {
  //     padding: 8,
  //     margin: 4,
  //     justifyContent: "center",
  //     alignItems: "center",
  //   },
  pressed: {
    opacity: 0.75,
  },
});
