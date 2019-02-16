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
// { label: "1993", epoch: 725864400000, value: 0.055 }
// { label: "1995", epoch: 788936400000, value: 0.248 }
// { label: "1997", epoch: 852094800000, value: 0.442 }
// { label: "1999", epoch: 915166800000, value: 0.636 }
// { label: "2001", epoch: 978325200000, value: 0.829 }
// ]
```

This library has some opinions:
* ticks should always be spaced evenly, even if this means less ticks
* ticks should appear on the start of months, years, days
* the ticks don't need to begin/end at the start/end.
* less ticks are better than too-many ticks

it was built for labelling an x-axis in a space-sensitive way, but can be used for any other stuff.

MIT
