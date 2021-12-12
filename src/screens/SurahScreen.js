import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { SurahListHeader } from "../components/headers/SurahListHeader"
import { STRONG_GREEN, WEAK_GREEN, ORANGE } from "../constants/color";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { NOMOR_BACKGROUND } from "../constants/rosource"
import SurahController from "../controller/SurahController"
import font from "../constants/font";

let surahList = SurahController.findAll();

const TabMenu = ({ activeTab }) => {
  const menu = ["SURAH", "JUZ", "BOOKMARK"]
  return (
    <View style={styles.tab}>
      {
        menu.map( (m, index) => (
          <View key={m} style={[styles.tabmenu, activeTab === index && styles.activeBg]}>
            <Text style={[styles.tabText, activeTab === index && styles.activeText]}>{m}</Text>
          </View>
        ))
      }
    </View>
  )
}

const SurahItem = ({ data, navigation }) => {
  const onPress = () => navigation.navigate("ReadSurah", {
    surahId: data.id,
    surahName: data.surat_name,
    artiSurah: data.surat_terjemahan,
    jumlahAyah: data.count_ayat
  })

  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <ImageBackground source={NOMOR_BACKGROUND} style={styles.background}>
        <Text style={styles.surahTitle}>{data.id}</Text>
      </ImageBackground>

      <View style={{flex: 1, paddingLeft: 10, justifyContent: 'center'}}>
        <Text style={styles.surahTitle}>{data.surat_name}</Text>
        <Text style={styles.surahDescription}>{data.surat_terjemahan} | {data.count_ayat} Ayat</Text>
      </View>
    </TouchableOpacity>
  )
}

const SurahScreen = ({
  navigation
}) => {
  const onBack = () => navigation.goBack()
  const [ shownSurahList, setShownSurahList ] = useState(surahList)

  function onSearchSurah(text){
    if(!text) {
      return setShownSurahList(surahList)
    } 

    const shownSurah = surahList.filter(s => s?.surat_name?.toLowerCase()?.replace("-","").includes(text.toLowerCase().replace(/-|\s/g, "")))
    console.log("shownSurah: ", shownSurah)
    setShownSurahList(shownSurah)
  }

  return (
    <View style={styles.container}>
      <SurahListHeader onBack={onBack} onSearchSurah={onSearchSurah} />
      <TabMenu activeTab={0} />
      <FlatList
        style={styles.list}
        data={shownSurahList}
        showsVerticalScrollIndicator={false}
        // initialNumToRender={114}
        keyExtractor={(item) => `surat-${item.id}`}
        renderItem={ ({item}) => <SurahItem data={item} navigation={navigation} /> }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: WEAK_GREEN,
    
  },
  tab: {
    backgroundColor: STRONG_GREEN,
    alignItems: "center",
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  tabmenu: {
    flex: 1,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    width: 100,
    
    justifyContent: 'center'
  },
  
  tabText: {
    textAlign: "center",
    color: "#fff",
  },
  activeBg: {
    backgroundColor: WEAK_GREEN
  },
  activeText: {
    color: STRONG_GREEN
  },
  list: {
    paddingHorizontal: 10
  },
  background: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    justifyContent: "center",
    justifyContent: 'center',
    alignItems: 'center'
  },
  surahTitle: {
    fontFamily: font.BOLD,
    fontSize: 12,
    color: STRONG_GREEN
  },
  surahDescription: {
    color: ORANGE,
    fontSize: 12,
    fontFamily: font.REGULAR
  }
})

export default SurahScreen 