import Realm from "realm"
// import RNFS from 'react-native-fs'
import SurahModel from "./models/SurahModel"
import AyahModel from "./models/AyahModel"
import TerjemahModel from "./models/TerjemahModel"


const RealmInstance = new Realm({
  schema: [SurahModel, AyahModel, TerjemahModel],
  // path: RNFS.MainBundlePath + '/default.realm',
  schemaVersion: 1
});
console.log("Realm path: ", RealmInstance.path);



export default RealmInstance
