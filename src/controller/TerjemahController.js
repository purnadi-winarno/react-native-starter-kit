import RealmInstance from "../RealmInstance"

let TerjemahController = {
    findAll: function() {
      return RealmInstance.objects('Terjemah')
    },

    findByNumber: function(surahId, ayahNumber){
      return RealmInstance.objects('Terjemah').filtered('sura_id == $0 AND aya_number $1', surahId, ayahNumber);
    },
  
    save: function(terjemah) {
      if (RealmInstance.objects('Terjemah').filtered("id == $0", terjemah.id).length) return;
  
      RealmInstance.write(() => {
        terjemah.updatedAt = new Date();
        RealmInstance.create('Terjemah', terjemah);
      })
    }
};

export default TerjemahController;