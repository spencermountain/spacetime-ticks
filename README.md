<div align="center">
  <div>spacetime-ticks</div>
  <div>WIP</div>
  <div><a href="https://spencermounta.in/spacetime-ticks/">demo</a></div>
  <a href="https://npmjs.org/package/spacetime-ticks">
    <img src="https://img.shields.io/npm/v/spacetime-ticks.svg?style=flat-square" />
  </a>
  <a href="https://unpkg.com/spacetime-ticks">
    <img src="https://badge-size.herokuapp.com/spencermountain/spacetime-ticks/master/builds/spacetime-ticks.min.js" />
  </a>
</div>

**work-in-progress**
calculate some sensible break-points between two dates, using the [spacetime](https://github.com/spencermountain/spacetime) date library.

`npm i spacetime-ticks`

```js
const spacetimeTicks=require('spacetime-ticks')

let ticks=spacetimeTicks('June 5th 1992', 'Oct 4 2002', 5)
// [
//   {label:'Jan 1994', epoch:1542983206907},
//   {label:'Jan 1996', epoch:1544983216907},
//   {label:'Jan 1998', epoch:1545983206407},
//   {label:'Jan 2000', epoch:1546983206201},
//   {label:'Jan 2002', epoch:1549983204902},
// ]
```

work-in-progress

MIT
