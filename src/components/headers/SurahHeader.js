import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { STRONG_GREEN, ORANGE } from "../../constants/color";
import { HeaderButton } from "./HeaderButton"

import font from "../../constants/font";


const SurahHeader = ({
  surahId,
  surahName,
  artiSurah,
  jumlahAyah,
  onBack,
  onRight
  // Receiter
}) => {
  // function donwloadReciter(){
  //   Receiter.downloadFiles(surahId, jumlahAyah)
  // }
  return (
    <View style={styles.container}>
      <HeaderButton icon={"angle-left"} text={"Back"} style={{paddingLeft: 10}} onPress={onBack} />
      <View style={styles.headerTitle}>
        <Text style={styles.surahTitle}>{surahId}. {surahName}</Text>
        <Text style={styles.surahDescription}>{artiSurah} | {jumlahAyah} Ayat</Text>
      </View>
      <HeaderButton icon={"file-sound-o"} style={{ paddingRight: 10, justifyContent: "flex-end"}} onPress={onRight} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: STRONG_GREEN,
  },
  
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  surahTitle: {
    fontFamily: font.BOLD,
    fontSize: 13,
    color: "#fff"
  },
  surahDescription: {
    color: ORANGE,
    fontSize: 12,
    fontFamily: font.REGULAR
  }
})

export { SurahHeader }