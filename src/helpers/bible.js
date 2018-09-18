import osisNames from '../../static/json/osis.json'

export default {
  readableOsis (osis) {
    const refs = osis.split(',')

    const range = refs[0].split('-')
    const start = range[0].split('.')

    const l1 = start.length
    const startRef = `${osisNames[start[0]]} ${start[1]}${l1 > 2 ? ':' + start[2] : ''}`
    var endRef = ''
    if (range[1]) {
      const end = range[1].split('.')
      const l2 = end.length
      endRef = `-${end[1]}${l2 > 2 ? ':' + end[2] : ''}`
    }

    return `${startRef}${endRef}`
  }
}
