import RealmInstance from "../RealmInstance"

let SurahController = {
    findAll: function() {
      return RealmInstance.objects('Surah')
    },

    findById: function(id){
      return RealmInstance.objects('Surah').filtered('id == $0', id);
    },

    findByName: function(name){
      return RealmInstance.objects('Surah').filtered('surat_name == $0', name);
    },
  
    save: function(surah) {
      if (RealmInstance.objects('Surah').filtered("surat_name == $0", surah.surat_name).length) return;
  
      RealmInstance.write(() => {
        surah.updatedAt = new Date();
        RealmInstance.create('Surah', surah);
      })
    }
};

export default SurahController;