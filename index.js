const htm = require('htm')
const vhtml = require('vhtml');
let h = htm.bind(vhtml);
const spacetimeTicks = require('./src')

const printTicks = function() {
  let start = document.querySelector('#start').value
  let end = document.querySelector('#end').value
  let ticks = spacetimeTicks(start, end, 6)
  console.log(ticks)
  ticks = ticks.map((o) => {
    return h`<li class="">${o}</div>`
  })
  document.querySelector('#stage').innerHTML = h`<ul class="f4">${ticks.join('\n')}</ul>`
}


printTicks()
document.querySelector('#start').onkeypress = printTicks
document.querySelector('#end').onkeypress = printTicks
