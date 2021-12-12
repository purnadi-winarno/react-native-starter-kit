import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  TextInput
} from "react-native";
import { SurahHeader } from "../components/headers/SurahHeader"
import font from "../constants/font";
import { NOMOR_BACKGROUND } from "../constants/rosource"
import { STRONG_GREEN, WEAK_GREEN, ORANGE } from "../constants/color";
import AyahController from "../controller/AyahController"
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from "lodash"

let ayahCollection = []
let ayahLength;

const ModeHafalan = ({
  firstAyah,
  lastAyah,
  onChangeFirstAyah,
  onChangeLastAyah
}) => {
  console.log("firstAyah: ", firstAyah)
  console.log("lastAyah: ", lastAyah)
  return (
    <View style={[styles.row, styles.hafalan]}>
      <Text style={styles.orangeText}>Pilih ayat</Text>
      <TextInput style={styles.textInput} value={firstAyah} onChangeText={onChangeFirstAyah} />
      <Text style={styles.orangeText}>-</Text>
      <TextInput style={styles.textInput} value={lastAyah} onChangeText={onChangeLastAyah}  />
      <Icon name={"refresh"} size={20} color={ORANGE} />
    </View>
  )
}

const AyahItem = ({ navigation, data  }) => {
  //const onPress = () => navigation.navigate("ReadSurah")
  
  return (
    <TouchableOpacity style={styles.row}>
      <ImageBackground source={NOMOR_BACKGROUND} style={styles.background}>
        <Text style={styles.surahTitle}>{data.aya_number}</Text>
      </ImageBackground>

      <View style={{flex: 1, paddingLeft: 10, justifyContent: 'center'}}>
        <Text style={styles.ayah}>{data.aya_text}</Text>
        <Text style={styles.terjemah}>{data.translation_aya_text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const ReadSurah = ({
  navigation,
  route
}) => {
  const { surah } = route.params
  const surahId = surah.id 
  const surahName = surah.surat_name 
  const artiSurah = surah.surat_terjemahan 
  const jumlahAyah = surah.count_ayat 
  

  const [listAyah, setListAyah] = useState([])
  const [firstAyah, setFirstAyah] = useState(0)
  const [lastAyah, setLastAyah] = useState(0)
  

  console.log("read surah rerendered")

  function onRespondRangeAyatChange(){
    if(lastAyah && lastAyah < firstAyah) 
      alert("Opsi ayat pertama dan ayat terakhir tidak valid")
  
    else if(lastAyah > ayahLength)
      alert("Opsi ayat terakhir harus tidak lebih dari ", ayahLength)

    reRenderAyahList()
  }

  const respondRangeAyahChange = _.debounce(onRespondRangeAyatChange, 5000)

  useEffect(
    () => {
      ayahCollection = AyahController.findBySurahId(surahId)
      ayahLength = ayahCollection.length
     
      setListAyah(ayahCollection),
      setFirstAyah(1),
      setLastAyah(ayahLength)
      
    },
    [surahId]
  )  

  // useEffect(
  //   () => respondRangeAyahChange,
  //   [firstAyah, lastAyah]
  // )

  onBack = () => navigation.goBack()

  reRenderAyahList = () => {
    console.log("rerender list, firstAyah: ", firstAyah)
    console.log("rerender list, lastAyah: ", lastAyah)
    // console.log("rerender list, ayahCollection: ", ayahCllection)
    const newAyahList = lastAyah > 0
      ? ayahCollection.filter(ayah => ayah.aya_number >= firstAyah && ayah.aya_number <= lastAyah)
      : ayahCollection.filter(ayah => ayah.aya_number >= firstAyah )

    setListAyah(newAyahList)
  }

  onChangeFirstAyah = (text) => {
    const newFirstAyah = parseInt(text)

    if(newFirstAyah > lastAyah) 
    {
      setLastAyah(0)      
    }  

    setFirstAyah(newFirstAyah)
    respondRangeAyahChange()
    // _.debounce(function(){
    //   onRespondRangeAyatChange(newFirstAyah, lastAyah)
    // }, 1000)
  }

  onChangeLastAyah = (text) => {
    const newLastAyah = parseInt(text)
    setLastAyah(newLastAyah)

    respondRangeAyahChange()
    // _.debounce(function(){
    //   onRespondRangeAyatChange(firstAyah, newLastAyah)
    // }, 1000)
  }

  

  

  

  return (
    <View style={styles.container}>
      <SurahHeader 
        surahId={surahId}
        surahName={surahName}
        artiSurah={artiSurah}
        jumlahAyah={jumlahAyah}
        onBack = {onBack}
        
      />
      <ModeHafalan 
        firstAyah={firstAyah} 
        lastAyah={lastAyah} 
        onChangeFirstAyah={onChangeFirstAyah} 
        onChangeLastAyah={onChangeLastAyah} 
      />
      <FlatList
        style={styles.list}
        data={listAyah}
        initialNumToRender={10}
        keyExtractor={(item) => `ayah-${item.aya_id}`}
        renderItem={ ({item}) => <AyahItem data={item} navigation={navigation} /> }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: WEAK_GREEN
  },
  ayah: {
    fontSize: 20,
    fontFamily: font.ARABIC_REGULAR,
    marginBottom: 10,
    letterSpacing: 1
  },
  list: {
    padding: 10
  },
  terjemah: {
    fontFamily: font.LIGHT,
    fontSize: 14,
    color: STRONG_GREEN,
    marginBottom: 10
  },
  background: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    justifyContent: "center",
    justifyContent: 'center',
    alignItems: 'center'
  },
  orangeText: {
    color: ORANGE,
    fontFamily: font.REGULAR,
    fontSize: 10
  },
  hafalan: {
    backgroundColor: STRONG_GREEN,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textInput: {
    width: 90,
    height: 30,
    paddingVertical: 0,
    fontSize: 12,
    backgroundColor: "rgba(255, 255, 255, .53)",
    borderRadius: 10,
    textAlign: 'center',
    color: "#fff"
    
  }
})

export default ReadSurah 