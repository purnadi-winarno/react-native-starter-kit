import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const TransparentButton = ({
  text,
  page,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress(page)}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.89)",
    borderColor: "#2B580C",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: 'center'
  },
  text: {
    color: "#2B580C",
    fontFamily: "Montserrat-Bold"
  }
})

export { TransparentButton }