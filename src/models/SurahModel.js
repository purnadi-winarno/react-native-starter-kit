const SurahModel = {
  name: 'Surah',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', indexed: true},
    surat_name: 'string',
    surat_text: 'string',
    surat_terjemahan: 'string',
    count_ayat: 'int'
  }
}

export default SurahModel