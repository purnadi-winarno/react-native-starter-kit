import React, { useState } from "react";
import PropTypes from "prop-types";
import TrackPlayer from "react-native-track-player";
import {useTrackPlayerEvents} from 'react-native-track-player/lib/hooks';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

function ProgressBar() {
  const progress = TrackPlayer.useTrackPlayerProgress();

  return (
    <View style={styles.progress}>
      <View style={{ flex: progress.position, backgroundColor: "red" }} />
      <View
        style={{
          flex: progress.duration - progress.position,
          backgroundColor: "grey"
        }}
      />
    </View>
  );
}

function ControlButton({ icon, onPress }) {
  return (
    <TouchableOpacity style={styles.controlButtonContainer} onPress={onPress}>
      <Icon name={icon} size={20} color="#000" />
    </TouchableOpacity>
  );
}

ControlButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default function Player(props) {
  const playbackState = TrackPlayer.usePlaybackState();
  const [trackTitle, setTrackTitle] = useState("");
  useTrackPlayerEvents(["playback-track-changed"], async event => {
    if (event.type === TrackPlayer.TrackPlayerEvents.PLAYBACK_TRACK_CHANGED) {
      const track = await TrackPlayer.getTrack(event.nextTrack);

      if(track){
        setTrackTitle(track.title);
      }
    }
  });

  const { style, onNext, onPrevious, onTogglePlayback, downloadStatus, isDownloading, jumlahAyah } = props;

  var middleButtonIcon = "play-circle";

  if (
    playbackState === TrackPlayer.STATE_PLAYING ||
    playbackState === TrackPlayer.STATE_BUFFERING
  ) {
    middleButtonIcon = "pause-circle";
  }

  return (
    <View style={[styles.card, style]}>
      {/* <Image style={styles.cover} source={{ uri: trackArtwork }} /> */}
      <ProgressBar />
      <Text style={styles.title}>{
        trackTitle 
          ? trackTitle 
        : downloadStatus 
            ? `Harap menunggu.. telah mendownload ${downloadStatus} dari ${jumlahAyah} ayat..` 
            : isDownloading
              ? "Mulai mendownload..."
              : ""
        }</Text>
      <View style={styles.controls}>
        <ControlButton icon={"backward"} onPress={onPrevious} />
        <ControlButton icon={middleButtonIcon} onPress={onTogglePlayback} />
        <ControlButton icon={"forward"} onPress={onNext} />
      </View>
    </View>
  );
}

Player.propTypes = {
  style: ViewPropTypes.style,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  onTogglePlayback: PropTypes.func.isRequired
};

Player.defaultProps = {
  style: {}
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    elevation: 1,
    borderRadius: 4,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    alignItems: "center",
    shadowColor: "black",
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 1 }
  },
  cover: {
    width: 140,
    height: 140,
    marginTop: 20,
    backgroundColor: "grey"
  },
  progress: {
    height: 1,
    width: "90%",
    marginTop: 10,
    flexDirection: "row"
  },
  title: {
    marginTop: 10
  },
  artist: {
    fontWeight: "bold"
  },
  controls: {
    marginVertical: 20,
    flexDirection: "row",
   
  },
  controlButtonContainer: {
    flex: 1,
    alignItems: 'center'
  },
  controlButtonText: {
    fontSize: 18,
    textAlign: "center"
  }
});