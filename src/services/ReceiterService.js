import RNFS, { mkdir } from "react-native-fs"
import util from "../lib/utils"
import { API } from "../constants/receiter"

class ReceiterService {
  constructor(receiter){
    this.setReceiter(receiter)
  }

  downloadUrl(surahId, ayahId){
    return this.remoteDirectory + "/" + this.getSurahName(surahId, ayahId)
  }

  downloadedUrl(surahId, ayahId){
    return this.localDirectory + "/" + this.getSurahName(surahId, ayahId)
  }

  async setReceiter(receiter){
    console.log("will set receiter with: ", receiter)
    this.receiter = receiter
    this.remoteDirectory = `${API}/${receiter.link}`
    this.localDirectory = RNFS.DocumentDirectoryPath + "/files/alquranku/" + receiter.name

    // console.log("this.remoteDirectory: ", this.remoteDirectory)
    // console.log("this.localDirectory: ", this.localDirectory)

    const isLocalDirectoryExists = await RNFS.exists(this.localDirectory)
    // console.log("isLocalDirectoryExists: ", isLocalDirectoryExists)

    if(!isLocalDirectoryExists)
      mkdir(this.localDirectory)
  }

  getReceiterName(){
    return util.receiterName(this.receiter.name)
  }

  getSurahName(surahId, ayahId){
    return util.threeDigitString(surahId) + util.threeDigitString(ayahId) + ".mp3"
  }

  checkIfFileExists(surahId, ayahId){
    console.log("will check : ", this.downloadedUrl(surahId, ayahId))
    return RNFS.exists(this.downloadedUrl(surahId, ayahId))
  }

  async downloadFiles(surahId, lengthAyah, callBackDownload){
    //  console.log("will download ", lengthAyah, " ayah")
     const job = {}
     const downloadUrl = this.downloadUrl.bind(this)
     const downloadedUrl = this.downloadedUrl.bind(this)

     let downloadedFile = 0

     for(var i=1; i<=lengthAyah; i++){
      const isFileExists = await this.checkIfFileExists(surahId, i)

      if(!isFileExists){        
        console.log("will download surah: ", surahId, ", ayah: ", i)
        
        try{
          const { jobId, promise } = RNFS.downloadFile({
            fromUrl: this.downloadUrl(surahId, i),
            toFile: this.downloadedUrl(surahId, i),
            connectionTimeout: 50000
          })

          job[jobId] = i

           promise
          .then(res => {
            // console.log("res: ", res)
            // console.log("download surah: ", surahId, ", ayah: ", job[jobId] ," with jobId: ", jobId, " success")
            downloadedFile++
            console.log("downloaded ", downloadedFile, " of ", lengthAyah)
            if(callBackDownload)
              callBackDownload(downloadedFile)
          })
          .catch(async e => {
            // console.log("will trying download for surah: ", surahId, " and ayah: ", job[jobId], " and jobId: ", jobId)
  
            let isSuccess = false
            let attemp = 1 
  
            function redownload(){
              console.log("will redownload ayah : ", job[jobId])
              return RNFS.downloadFile({
                fromUrl: downloadUrl(surahId, job[jobId]),
                toFile: downloadedUrl(surahId, job[jobId]),
                connectionTimeout: 50000
              }).promise
            }
  
            while(!isSuccess && attemp < 3){
              const success = await redownload()

              console.log("redonwload success: ", success)
              if(success?.statusCode === 200){
                isSuccess = true
                downloadedFile++
                console.log("from redownload, downloaded ", downloadedFile, " of ", lengthAyah)
                if(callBackDownload)
                  callBackDownload(downloadedFile)
              }
              attemp++
            }      
          })

          await sleep(300)
        }
        catch(e){
          console.log("error download: ", e)

          // let isSuccess = false
          // let attemp = 1 

          // function redownload(){
          //   console.log("will redownload ayah : ", i)
          //   return RNFS.downloadFile({
          //     fromUrl: this.downloadUrl(surahId, i),
          //     toFile: this.downloadedUrl(surahId, i),
          //     connectionTimeout: 50000
          //   })
          // }

          // while(!isSuccess && attemp < 3){
          //   const success = await redownload()
          //   console.log("redonwload success: ", success)
          //   if(success){
          //     isSuccess = true
          //   }
          //   attemp++
          // }      
        }
        // await RNFS.downloadFile({
        //   fromUrl: this.downloadUrl(surahId, i),
        //   toFile: this.downloadedUrl(surahId, i),
        //   connectionTimeout: 50000
        // })
        // .promise
        // .catch(async err => {
        //   let isSuccess = false
        //   let attemp = 1 

        //   function redownload(){
        //     console.log("will redownload ayah : ", i)
        //     return RNFS.downloadFile({
        //       fromUrl: this.downloadUrl(surahId, i),
        //       toFile: this.downloadedUrl(surahId, i),
        //       connectionTimeout: 50000
        //     })
        //   }

        //   while(!isSuccess && attemp < 3){
        //     const success = await redownload()
        //     console.log("redonwload success: ", success)
        //     if(success){
        //       isSuccess = true
        //     }
        //     attemp++
        //   }          
        // })
        // await sleep(300)
      }
      else{
        console.log("file for surat: ", surahId, ", ayat : ", i, " already exists")
        downloadedFile++
        if(callBackDownload)
          callBackDownload(downloadedFile)
      }      
    }
  }  

}

async function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

export default ReceiterService