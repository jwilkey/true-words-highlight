const books = require('./dbt_greek_books.json')
import axios from 'axios'

export default {
  books () {
    return books.map(b => {
      return [`${b.book_id}`, `${b.book_id} - ${b.book_name}`]
    })
  },
  chapters (bookId) {
    return books.find(b => b.book_id === bookId).chapters.split(',')
  },
  fetch (bookId, chapter) {
    const base = 'https://dbt.io/text/verse'
    const key = '35e9e596933f2fe297b2c5ad0632d484'
    const url = `${base}?dam_id=GRKEPTN1ET&book_id=${bookId}&v=2&key=${key}`

    return axios.get(url)
    .then(response => {
      const text = response.data
      .map(verse => {
        const chapter = parseChapter(verse)
        return `${chapter}${verse.verse_id}] ${verse.verse_text.replace(' \n\t\t\t', '')}`
      }).join(' ')

      const words = text.split(/(\s)/g).map(word => {
        return word === '\n'
        ? {word, status: 'break'}
        : {word, status: ''}
      })

      return words
    })
  }
}

function parseChapter (verse) {
  return verse.verse_id === '1' ? `\n[${verse.chapter_id}:` : '['
}
