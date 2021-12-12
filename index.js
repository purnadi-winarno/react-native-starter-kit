/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';


import { BackAndroid, Alert } from "react-native"
import { setJSExceptionHandler, setNativeExceptionHandler } from "react-native-exception-handler";
import email from 'react-native-email'

console.log("error catcher initalized...................")
const reporter = error => {
  const to = 'errorReporter@yopmail.com' // string or array of email addresses
  email(to, {
      // Optional additional arguments
     
      subject: 'Error Reporter',
      body: error.toString()
  }).catch(console.error)
};
 
const errorHandler = (e, isFatal) => {
  if (isFatal) {
    reporter(e);
    Alert.alert(
      "Unexpected error occurred",
      `
        Error: ${isFatal ? "Fatal:" : ""} ${e.name} ${e.message}
 
        We have reported this to our team ! Please close the app and start again!
        `,
      [
        {
          text: "Close",
          onPress: () => {
            BackAndroid.exitApp();
          }
        }
      ]
    );
  } else {
    console.log(e); // So that we can see it in the ADB logs in case of Android if needed
  }
};
 
setJSExceptionHandler(errorHandler);
 
setNativeExceptionHandler(errorString => {
  reporter(errorString)
});

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./src/services/TrackPlayerServices'));
