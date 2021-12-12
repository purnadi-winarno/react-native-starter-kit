import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

const Row = ({
  children,
  style
}) => {
  return (
    <View style={styles.container}>
     {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
})

export { Row }