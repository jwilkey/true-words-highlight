export default {
  extractWords (nlpDoc) {
    var words = []

    nlpDoc.terms().list.forEach(outerTerm => {
      outerTerm.terms.forEach((term, index) => {
        if (term.text === '(LINEBREAK)') {
          words.push({ word: '', meta: 'linebreak' })
        } else if (term.text.match(/\(\d*:?\d*\)/)) {
          words.push({ word: term.text.replace(/[()]/g, ''), meta: 'verse-num' })
        } else {
          if (term.whitespace.before) {
            words.push({ word: ' ', meta: 'space', id: term.uid })
          }
          term.text.split(/([^a-zA-Z\n']+)/g).forEach(t => {
            const isWord = t.match(/[a-zA-Z]/) !== null
            words.push({ word: t, root: term.root, status: '', id: isWord ? term.uid : undefined, meta: isWord ? undefined : 'punctuation' })
          })
          if (term.whitespace.after) {
            words.push({ word: ' ', meta: 'space', id: term.uid })
          }
        }
      })
    })

    return words
  }
}
