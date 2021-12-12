import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
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
import TrackPlayer from "react-native-track-player";
import {useTrackPlayerEvents} from 'react-native-track-player/lib/hooks';
import Player from "../components/sounds/Player";
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';

import { receiters  } from "../constants/receiter"
import ReceiterService from "../services/ReceiterService"
import PlayerService from "../services/PlayerService";
import UTILS from "../lib/utils"
import { ScrollView } from "react-native-gesture-handler";

const Receiter = new ReceiterService(receiters[12])
const MyPlayer = new PlayerService(Receiter)

let ayahCollection = []
let ayahLength;

const ModeHafalan = ({
  surahId,
  firstAyah,
  lastAyah,
  jumlahAyah,
  // onChangeFirstAyah,
  // onChangeLastAyah,
  onChangeRangeAyah,
  scrollToIndex
}) => {
  const playbackState = TrackPlayer.usePlaybackState()

  const [isDownloaded, setIsDownloaded] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadedFile, setDownloadedFile] = useState(0)

  const [localFirstAyah, setLocalFirstAyah] = useState(0)
  const [localLastAyah, setLocalLastAyah] = useState(0)

  useEffect(
    () => {
      initMyPlayer()
      setLocalFirstAyah(firstAyah)
      setLocalLastAyah(lastAyah)
      
    },
    [surahId, firstAyah, lastAyah, downloadedFile]
  )

  async function initMyPlayer(){
    MyPlayer.setSurah(surahId)
    MyPlayer.setAyah(firstAyah, lastAyah)

    const everDownloaded = await Receiter.checkIfFileExists(surahId, jumlahAyah)
    console.log("everDownloaded: ", everDownloaded);
    setIsDownloaded(everDownloaded)
  }

  useTrackPlayerEvents(["playback-queue-ended"], async event => {
    if(event.track == lastAyah){
      let existingQueue = await TrackPlayer.getQueue();
      if (existingQueue.length) {
        MyPlayer.rebuildTrack()
      }
    }  
    console.log("will play item: ", event.track)
    
  });
  useTrackPlayerEvents(["playback-track-changed"], async event => {
    if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      console.log("event: ", event)
      const track = await TrackPlayer.getTrack(event.nextTrack);

      if(track){
        scrollToIndex(parseInt(track.id)) 
      }      
    }
  });
  // useTrackPlayerEvents(["playback-state"], async event => {
  //   if(event.track == lastAyah){
  //     let existingQueue = await TrackPlayer.getQueue();
  //     if (existingQueue.length) {
  //       MyPlayer.rebuildTrack()
  //     }
  //   }  
  //   console.log("will play item: ", event.track)
  //   scrollToIndex(parseInt(event.track)) 
  // });

  // async function rebuildTrack(){
  //   await TrackPlayer.reset()
  //   let queue = []

  //   for(var i=1; i<=lastAyah; i++){
  //     const fileUrl = Receiter.downloadedUrl(surahId, i)
    
  //     queue.push({
  //       id: i,
  //       url: fileUrl,
  //       title: 'Abdurrahmaan As Sudais ayats ' + i,
  //       artist: 'Track Artist',
  //     })
  //   }
  //   await TrackPlayer.add(queue)
  //   await TrackPlayer.play();
  // }

  function callBackDownload(downloadedFileLength){
    console.log("downloadedFileLength: ", downloadedFileLength)
    if(downloadedFileLength === ayahLength){
      console.log("file download completed...")
      setTimeout(() => {
        console.log("will close modal")
        // setIsModalVisible(false)
        setIsDownloaded(true)
        setIsDownloading(false)
      }, 300)
      setTimeout(async ()=>{
        MyPlayer.rebuildTrack()
        setDownloadedFile(0)
      }, 1000)
    }
    setDownloadedFile(downloadedFileLength)
  }

  async function togglePlayback() {   
    if(isDownloading) return alert("Mohon tunggu sampai proses download selesai")
    const currentTrack = await TrackPlayer.getCurrentTrack();

    if(!isDownloaded){
      Alert.alert(
        "Download Audio",
        "Anda belum mendownload mp3. Download sekarang?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => {
            // setIsModalVisible(true)
            Receiter.downloadFiles(surahId, jumlahAyah, callBackDownload)
            setIsDownloading(true)
          } }
        ],
        { cancelable: false }
      );      
    }

    else if (currentTrack == null) {
      MyPlayer.rebuildTrack()
    } else {
      if (playbackState === TrackPlayer.STATE_PAUSED) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  }

  // function getStateName(state) {
  //   switch (state) {
  //     case TrackPlayer.STATE_NONE:
  //       return "None";
  //     case TrackPlayer.STATE_PLAYING:
  //       return "Playing";
  //     case TrackPlayer.STATE_PAUSED:
  //       return "Paused";
  //     case TrackPlayer.STATE_STOPPED:
  //       return "Stopped";
  //     case TrackPlayer.STATE_BUFFERING:
  //       return "Buffering";
  //   }
  // }
  
  // async function skipToNext() {
  //   try {
  //     await TrackPlayer.skipToNext();
  //   } catch (_) {}
  // }
  
  // async function skipToPrevious() {
  //   try {
  //     await TrackPlayer.skipToPrevious();
  //   } catch (_) {}
  // }

  return (
    <>
      <View style={[styles.row, styles.hafalan]}>
        <Text style={styles.orangeText}>Pilih ayat</Text>
        <TextInput style={styles.textInput} keyboardType={'numeric'} value={localFirstAyah ?  `${localFirstAyah}` : ""} onChangeText={(text)=>setLocalFirstAyah(text)} />
        <Text style={styles.orangeText}>-</Text>
        <TextInput style={styles.textInput} keyboardType={'numeric'} value={localLastAyah ?  `${localLastAyah}` : ""} onChangeText={(text)=>setLocalLastAyah(text)}  />
        <Icon name={"refresh"} size={20} color={ORANGE} onPress={() => onChangeRangeAyah(localFirstAyah, localLastAyah)} />
      </View>
      <Player
        onNext={MyPlayer.skipToNext}
        style={styles.player}
        onPrevious={MyPlayer.skipToPrevious}
        onTogglePlayback={togglePlayback}
        downloadStatus = {downloadedFile}
        jumlahAyah={jumlahAyah}
        isDownloading={isDownloading}
      />
      {/* <Modal isVisible={isModalVisible}>
        <View style={{flex: 1, width: 300, height: 300, backgroundColor: "#fff"}}>
          <Text>Downloading {downloadedFile} of {jumlahAyah} !</Text>
        </View>
      </Modal> */}
      {/* <Text style={styles.state}>{getStateName(playbackState)}</Text> */}
    </>
  )
}

const AyahItemComp = ({ navigation, data, onLayoutFinish, index, playingAyah  }) => {
  //const onPress = () => navigation.navigate("ReadSurah")

  return (
    <TouchableOpacity onLayout={(e) => onLayoutFinish(e, index)} style={styles.row}>
      <View style={{alignItems: 'center'}}>
        <ImageBackground source={NOMOR_BACKGROUND} style={styles.background}>
          <Text style={styles.surahTitle}>{data.aya_number}</Text>
        </ImageBackground>
        {
          playingAyah===index+1 &&
          <Icon name="volume-up" size={30} color={STRONG_GREEN} />
        }
      </View>

      <View style={{flex: 1, paddingLeft: 10, justifyContent: 'center'}}>
        <Text style={styles.ayah}>{data.aya_text}</Text>
        <Text style={styles.terjemah}>{data.translation_aya_text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const AyahItem = React.memo(AyahItemComp)

class ReadSurah extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surahName: '',
      artiSurah: '',
      jumlahAyah: 0,

      firstAyah : 0,
      lastAyah : 0,
      listAyah : [],
      playingAyah: 0,

      choosenReceiterId: 0,

      isModalVisible: false
    };

    this.componentHeight = []
    this.list = React.createRef();
    this.respondRangeAyahChange = _.debounce(this.onRespondRangeAyatChange, 2000);
  }

  async componentDidMount(){
    const { route } = this.props 
    const { surahId, surahName, artiSurah, jumlahAyah } = route.params

   
    ayahCollection = AyahController.findBySurahId(surahId)
    ayahLength = ayahCollection.length
    this.componentHeight = new Array(ayahLength + 1)
    this.componentHeight[0] = 0

    this.setState({
      surahId,
      surahName,
      artiSurah,
      jumlahAyah,

      listAyah: ayahCollection,
      firstAyah: 1,
      lastAyah: ayahLength
    })

    const receiterId = await AsyncStorage.getItem("@receiterId")
    if(receiterId)
      this.chooseReceiter(receiterId)
    else 
      this.chooseReceiter(13)
  }

  onRespondRangeAyatChange = () => {
    const { firstAyah, lastAyah } = this.state 

    if(lastAyah && lastAyah < firstAyah) 
      alert("Opsi ayat pertama dan ayat terakhir tidak valid")
  
    else if(lastAyah > ayahLength)
      alert("Opsi ayat terakhir harus tidak lebih dari ", ayahLength)

    else this.reRenderAyahList()
  }

  reRenderAyahList = () => {
    const { firstAyah, lastAyah } = this.state 

    const newAyahList = lastAyah > 0
      ? ayahCollection.filter(ayah => ayah.aya_number >= firstAyah && ayah.aya_number <= lastAyah)
      : ayahCollection.filter(ayah => ayah.aya_number >= firstAyah )

    this.setState({ listAyah : newAyahList })
  }

  // onChangeFirstAyah = (text) => {
  //   const newFirstAyah = parseInt(text)

  //   this.setState({
  //     firstAyah: newFirstAyah,
  //     lastAyah: 0
  //   }, this.respondRangeAyahChange)
  // }

  // onChangeLastAyah = (text) => {
  //   const newLastAyah = parseInt(text)
    
  //   this.setState({
  //     lastAyah: newLastAyah
  //   }, this.respondRangeAyahChange)
  // }

  onChangeRangeAyah = (firstAyah, lastAyah) => {
    console.log("firstAyah: ", firstAyah)
    console.log("lastAyah: ", lastAyah)
    const { jumlahAyah } = this.state 

    let newFirstAyah = firstAyah ? parseInt(firstAyah) : 1
    let newLastAyah = lastAyah ? parseInt(lastAyah) : jumlahAyah

    console.log("willSet first ayah to: ", newFirstAyah)
    console.log("willSet last ayah to: ", newLastAyah)

    if(isNaN(newFirstAyah) || isNaN(newLastAyah)){
      alert("ayat pertama atau terakhir harus berupa angka")
    }
    else if(newLastAyah < newFirstAyah){
      alert("Ayat terakhir harus lebih besar daripada ayat pertama")
    }
    else {
      
      this.setState({
        firstAyah: newFirstAyah,
        lastAyah: newLastAyah
      }, this.respondRangeAyahChange)

      //check if there's playing record, rebuild
      if(TrackPlayer.STATE_PLAYING){
        MyPlayer.setAyah(newFirstAyah, newLastAyah)
        MyPlayer.rebuildTrack()
      }
    }
  }

  onBack = async () => {
    await MyPlayer.destroy()
    this.props.navigation.navigate("SurahScreen")
  }

  onLayout = (e, index) => {
    this.componentHeight[index + 1] = e.nativeEvent.layout.height
    // console.log("height of : ", index + 1, " element is: ", e.nativeEvent)
  }

  scrollToIndex = (index) => {
    const { firstAyah } = this.state
    let acc = 0;
    for(var i=firstAyah; i<index; i++){
      acc+=this.componentHeight[i]
    }
    console.log("list will scrolled to : ", acc)
    this.setState({ playingAyah: index })
    this.list.current.scrollToOffset({ offset: acc, animated: true})
  }

  closeModal = () => this.setState({isModalVisible: false})

  showReceiterList = () => {
    console.log("will show receiter list...")
    this.setState({ isModalVisible: true })
  }

  chooseReceiter = (receiterId) => {
    this.setState({ choosenReceiterId: receiterId })
    AsyncStorage.setItem("@receiterId", receiterId.toString())

    const receiter = receiters.find(r => r.id == receiterId)
    Receiter.setReceiter(receiter)

    this.closeModal()

    //check if file with new receiter already exists.. otherwise try to donwload it... 
    //MyPlayer.checkIfFileExists()
    //MyPlayer.rebuildTrack()
  }

  render() {
    const { navigation } = this.props
    const { 
      surahId,
      surahName,
      artiSurah,
      jumlahAyah,

      firstAyah,
      lastAyah,
      listAyah,
      playingAyah,

      choosenReceiterId,

      isModalVisible
    } = this.state 

    return (
      <View style={styles.container}>
        <SurahHeader 
          surahId={surahId}
          surahName={surahName}
          artiSurah={artiSurah}
          jumlahAyah={jumlahAyah}
          onBack = {this.onBack}
          onRight = { this.showReceiterList }
          Receiter={Receiter}
        />
        <ModeHafalan 
          surahId={surahId}
          firstAyah={firstAyah} 
          lastAyah={lastAyah} 
          jumlahAyah={jumlahAyah}
          // onChangeFirstAyah={this.onChangeFirstAyah} 
          // onChangeLastAyah={this.onChangeLastAyah} 
          onChangeRangeAyah={this.onChangeRangeAyah}
          scrollToIndex={this.scrollToIndex}
        />
        <FlatList
          ref={this.list}
          style={styles.list}
          data={listAyah}
          initialNumToRender={10}
          keyExtractor={(item) => `ayah-${item.aya_id}`}
          renderItem={ ({item, index}) => <AyahItem playingAyah={playingAyah} onLayoutFinish={this.onLayout} index={firstAyah + index - 1} data={item} navigation={navigation} /> }
        />
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalContainer}>
            <Icon name="close" size={20} onPress={this.closeModal} style={styles.closeIcon} />
            <ScrollView>
            {
              receiters.map(r => {
                return (
                  <TouchableOpacity key={r.id} style={styles.receiterListItem} onPress={()=>this.chooseReceiter(r.id)}>
                    <Icon name={choosenReceiterId == r.id ? "circle" : "circle-o"} size={20}  />
                    <Text style={styles.receiterName}>{UTILS.receiterName(r.name)}</Text>
                  </TouchableOpacity>
                )
              })
            }
            </ScrollView>
          </View>
        </Modal>
      </View>
    )
  }
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
    lineHeight: 50,
    marginBottom: 15,
    letterSpacing: 2
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
    marginBottom: 10,
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
    
  },
  modalContainer: {
    flex: 1, 
    width: 300, 
    height: 300, 
    backgroundColor: "#fff",
    padding: 20,
    paddingVertical: 0,
    paddingRight: 0
  },
  receiterListItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 15
  },
  receiterName: {
    fontFamily: font.REGULAR,
    fontSize: 14,
    marginLeft: 10
  },
  closeIcon: {
    padding: 20,
    alignSelf: 'flex-end'
  }
})


export default ReadSurah;