const spacetimeTicks = require('./src')

console.time('d')
let ticks = spacetimeTicks('jan 28 1500', 'jan 1 2019')
console.log(ticks)
console.timeEnd('d')
