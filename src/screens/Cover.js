import React, { useEffect } from "react";
import Realm from "realm"
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { TransparentButton } from "../components/buttons/TransparentButton"
import { BACKGROUND_IMG } from "../constants/rosource"
import { COVER_MENU } from "../constants/menu"

if(Realm.exists({path: Realm.defaultPath})){
  console.log("realm already exists")
}
else {
  console.log("will generate new realm files...")
  Realm.copyBundledRealmFiles();
}

const Cover = ({
  navigation
}) => {
  const onPress = (page) => navigation.navigate(page)

  useEffect(
    () => {},
    []
  )

  return (
    <View style={styles.container}>
      <ImageBackground source={BACKGROUND_IMG} style={styles.background}>
        {
          COVER_MENU.map(menu => (
            <TransparentButton 
              key={menu.label} 
              text={menu.label} 
              page={menu.page} 
              onPress={onPress} 
            />
          ))
        }
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Cover 