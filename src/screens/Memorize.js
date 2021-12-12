import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

const Memorize = ({
  
}) => {
  return (
    <View style={styles.container}>
      <Text>Memorize Component</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default Memorize 