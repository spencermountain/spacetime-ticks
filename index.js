const htm = require('htm')
const vhtml = require('vhtml');
// const inputs = require('somehow-input');
const inputs = require('/Users/spencer/mountain/somehow-input/src');
let h = htm.bind(vhtml);
const spacetimeTicks = require('./src')

const printTicks = function() {
  let start = document.querySelector('#start').querySelector('input').value
  let end = document.querySelector('#end').querySelector('input').value
  let n = document.querySelector('#ticks').querySelector('select').value
  let ticks = spacetimeTicks(start, end, n)
  ticks = ticks.map((o) => {
    return h`<tr >
      <td class="">${o.label}</td>
      <td class="light f09 m09">${o.value}</td>
    </tr>`
  })
  document.querySelector('#stage').innerHTML = h`<table class="f2 mud w7">${ticks}</table>`
}

// let ticks = spacetimeTicks('June 5th 1997', 'Oct 4 2001', 5)
// console.log(JSON.stringify(ticks, null, 2))

// printTicks()
let start = inputs.input({
  label: 'start',
  value: 'June 5th 1998',
  cb: () => printTicks()
})
let end = inputs.input({
  label: 'end',
  value: 'Oct 4 2002',
  cb: () => printTicks()
})
let select = inputs.select({
  label: 'max-ticks',
  value: '6',
  options: ['4', '5', '6', '7', '8', '9', '10', '11'],
  cb: () => printTicks()
})
document.querySelector('#start').innerHTML = start.build()
document.querySelector('#ticks').innerHTML = select.build()
document.querySelector('#end').innerHTML = end.build()

printTicks()
