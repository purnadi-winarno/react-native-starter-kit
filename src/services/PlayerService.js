
import TrackPlayer from "react-native-track-player";


class PlayerService {
  constructor(Receiter, surahId, firstAyah, lastAyah){
    this.surahId = surahId
    this.firstAyah = firstAyah
    this.lastAyah = lastAyah
    this.Receiter = Receiter

    TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE
      ]
    });
  }

  setReceiter(Receiter){
    console.log("Execute Function - setReceiter") 
    this.Receiter = Receiter
  }

  setSurah(surahId){
    this.surahId = surahId
  }

  setAyah(firstAyah, lastAyah){
    console.log("Execute Function - setAyah") 
    this.firstAyah = firstAyah 
    this.lastAyah = lastAyah
  }

  async skipToPrevious() {
    console.log("Execute Function - skipToPrevious") 
    try {
      await TrackPlayer.skipToPrevious();
    } catch (_) {}
  }

  async skipToNext() {
    console.log("Execute Function - skipToNext") 
    try {
      await TrackPlayer.skipToNext();
    } catch (_) {}
  }

  getStateName(state) {
    console.log("Execute Function - getStateName") 
    switch (state) {
      case TrackPlayer.STATE_NONE:
        return "None";
      case TrackPlayer.STATE_PLAYING:
        return "Playing";
      case TrackPlayer.STATE_PAUSED:
        return "Paused";
      case TrackPlayer.STATE_STOPPED:
        return "Stopped";
      case TrackPlayer.STATE_BUFFERING:
        return "Buffering";
    }
  }

  

  async rebuildTrack(){
    console.log("Execute Function - rebuildTrack")
    await TrackPlayer.reset()
    let queue = []

    for(var i=this.firstAyah; i<=this.lastAyah; i++){
      const fileUrl = this.Receiter.downloadedUrl(this.surahId, i)

      queue.push({
        id: i,
        url: fileUrl,
        title: this.Receiter.getReceiterName() + ' ayat ' + i,
        artist: 'Track Artist',
      })
    }

    console.log("queue: ", queue)
    await TrackPlayer.add(queue)
    await TrackPlayer.play();
  }

  checkIfFileExists(){
    return this.Receiter.checkIfFileExists(this.surahId, this.lastAyah)
  }

  async destroy(){
    await TrackPlayer.reset()
  }
}

export default PlayerService