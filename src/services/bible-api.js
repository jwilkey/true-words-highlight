import axios from 'axios'

export default {
  searchEsv (osis) {
    const passage = osis.replace(/\./g, '_')
    const url = `https://bible.truewordsapp.com/search/${passage}`
    return axios.get(url, { headers: { 'x-esv-api-key': window.esv } })
  }
}
