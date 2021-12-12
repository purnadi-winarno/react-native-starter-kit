
const AyahModel = {
  name: 'Ayah',
  primaryKey: 'aya_id',
  properties: {
    aya_id: {type: 'int', indexed: true},
    aya_number: {type: 'int', indexed: true},
    aya_text: 'string',
    sura_id: {type: 'int', indexed: true},
    juz_id: {type: 'int', indexed: true},
    page_number: 'int',
    translation_aya_text: 'string'
  }
}

export default AyahModel