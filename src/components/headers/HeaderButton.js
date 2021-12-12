import React, { Component } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import font from "../../constants/font";
import Icon from 'react-native-vector-icons/FontAwesome';

const HeaderButton = ({
  icon,
  text,
  style,
  onPress
}) => {
  return (
    <TouchableOpacity style={[styles.headerButton, style]} onPress={onPress} >
      <Icon name={icon} size={20} color="#fff" />
      {!!text && <Text style={styles.text}>{text}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  headerButton: {
    paddingVertical: 20,
    width: 60,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    fontFamily: font.BOLD,
    color:"#fff",
    fontSize: 12,
    marginLeft: 5
  },
})

export { HeaderButton }