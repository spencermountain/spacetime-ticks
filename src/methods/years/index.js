const methods = {
  one: function(start, end) {
    let ticks = []

    return ticks
  },
  two: function(start, end) {
    let ticks = []

    return ticks
  },
  many: function(start, end) {
    let ticks = []
    const fmt = '{month-short} {year}'
    let diff = start.diff(end)
    if (diff.years >= 4) {
      let d = start.next('year')
      ticks.push(d.format(fmt))
    }
    console.log(diff)
    return ticks
  },
}
module.exports = methods
