const spacetime = require('spacetime')
const methods = require('./methods')

const chooseMethod = function(start, end, n = 6) {
  let diff = start.diff(end)
  if (diff.years > 3) {
    return methods.years(start, end, n)
  }
  if (diff.months > 3) {
    return methods.months(start, end, n)
  }
  if (diff.days > 3) {
    return methods.days(start, end, n)
  }
  if (diff.hours > 3) {
    return methods.hours(start, end, n)
  }
  if (diff.minutes > 3) {
    return methods.minutes(start, end, n)
  }
  return methods.months(start, end, n)
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
