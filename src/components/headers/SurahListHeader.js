import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native";
import { STRONG_GREEN } from "../../constants/color";
import { HeaderButton } from "./HeaderButton"
import font from "../../constants/font";
import _ from "lodash"

class SurahListHeader extends Component {
  constructor(props) {
    super(props)

    this.state = {
      surahName: ''
    }
    this.onChangeText = this.onChangeText.bind(this)
    this.onSearchSurah = _.debounce(this.onSearchSurahHandler, 1000);
  }

  onSearchSurahHandler(){
    if(this.props.onSearchSurah)
      this.props.onSearchSurah(this.state.surahName)
  }

  onChangeText(text){
    this.setState({ surahName: text }, this.onSearchSurah )
  }

  render(){
    const { onBack } = this.props
    return (
      <View style={styles.container}>
        <HeaderButton icon={"angle-left"} text={"Back"} style={{paddingLeft: 10}} onPress={onBack} />
        <TextInput style={styles.textInput} value={this.state.surahName} placeholder={"Cari nama surah"} onChangeText={this.onChangeText} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: STRONG_GREEN,
  },
  backButton: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    fontFamily: font.BOLD,
    color:"#fff",
    fontSize: 16,
    marginLeft: 10
  },
  textInput: {
    flex: 1,
    backgroundColor:"rgba(255, 255, 255, .83)",
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingTop: 8
  }
})

export { SurahListHeader }