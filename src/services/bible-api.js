import axios from 'axios'

export default {
  searchEsv (osis) {
    const passage = osis.replace(/\./g, '_')
    const url = `https://bible.truewordsapp.com/search/${passage}`
    return axios.get(url, { headers: { 'x-esv-api-key': window.esv } })
      .then(response => {
        var text = response.data.passage.verses.map(v => {
          var meta = v.number === 1 ? `(LINEBREAK) (${v.chapter}:${v.number})` : `(${v.number})`
          return `${meta} ${v.text.replace(/<f>\d*<\/f>/g, '')}`
        })

        return {
          reference: response.data.passage.reference,
          copyright: response.data.copyright,
          text
        }
      })
  }
}
