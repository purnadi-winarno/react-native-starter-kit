import React, { useEffect } from "react";
import KeepAwake from 'react-native-keep-awake';

const KeepAwakeService = () => {
  useEffect(
    () => {
      console.log("keep awake service activated...")
      KeepAwake.activate();
    },
    []
  )
  return null
}

export { KeepAwakeService }