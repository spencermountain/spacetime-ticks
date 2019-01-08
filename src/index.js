const spacetime = require('spacetime')
const methods = require('./methods')

const chooseMethod = function(start, end, n) {
  let diff = start.diff(end)
  console.log(diff)
  //1998 -> 2012
  if (diff.year > 3) {
    return methods.years.many(start, end, n)
  }
// // let diff = end.epoch - start.epoch
// if (diff > year * 3) {
//   return 'yyyy'
// }
// if (diff > year) {
//   return 'MMM yyyy'
// }
// //sept
// if (diff > sixMonth) {
//   return 'MMM'
// }
// //sept 1
// if (diff > month) {
//   return 'MMM d'
// }
// //time
// if (diff < day) {
//   return 'h:mm a'
// }
// return 'MMM d'
}

const spacetimeTicks = function(start, end, n = 6) {
  start = spacetime(start)
  end = spacetime(end)
  //reverse them, if necessary
  if (start.epoch > end.epoch) {
    let tmp = start.epoch
    start.epoch = end.epoch
    end.epoch = tmp
  }
  let ticks = chooseMethod(start, end, n)
  return ticks
}
module.exports = spacetimeTicks
