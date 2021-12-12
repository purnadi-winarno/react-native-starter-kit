
const TerjemahModel = {
  name: 'Terjemah',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', indexed: true},
    aya_id: {type: 'int', indexed: true},
    kata: 'string',
    terjemah: 'string',
    aya_number: {type: 'int', indexed: true},
    sura_id: {type: 'int', indexed: true},
    juz_id: {type: 'int', indexed: true}
  }
}

export default TerjemahModel