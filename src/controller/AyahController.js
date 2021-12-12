import RealmInstance from "../RealmInstance"

let AyahController = {
    findAll: function() {
      return RealmInstance.objects('Ayah')
    },

    findBySurahId: function(surahId){
      return RealmInstance.objects('Ayah').filtered('sura_id == $0', surahId);
    },

    findByNumber: function(surahId, ayahNumber){
      return RealmInstance.objects('Ayah').filtered('sura_id == $0 AND aya_number $1', surahId, ayahNumber);
    },
  
    save: function(ayah) {
      if (RealmInstance.objects('Ayah').filtered("aya_id == $0", ayah.aya_id).length) return;
  
      RealmInstance.write(() => {
        ayah.updatedAt = new Date();
        RealmInstance.create('Ayah', ayah);
      })
    }
};

export default AyahController;