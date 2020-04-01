export default {
  extractWords (nlpDoc) {
    const words = []
    let verse
    nlpDoc.terms().list.forEach(outerTerm => {
      for (const term of outerTerm.terms) {
        if (term.text === '(LINEBREAK)') {
          words.push({ word: '', meta: 'linebreak' })
        } else if (term.text.match(/\(\d*:?\d*\)/)) {
          const verseNum = term.text.replace(/[()]/g, '')
          verse = verseNum
          words.push({ word: verseNum, verse, meta: 'verse-num' })
        } else {
          if (term.whitespace.before) {
            words.push({ word: ' ', verse, meta: 'space', id: term.uid })
          }
          term.text.split(/([^a-zA-Z\n']+)/g).forEach(t => {
            const isWord = t.match(/[a-zA-Z]/) !== null
            words.push({ word: t, verse, root: term.root, status: '', id: isWord ? term.uid : undefined, meta: isWord ? undefined : 'punctuation' })
          })
          if (term.whitespace.after) {
            words.push({ word: ' ', verse, meta: 'space', id: term.uid })
          }
        }
      }
    })

    return words
  }
}
