/* somehow v0.0.2
   github.com/spencermountain/spacetime-ticks
   MIT
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.spacetimeTicks = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
(function (global){
/* spacetime v5.2.1
   github.com/spencermountain/spacetime
   MIT
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.spacetime = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof _dereq_&&_dereq_;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof _dereq_&&_dereq_,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
"use strict";

module.exports = '5.2.1';

},{}],2:[function(_dereq_,module,exports){
'use strict';

var shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
module.exports = {
  short: function short() {
    return shortDays;
  },
  long: function long() {
    return longDays;
  },
  set: function set(i18n) {
    shortDays = i18n.short;
    longDays = i18n.long;
  }
};

},{}],3:[function(_dereq_,module,exports){
'use strict';

var o = {
  millisecond: 1
};
o.second = 1000;
o.minute = 60000;
o.hour = 3.6e6; // dst is supported post-hoc

o.day = 8.64e7; // 

o.date = o.day;
o.month = 8.64e7 * 29.5; //(average)

o.week = 6.048e8;
o.year = 3.154e10; // leap-years are supported post-hoc
//add plurals

Object.keys(o).forEach(function (k) {
  o[k + 's'] = o[k];
});
module.exports = o;

},{}],4:[function(_dereq_,module,exports){
"use strict";

var monthLengths = [31, // January - 31 days
28, // February - 28 days in a common year and 29 days in leap years
31, // March - 31 days
30, // April - 30 days
31, // May - 31 days
30, // June - 30 days
31, // July - 31 days
31, // August - 31 days
30, // September - 30 days
31, // October - 31 days
30, // November - 30 days
31 // December - 31 days
];
module.exports = monthLengths;

},{}],5:[function(_dereq_,module,exports){
'use strict';

var shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
var longMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

function buildMapping() {
  var obj = {
    sep: 8 //support this format

  };

  for (var i = 0; i < shortMonths.length; i++) {
    obj[shortMonths[i]] = i;
  }

  for (var _i = 0; _i < longMonths.length; _i++) {
    obj[longMonths[_i]] = _i;
  }

  return obj;
}

module.exports = {
  short: function short() {
    return shortMonths;
  },
  long: function long() {
    return longMonths;
  },
  mapping: function mapping() {
    return buildMapping();
  },
  set: function set(i18n) {
    shortMonths = i18n.short;
    longMonths = i18n.long;
  }
};

},{}],6:[function(_dereq_,module,exports){
"use strict";

module.exports = [null, [0, 1], //jan 1
[3, 1], //apr 1
[6, 1], //july 1
[9, 1]];

},{}],7:[function(_dereq_,module,exports){
"use strict";

//https://www.timeanddate.com/calendar/aboutseasons.html
// Spring - from March 1 to May 31;
// Summer - from June 1 to August 31;
// Fall (autumn) - from September 1 to November 30; and,
// Winter - from December 1 to February 28 (February 29 in a leap year).
module.exports = {
  north: [['spring', 2, 1], //spring march 1
  ['summer', 5, 1], //june 1
  ['fall', 8, 1], //sept 1
  ['autumn', 8, 1], //sept 1
  ['winter', 11, 1] //dec 1
  ],
  south: [['fall', 2, 1], //march 1
  ['autumn', 2, 1], //march 1
  ['winter', 5, 1], //june 1
  ['spring', 8, 1], //sept 1
  ['summer', 11, 1] //dec 1
  ]
};

},{}],8:[function(_dereq_,module,exports){
'use strict'; //git:blame @JuliasCaesar https://www.timeanddate.com/date/leapyear.html

exports.isLeapYear = function (year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}; // unsurprisingly-nasty `typeof date` call


exports.isDate = function (d) {
  return Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.valueOf());
};

exports.isArray = function (input) {
  return Object.prototype.toString.call(input) === '[object Array]';
};

exports.isObject = function (input) {
  return Object.prototype.toString.call(input) === '[object Object]';
};

exports.zeroPad = function (str, len) {
  len = len || 2;
  var pad = '0';
  str = str + '';
  return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str;
};

exports.titleCase = function (str) {
  if (!str) {
    return '';
  }

  return str[0].toUpperCase() + str.substr(1);
};

exports.ordinal = function (i) {
  var j = i % 10;
  var k = i % 100;

  if (j === 1 && k !== 11) {
    return i + 'st';
  }

  if (j === 2 && k !== 12) {
    return i + 'nd';
  }

  if (j === 3 && k !== 13) {
    return i + 'rd';
  }

  return i + 'th';
}; //strip 'st' off '1st'..


exports.toCardinal = function (str) {
  str = String(str);
  str = str.replace(/([0-9])(st|nd|rd|th)$/i, '$1');
  return parseInt(str, 10);
};

exports.normalize = function (str) {
  str = str.toLowerCase();
  str = str.replace(/ies$/, 'y'); //'centuries'

  str = str.replace(/s$/, '');

  if (str === 'day') {
    return 'date';
  }

  return str;
};

exports.getEpoch = function (tmp) {
  //support epoch
  if (typeof tmp === 'number') {
    return tmp;
  } //suport date objects


  if (exports.isDate(tmp)) {
    return tmp.getTime();
  }

  if (tmp.epoch) {
    return tmp.epoch;
  }

  return null;
}; //make sure this input is a spacetime obj


exports.beADate = function (d, s) {
  if (exports.isObject(d) === false) {
    return s.clone().set(d);
  }

  return d;
};

},{}],9:[function(_dereq_,module,exports){
'use strict';

var Spacetime = _dereq_('./spacetime');

var whereIts = _dereq_('./whereIts');

var version = _dereq_('../_version');

var main = function main(input, tz, options) {
  return new Spacetime(input, tz, options);
}; //some helper functions on the main method


main.now = function (tz, options) {
  return new Spacetime(new Date().getTime(), tz, options);
};

main.today = function (tz, options) {
  var s = new Spacetime(new Date().getTime(), tz, options);
  return s.startOf('day');
};

main.tomorrow = function (tz, options) {
  var s = new Spacetime(new Date().getTime(), tz, options);
  return s.add(1, 'day').startOf('day');
};

main.yesterday = function (tz, options) {
  var s = new Spacetime(new Date().getTime(), tz, options);
  return s.subtract(1, 'day').startOf('day');
};

main.extend = function (obj) {
  Object.keys(obj).forEach(function (k) {
    Spacetime.prototype[k] = obj[k];
  });
  return this;
}; //find tz by time


main.whereIts = whereIts;
main.version = version; //aliases:

main.plugin = main.extend;
module.exports = main;

},{"../_version":1,"./spacetime":34,"./whereIts":41}],10:[function(_dereq_,module,exports){
'use strict';

var monthLengths = _dereq_('../data/monthLengths');

var isLeapYear = _dereq_('../fns').isLeapYear; //given a month, return whether day number exists in it


var hasDate = function hasDate(obj) {
  //invalid values
  if (monthLengths.hasOwnProperty(obj.month) !== true) {
    return false;
  } //support leap-year in february


  if (obj.month === 1) {
    if (isLeapYear(obj.year) && obj.date <= 29) {
      return true;
    } else {
      return obj.date <= 28;
    }
  } //is this date too-big for this month?


  var max = monthLengths[obj.month] || 0;

  if (obj.date <= max) {
    return true;
  }

  return false;
};

module.exports = hasDate;

},{"../data/monthLengths":4,"../fns":8}],11:[function(_dereq_,module,exports){
'use strict';

var strFmt = _dereq_('./strParse');

var fns = _dereq_('../fns');

var namedDates = _dereq_('./named-dates'); //we have to actually parse these inputs ourselves
//  -  can't use built-in js parser ;(
//=========================================
// ISO Date	  "2015-03-25"
// Short Date	"03/25/2015" or "2015/03/25"
// Long Date	"Mar 25 2015" or "25 Mar 2015"
// Full Date	"Wednesday March 25 2015"
//=========================================
//-- also -
// if the given epoch is really small, they've probably given seconds and not milliseconds
// anything below this number is likely (but not necessarily) a mistaken input.
// this may seem like an arbitrary number, but it's 'within jan 1970'
// this is only really ambiguous until 2054 or so


var minimumEpoch = 2500000000; //support [2016, 03, 01] format

var handleArray = function handleArray(s, arr) {
  var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];

  for (var i = 0; i < arr.length; i++) {
    var num = arr[i] || 0;
    s = s[order[i]](num);
  }

  return s;
}; //support {year:2016, month:3} format


var handleObject = function handleObject(s, obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    var unit = keys[i]; //make sure we have this method

    if (s[unit] === undefined || typeof s[unit] !== 'function') {
      continue;
    } //make sure the value is a number


    if (obj[unit] === null || obj[unit] === undefined || obj[unit] === '') {
      continue;
    }

    var num = obj[unit] || 0;
    s = s[unit](num);
  }

  return s;
}; //find the epoch from different input styles


var parseInput = function parseInput(s, input, givenTz) {
  //if we've been given a epoch number, it's easy
  if (typeof input === 'number') {
    if (input > 0 && input < minimumEpoch && s.silent === false) {
      console.warn('  - Warning: You are setting the date to January 1970.');
      console.warn('       -   did input seconds instead of milliseconds?');
    }

    s.epoch = input;
    return s;
  } //set tmp time


  s.epoch = Date.now();

  if (input === null || input === undefined) {
    return s; //k, we're good.
  } //support input of Date() object


  if (fns.isDate(input) === true) {
    s.epoch = input.getTime();
    return s;
  } //support [2016, 03, 01] format


  if (fns.isArray(input) === true) {
    s = handleArray(s, input);
    return s;
  } //support {year:2016, month:3} format


  if (fns.isObject(input) === true) {
    //support spacetime object as input
    if (input.epoch) {
      s.epoch = input.epoch;
      return s;
    }

    s = handleObject(s, input);
    return s;
  } //input as a string..


  if (typeof input !== 'string') {
    return s;
  } //little cleanup..


  input = input.replace(/\b(mon|tues|wed|wednes|thu|thurs|fri|sat|satur|sun)(day)?\b/, '');
  input = input.trim().replace(/ +/g, ' '); //try some known-words, like 'now'

  if (namedDates.hasOwnProperty(input) === true) {
    s = namedDates[input](s);
    return s;
  } //try each text-parse template, use the first good result


  for (var i = 0; i < strFmt.length; i++) {
    var m = input.match(strFmt[i].reg);

    if (m) {
      s = strFmt[i].parse(s, m, givenTz);
      return s;
    }
  }

  if (s.silent === false) {
    console.warn('Warning: couldn\'t parse date-string: \'' + input + '\'');
  }

  s.epoch = null;
  return s;
};

module.exports = parseInput;

},{"../fns":8,"./named-dates":12,"./strParse":14}],12:[function(_dereq_,module,exports){
'use strict';

var dates = {
  now: function now(s) {
    s.epoch = Date.now();
    return s;
  },
  tonight: function tonight(s) {
    s.epoch = Date.now();
    s = s.hour(18);
    return s;
  },
  today: function today(s) {
    s.epoch = Date.now();
    return s;
  },
  tomorrow: function tomorrow(s) {
    s.epoch = Date.now();
    s = s.add(1, 'day');
    s = s.startOf('day');
    return s;
  },
  yesterday: function yesterday(s) {
    s.epoch = Date.now();
    s = s.subtract(1, 'day');
    s = s.startOf('day');
    return s;
  },
  christmas: function christmas(s) {
    var year = new Date().getFullYear();
    s = s.set([year, 11, 25, 18, 0, 0]); // Dec 25

    return s;
  },
  'new years': function newYears(s) {
    var year = new Date().getFullYear();
    s = s.set([year, 11, 31, 18, 0, 0]); // Dec 31

    return s;
  }
};
dates['new years eve'] = dates['new years'];
module.exports = dates;

},{}],13:[function(_dereq_,module,exports){
'use strict'; //pull-apart ISO offsets, like "+0100"

var parseOffset = function parseOffset(s, offset) {
  if (!offset) {
    return s;
  } //this is a fancy-move


  if (offset === 'Z') {
    offset = '+0000';
  } //support "+01:00"


  if (/:00/.test(offset) === true) {
    offset = offset.replace(/:00/, '');
  } //support "+01:30"


  if (/:00/.test(offset) === true) {
    offset = offset.replace(/:00/, '.5');
  }

  var num = parseInt(offset, 10); //divide by 100 or 10 - , "+0100", "+01"

  if (Math.abs(num) > 100) {
    num = num / 100;
  } // console.log(offset, num)


  var current = s.timezone().current.offset;

  if (current === num) {
    //we cool..
    return s;
  } //okay, try to match it to a utc timezone
  //this is opposite! a -5 offset maps to Etc/GMT+5  ¯\_()_/¯
  //https://askubuntu.com/questions/519550/why-is-the-8-timezone-called-gmt-8-in-the-filesystem


  num *= -1;

  if (num >= 0) {
    num = '+' + num;
  }

  var tz = 'etc/gmt' + num;
  var zones = s.timezones; // console.log(tz)

  if (zones[tz]) {
    // console.log('changing timezone to: ' + tz)
    //log a warning if we're over-writing a given timezone
    // if (givenTz && zones[givenTz] && zones[givenTz].offset !== zones[tz].offset && s.silent === false) {
    //don't log during our tests, either..
    // if (typeof process !== 'undefined' && process.env && !process.env.TESTENV) {
    //   console.warn('  - Setting timezone to: \'' + tz + '\'')
    //   console.warn('     from ISO string \'' + offset + '\'')
    //   console.warn('     overwriting given timezone: \'' + givenTz + '\'\n')
    // }
    // }
    s.tz = tz;
  }

  return s;
};

module.exports = parseOffset;

},{}],14:[function(_dereq_,module,exports){
'use strict';

var walkTo = _dereq_('../methods/set/walk');

var months = _dereq_('../data/months').mapping();

var parseOffset = _dereq_('./parseOffset');

var hasDate = _dereq_('./hasDate');

var fns = _dereq_('../fns'); // const zones = require('../../data');


var parseHour = function parseHour(s, str) {
  str = str.replace(/^\s+/, ''); //trim

  var arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/);

  if (arr) {
    s = s.hour(arr[1]);
    s = s.minute(arr[2]);

    if (arr[3]) {
      s = s.seconds(arr[3]);
    }

    if (arr[4]) {
      s = s.millisecond(arr[4]);
    }
  }

  return s;
};

var parseYear = function parseYear(str) {
  str = str || ''; //support '18 -> 2018
  // str = str.replace(/^'([0-9]{2})/, '20$1')
  // str = str.replace('([0-9]+) ?b\.?c\.?$', '-$1')

  var year = parseInt(str.trim(), 10);
  year = year || new Date().getFullYear();
  return year;
};

var strFmt = [//iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
{
  reg: /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/,
  parse: function parse(s, arr, givenTz, options) {
    var month = parseInt(arr[2], 10) - 1;
    var obj = {
      year: arr[1],
      month: month,
      date: arr[3]
    };

    if (hasDate(obj) === false) {
      s.epoch = null;
      return s;
    }

    parseOffset(s, arr[5], givenTz, options);
    walkTo(s, obj);
    s = parseHour(s, arr[4]);
    return s;
  }
}, //iso "2015-03-25" or "2015/03/25" //0-based-months!
{
  reg: /^([0-9]{4})[\-\/]([0-9]{1,2})[\-\/]([0-9]{1,2})$/,
  parse: function parse(s, arr) {
    var obj = {
      year: arr[1],
      month: parseInt(arr[2], 10) - 1,
      date: parseInt(arr[3], 10)
    };

    if (obj.month >= 12) {
      //support yyyy/dd/mm (weird, but ok)
      obj.date = parseInt(arr[2], 10);
      obj.month = parseInt(arr[3], 10) - 1;
    }

    if (hasDate(obj) === false) {
      s.epoch = null;
      return s;
    }

    walkTo(s, obj);
    return s;
  }
}, //short - uk "03/25/2015"  //0-based-months!
{
  reg: /^([0-9]{1,2})[\-\/]([0-9]{1,2})[\-\/]?([0-9]{4})?$/,
  parse: function parse(s, arr) {
    var month = parseInt(arr[1], 10) - 1;
    var date = parseInt(arr[2], 10);

    if (month >= 12) {
      //support yyyy/dd/mm (weird, but ok)
      month = parseInt(arr[2], 10) - 1;
      date = parseInt(arr[1], 10);
    }

    var year = arr[3] || new Date().getFullYear();
    var obj = {
      year: year,
      month: month,
      date: date
    };

    if (hasDate(obj) === false) {
      s.epoch = null;
      return s;
    }

    walkTo(s, obj);
    return s;
  }
}, //Long "Mar 25 2015"
//February 22, 2017 15:30:00
{
  reg: /^([a-z]+) ([0-9]{1,2}(?:st|nd|rd|th)?),?( [0-9]{4})?( ([0-9:]+))?$/i,
  parse: function parse(s, arr) {
    var month = months[arr[1].toLowerCase()];
    var year = parseYear(arr[3]);
    var obj = {
      year: year,
      month: month,
      date: fns.toCardinal(arr[2] || '')
    };

    if (hasDate(obj) === false) {
      s.epoch = null;
      return s;
    }

    walkTo(s, obj);

    if (arr[4]) {
      s = parseHour(s, arr[4]);
    }

    return s;
  }
}, //February 2017 (implied date)
{
  reg: /^([a-z]+) ([0-9]{4})$/i,
  parse: function parse(s, arr) {
    var month = months[arr[1].toLowerCase()];
    var year = parseYear(arr[2]);
    var obj = {
      year: year,
      month: month,
      date: 1
    };

    if (hasDate(obj) === false) {
      s.epoch = null;
      return s;
    }

    walkTo(s, obj);

    if (arr[4]) {
      s = parseHour(s, arr[4]);
    }

    return s;
  }
}, //Long "25 Mar 2015"
{
  reg: /^([0-9]{1,2}(?:st|nd|rd|th)?) ([a-z]+),?( [0-9]{4})?$/i,
  parse: function parse(s, arr) {
    var month = months[arr[2].toLowerCase()];
    var year = parseYear(arr[3]);
    var obj = {
      year: year,
      month: month,
      date: fns.toCardinal(arr[1])
    };

    if (hasDate(obj) === false) {
      s.epoch = null;
      return s;
    }

    walkTo(s, obj);
    return s;
  }
}, {
  // '1992'
  reg: /^[0-9]{4}$/i,
  parse: function parse(s, arr) {
    var year = parseYear(arr[0]);
    var d = new Date();
    var obj = {
      year: year,
      month: d.getMonth(),
      date: d.getDate()
    };

    if (hasDate(obj) === false) {
      s.epoch = null;
      return s;
    }

    walkTo(s, obj);
    return s;
  }
}, {
  // '200bc'
  reg: /^[0-9,]+ ?b\.?c\.?$/i,
  parse: function parse(s, arr) {
    var str = arr[0] || ''; //make negative-year

    str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1'); //remove commas

    str = str.replace(/,/g, '');
    var year = parseInt(str.trim(), 10);
    var d = new Date();
    var obj = {
      year: year,
      month: d.getMonth(),
      date: d.getDate()
    };

    if (hasDate(obj) === false) {
      s.epoch = null;
      return s;
    }

    walkTo(s, obj);
    return s;
  }
}];
module.exports = strFmt;

},{"../data/months":5,"../fns":8,"../methods/set/walk":31,"./hasDate":10,"./parseOffset":13}],15:[function(_dereq_,module,exports){
'use strict';

var _format = _dereq_('./methods/format');

var _unixFmt = _dereq_('./methods/format/unixFmt');

var _progress = _dereq_('./methods/progress');

var _nearest = _dereq_('./methods/nearest');

var _diff = _dereq_('./methods/diff');

var _since = _dereq_('./methods/since');

var ends = _dereq_('./methods/startOf');

var _timezone = _dereq_('./timezone/index');

var findTz = _dereq_('./timezone/find');

var handleInput = _dereq_('./input');

var fns = _dereq_('./fns'); //the spacetime instance methods (also, the API)


var methods = {
  set: function set(input) {
    var s = this.clone();
    s = handleInput(s, input);
    return s;
  },
  timezone: function timezone() {
    return _timezone(this);
  },
  isDST: function isDST() {
    return _timezone(this).current.isDST;
  },
  hasDST: function hasDST() {
    return _timezone(this).hasDst;
  },
  offset: function offset() {
    return _timezone(this).current.offset * 60;
  },
  hemisphere: function hemisphere() {
    return _timezone(this).hemisphere;
  },
  format: function format(fmt) {
    return _format(this, fmt);
  },
  unixFmt: function unixFmt(fmt) {
    return _unixFmt(this, fmt);
  },
  startOf: function startOf(unit) {
    return ends.startOf(this, unit);
  },
  endOf: function endOf(unit) {
    return ends.endOf(this, unit);
  },
  leapYear: function leapYear() {
    var year = this.year();
    return fns.isLeapYear(year);
  },
  progress: function progress() {
    return _progress(this);
  },
  nearest: function nearest(unit) {
    return _nearest(this, unit);
  },
  diff: function diff(d, unit) {
    return _diff(this, d, unit);
  },
  since: function since(d) {
    if (!d) {
      d = this.clone().set();
    }

    return _since(this, d);
  },
  next: function next(unit) {
    var s = this.add(1, unit);
    return s.startOf(unit);
  },
  //the start of the previous year/week/century
  last: function last(unit) {
    var s = this.subtract(1, unit);
    return s.startOf(unit);
  },
  isValid: function isValid() {
    //null/undefined epochs
    if (!this.epoch && this.epoch !== 0) {
      return false;
    }

    return !isNaN(this.d.getTime());
  },
  //travel to this timezone
  goto: function goto(tz) {
    var s = this.clone();
    s.tz = findTz(tz, s.timezones); //science!

    return s;
  },
  isAwake: function isAwake() {
    var hour = this.hour(); //10pm -> 8am

    if (hour < 8 || hour > 22) {
      return false;
    }

    return true;
  },
  isAsleep: function isAsleep() {
    return !this.isAwake();
  },
  //pretty-printing
  log: function log() {
    console.log('');
    console.log(_format(this, 'nice-short'));
    return this;
  },
  logYear: function logYear() {
    console.log('');
    console.log(_format(this, 'full-short'));
    return this;
  },
  debug: function debug() {
    var tz = this.timezone();
    var date = this.format('MM') + ' ' + this.format('date-ordinal') + ' ' + this.year();
    date += '\n     - ' + this.format('time');
    console.log('\n\n', date + '\n     - ' + tz.name + ' (' + tz.current.offset + ')');
    return this;
  } // aliases

};
methods.inDST = methods.isDST;
methods.round = methods.nearest;
module.exports = methods;

},{"./fns":8,"./input":11,"./methods/diff":18,"./methods/format":20,"./methods/format/unixFmt":21,"./methods/nearest":23,"./methods/progress":24,"./methods/since":32,"./methods/startOf":33,"./timezone/find":36,"./timezone/index":38}],16:[function(_dereq_,module,exports){
'use strict';

var walkTo = _dereq_('./set/walk');

var ms = _dereq_('../data/milliseconds');

var monthLength = _dereq_('../data/monthLengths');

var fns = _dereq_('../fns');

var order = ['millisecond', 'second', 'minute', 'hour', 'date', 'month'];
var keep = {
  second: order.slice(0, 1),
  minute: order.slice(0, 2),
  quarterhour: order.slice(0, 2),
  hour: order.slice(0, 3),
  date: order.slice(0, 4),
  month: order.slice(0, 4),
  quarter: order.slice(0, 4),
  season: order.slice(0, 4),
  year: order,
  decade: order,
  century: order
};
keep.week = keep.date;
keep.season = keep.date;
keep.quarter = keep.date;
var keepDate = {
  month: true,
  quarter: true,
  season: true,
  year: true
}; //month is the only thing we 'model/compute'
//- because ms-shifting can be off by enough

var rollMonth = function rollMonth(want, old) {
  //increment year
  if (want.month > 0) {
    var years = parseInt(want.month / 12, 10);
    want.year = old.year() + years;
    want.month = want.month % 12;
  } else if (want.month < 0) {
    //decrement year
    var _years = Math.floor(Math.abs(want.month) / 13, 10);

    _years = Math.abs(_years) + 1;
    want.year = old.year() - _years; //ignore extras

    want.month = want.month % 12;
    want.month = want.month + 12;

    if (want.month === 12) {
      want.month = 0;
    }
  }

  return want;
};

var addMethods = function addMethods(SpaceTime) {
  SpaceTime.prototype.add = function (num, unit) {
    var s = this.clone();

    if (!unit) {
      return s; //don't bother
    }

    var old = this.clone();
    unit = fns.normalize(unit); //move forward by the estimated milliseconds (rough)

    if (ms[unit]) {
      s.epoch += ms[unit] * num;
    } else if (unit === 'week') {
      s.epoch += ms.day * (num * 7);
    } else if (unit === 'quarter' || unit === 'season') {
      s.epoch += ms.month * (num * 4);
    } else if (unit === 'season') {
      s.epoch += ms.month * (num * 4);
    } else if (unit === 'quarterhour') {
      s.epoch += ms.minute * 15;
    } //now ensure our milliseconds/etc are in-line


    var want = {};

    if (keep[unit]) {
      keep[unit].forEach(function (u) {
        want[u] = old[u]();
      });
    } //ensure month/year has ticked-over


    if (unit === 'month') {
      want.month = old.month() + num; //month is the one unit we 'model' directly

      want = rollMonth(want, old);
    } //support coercing a week, too


    if (unit === 'week') {
      var sum = old.date() + num * 7;

      if (sum <= 28 && sum > 1) {
        want.date = sum;
      }
    } //support 25-hour day-changes on dst-changes
    else if (unit === 'date') {
        //specify a naive date number, if it's easy to do...
        var _sum = old.date() + num;

        if (_sum <= 28 && _sum > 1) {
          want.date = _sum;
        } //or if we haven't moved at all..
        else if (num !== 0 && old.isSame(s, 'day')) {
            want.date = old.date() + num;
          }
      } //ensure year has changed (leap-years)
      else if (unit === 'year' && s.year() === old.year()) {
          s.epoch += ms.week;
        } //these are easier
        else if (unit === 'decade') {
            want.year = s.year() + 10;
          } else if (unit === 'century') {
            want.year = s.year() + 100;
          } //keep current date, unless the month doesn't have it.


    if (keepDate[unit]) {
      var max = monthLength[want.month];
      want.date = old.date();

      if (want.date > max) {
        want.date = max;
      }
    }

    walkTo(s, want);
    return s;
  }; //subtract is only add *-1


  SpaceTime.prototype.subtract = function (num, unit) {
    var s = this.clone();
    return s.add(num * -1, unit);
  }; //add aliases


  SpaceTime.prototype.minus = SpaceTime.prototype.subtract;
  SpaceTime.prototype.plus = SpaceTime.prototype.add;
};

module.exports = addMethods;

},{"../data/milliseconds":3,"../data/monthLengths":4,"../fns":8,"./set/walk":31}],17:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');

var addMethods = function addMethods(SpaceTime) {
  var methods = {
    isAfter: function isAfter(d) {
      d = fns.beADate(d, this);
      var epoch = fns.getEpoch(d);

      if (epoch === null) {
        return null;
      }

      return this.epoch > epoch;
    },
    isBefore: function isBefore(d) {
      d = fns.beADate(d, this);
      var epoch = fns.getEpoch(d);

      if (epoch === null) {
        return null;
      }

      return this.epoch < epoch;
    },
    isEqual: function isEqual(d) {
      d = fns.beADate(d, this);
      var epoch = fns.getEpoch(d);

      if (epoch === null) {
        return null;
      }

      return this.epoch === epoch;
    },
    isBetween: function isBetween(start, end) {
      start = fns.beADate(start, this);
      end = fns.beADate(end, this);
      var startEpoch = fns.getEpoch(start);

      if (startEpoch === null) {
        return null;
      }

      var endEpoch = fns.getEpoch(end);

      if (endEpoch === null) {
        return null;
      }

      return startEpoch < this.epoch && this.epoch < endEpoch;
    }
  }; //hook them into proto

  Object.keys(methods).forEach(function (k) {
    SpaceTime.prototype[k] = methods[k];
  });
};

module.exports = addMethods;

},{"../fns":8}],18:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns'); //init this function up here


var doAll = function doAll() {}; //increment until dates are the same


var climb = function climb(a, b, unit) {
  var i = 0;
  a = a.clone();

  while (a.isBefore(b)) {
    //do proper, expensive increment to catch all-the-tricks
    a = a.add(1, unit);
    i += 1;
  } //oops, we went too-far..


  if (!a.isSame(b, unit)) {
    i -= 1;
  }

  return i;
};

var diffQuick = function diffQuick(a, b) {
  var ms = b.epoch - a.epoch;
  var obj = {
    milliseconds: ms,
    seconds: parseInt(ms / 1000, 10)
  };
  obj.minutes = parseInt(obj.seconds / 60, 10);
  obj.hours = parseInt(obj.minutes / 60, 10);
  return obj;
};

var diff = function diff(a, b, unit) {
  //remove trailing s
  b = fns.beADate(b, a);

  if (!unit) {
    return doAll(a, b);
  } //make sure it's plural-form


  unit = fns.normalize(unit);

  if (/s$/.test(unit) !== true) {
    unit += 's';
  } //do quick-form for these small-ones


  if (unit === 'milliseconds' || unit === 'seconds' || unit === 'minutes') {
    return diffQuick(a, b)[unit];
  } //otherwise, do full-version


  if (a.isBefore(b)) {
    return climb(a, b, unit);
  } else {
    //reverse it
    return climb(b, a, unit) * -1;
  }
};

doAll = function doAll(a, b) {
  //do ms, seconds, minutes in a faster way
  var all = diffQuick(a, b);
  all.years = diff(a, b, 'year');
  all.months = diff(a, b, 'month');
  all.weeks = diff(a, b, 'week');
  all.days = diff(a, b, 'day'); //only slow-compute hours if it's a small diff

  if (all.years === 0) {
    all.hours = diff(a, b, 'hour');
  }

  return all;
};

module.exports = diff;

},{"../fns":8}],19:[function(_dereq_,module,exports){
"use strict";

var fns = _dereq_('../../fns'); // "+01:00", "+0100", or simply "+01"


var isoOffset = function isoOffset(s) {
  var offset = s.timezone().current.offset;
  var minute = '00';

  if (offset % 1 === 0.5) {
    //fraction of the hour
    minute = '30';
    offset = Math.floor(offset);
  }

  if (offset < 0) {
    //handle negative sign
    offset *= -1;
    offset = fns.zeroPad(offset, 2);
    offset = '-' + offset;
  } else {
    offset = fns.zeroPad(offset, 2);
    offset = '+' + offset;
  }

  offset = offset + ':' + minute; //this is a little cleaner?

  if (offset === "+00:00") {
    offset = 'Z';
  }

  return offset;
};

module.exports = isoOffset;

},{"../../fns":8}],20:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../../fns');

var months = _dereq_('../../data/months');

var days = _dereq_('../../data/days');

var isoOffset = _dereq_('./_offset');

var format = {
  day: function day(s) {
    return fns.titleCase(s.dayName());
  },
  'day-short': function dayShort(s) {
    return fns.titleCase(days.short()[s.day()]);
  },
  'day-number': function dayNumber(s) {
    return s.day();
  },
  'day-ordinal': function dayOrdinal(s) {
    return fns.ordinal(s.day());
  },
  'day-pad': function dayPad(s) {
    return fns.zeroPad(s.day());
  },
  date: function date(s) {
    return s.date();
  },
  'date-ordinal': function dateOrdinal(s) {
    return fns.ordinal(s.date());
  },
  'date-pad': function datePad(s) {
    return fns.zeroPad(s.date());
  },
  month: function month(s) {
    return fns.titleCase(s.monthName());
  },
  'month-short': function monthShort(s) {
    return fns.titleCase(months.short()[s.month()]);
  },
  'month-number': function monthNumber(s) {
    return s.month();
  },
  'month-ordinal': function monthOrdinal(s) {
    return fns.ordinal(s.month());
  },
  'month-pad': function monthPad(s) {
    return fns.zeroPad(s.month());
  },
  year: function year(s) {
    var year = s.year();

    if (year > 0) {
      return year;
    }

    year = Math.abs(year);
    return year + ' BC';
  },
  'year-short': function yearShort(s) {
    var year = s.year();

    if (year > 0) {
      return "'".concat(String(s.year()).substr(2, 4));
    }

    year = Math.abs(year);
    return year + ' BC';
  },
  time: function time(s) {
    return s.time();
  },
  'time-24': function time24(s) {
    return "".concat(s.hour24(), ":").concat(fns.zeroPad(s.minute()));
  },
  hour: function hour(s) {
    return s.hour12();
  },
  'hour-24': function hour24(s) {
    return s.hour24();
  },
  minute: function minute(s) {
    return s.minute();
  },
  'minute-pad': function minutePad(s) {
    return fns.zeroPad(s.minute());
  },
  second: function second(s) {
    return s.second();
  },
  'second-pad': function secondPad(s) {
    return fns.zeroPad(s.second());
  },
  ampm: function ampm(s) {
    return s.ampm();
  },
  quarter: function quarter(s) {
    return 'Q' + s.quarter();
  },
  season: function season(s) {
    return s.season();
  },
  era: function era(s) {
    return s.era();
  },
  timezone: function timezone(s) {
    return s.timezone().name;
  },
  offset: function offset(s) {
    return isoOffset(s);
  },
  numeric: function numeric(s) {
    return "".concat(s.year(), "/").concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()));
  },
  // yyyy/mm/dd
  'numeric-us': function numericUs(s) {
    return "".concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()), "/").concat(s.year());
  },
  // mm/dd/yyyy
  'numeric-uk': function numericUk(s) {
    return "".concat(fns.zeroPad(s.date()), "/").concat(fns.zeroPad(s.month() + 1), "/").concat(s.year());
  },
  //dd/mm/yyyy
  'mm/dd': function mmDd(s) {
    return "".concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()));
  },
  //mm/dd
  // ... https://en.wikipedia.org/wiki/ISO_8601 ;(((
  iso: function iso(s) {
    var month = fns.zeroPad(s.month() + 1); //1-based months

    var date = fns.zeroPad(s.date());
    var hour = fns.zeroPad(s.h24());
    var minute = fns.zeroPad(s.minute());
    var second = fns.zeroPad(s.second());
    var ms = fns.zeroPad(s.millisecond(), 3);
    var offset = isoOffset(s);
    return "".concat(s.year(), "-").concat(month, "-").concat(date, "T").concat(hour, ":").concat(minute, ":").concat(second, ".").concat(ms).concat(offset); //2018-03-09T08:50:00.000-05:00
  },
  'iso-short': function isoShort(s) {
    var month = fns.zeroPad(s.month() + 1); //1-based months

    var date = fns.zeroPad(s.date());
    return "".concat(s.year(), "-").concat(month, "-").concat(date); //2017-02-15
  },
  'iso-utc': function isoUtc(s) {
    return new Date(s.epoch).toISOString(); //2017-03-08T19:45:28.367Z
  },
  //i made these up
  'nice': function nice(s) {
    return "".concat(months.short()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.time());
  },
  'nice-year': function niceYear(s) {
    return "".concat(months.short()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.year());
  },
  'nice-day': function niceDay(s) {
    return "".concat(days.short()[s.day()], " ").concat(fns.titleCase(months.short()[s.month()]), " ").concat(fns.ordinal(s.date()));
  },
  'nice-full': function niceFull(s) {
    return "".concat(s.dayName(), " ").concat(fns.titleCase(s.monthName()), " ").concat(fns.ordinal(s.date()), ", ").concat(s.time());
  } //aliases

};
var aliases = {
  'day-name': 'day',
  'month-name': 'month',
  'iso 8601': 'iso',
  'time-h24': 'time-24',
  'time-12': 'time',
  'time-h12': 'time',
  'tz': 'timezone',
  'day-num': 'day-number',
  'month-num': 'month-number',
  'nice-short': 'nice',
  'mdy': 'numeric-us',
  'dmy': 'numeric-uk',
  'ymd': 'numeric',
  'yyyy/mm/dd': 'numeric',
  'mm/dd/yyyy': 'numeric-us',
  'dd/mm/yyyy': 'numeric-us',
  'little-endian': 'numeric-uk',
  'big-endian': 'numeric',
  'day-nice': 'nice-day'
};
Object.keys(aliases).forEach(function (k) {
  return format[k] = format[aliases[k]];
});

var printFormat = function printFormat(s) {
  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  //don't print anything if it's an invalid date
  if (s.isValid() !== true) {
    return '';
  } //support .format('month')


  if (format.hasOwnProperty(str)) {
    var out = String(format[str](s) || '');

    if (str !== 'ampm') {
      out = fns.titleCase(out);
    }

    return out;
  } //support '{hour}:{minute}' notation


  if (str.indexOf('{') !== -1) {
    var sections = /\{(.+?)\}/g;
    str = str.replace(sections, function (_, fmt) {
      fmt = fmt.toLowerCase().trim();

      if (format.hasOwnProperty(fmt)) {
        return String(format[fmt](s) || '');
      }

      return '';
    });
    return str;
  }

  return s.format('iso-short');
};

module.exports = printFormat;

},{"../../data/days":2,"../../data/months":5,"../../fns":8,"./_offset":19}],21:[function(_dereq_,module,exports){
'use strict';

var pad = _dereq_('../../fns').zeroPad; //parse this insane unix-time-templating thing, from the 19th century
//http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns
//time-symbols we support


var mapping = {
  G: function G(s) {
    return s.era();
  },
  GG: function GG(s) {
    return s.era();
  },
  GGG: function GGG(s) {
    return s.era();
  },
  GGGG: function GGGG(s) {
    return s.era() === 'AD' ? 'Anno Domini' : 'Before Christ';
  },
  //year
  y: function y(s) {
    return s.year();
  },
  yy: function yy(s) {
    //last two chars
    return parseInt(String(s.year()).substr(2, 4), 10);
  },
  yyy: function yyy(s) {
    return s.year();
  },
  yyyy: function yyyy(s) {
    return s.year();
  },
  yyyyy: function yyyyy(s) {
    return '0' + s.year();
  },
  // u: (s) => {},//extended non-gregorian years
  //quarter
  Q: function Q(s) {
    return s.quarter();
  },
  QQ: function QQ(s) {
    return s.quarter();
  },
  QQQ: function QQQ(s) {
    return s.quarter();
  },
  QQQQ: function QQQQ(s) {
    return s.quarter();
  },
  //month
  M: function M(s) {
    return s.month() + 1;
  },
  MM: function MM(s) {
    return pad(s.month() + 1);
  },
  MMM: function MMM(s) {
    return s.format('month-short');
  },
  MMMM: function MMMM(s) {
    return s.format('month');
  },
  //week
  w: function w(s) {
    return s.week();
  },
  ww: function ww(s) {
    return pad(s.week());
  },
  //week of month
  // W: (s) => s.week(),
  //date of month
  d: function d(s) {
    return s.date();
  },
  dd: function dd(s) {
    return pad(s.date());
  },
  //date of year
  D: function D(s) {
    return s.dayOfYear();
  },
  DD: function DD(s) {
    return pad(s.dayOfYear());
  },
  DDD: function DDD(s) {
    return pad(s.dayOfYear(), 3);
  },
  // F: (s) => {},//date of week in month
  // g: (s) => {},//modified julian day
  //day
  E: function E(s) {
    return s.format('day-short');
  },
  EE: function EE(s) {
    return s.format('day-short');
  },
  EEE: function EEE(s) {
    return s.format('day-short');
  },
  EEEE: function EEEE(s) {
    return s.format('day');
  },
  EEEEE: function EEEEE(s) {
    return s.format('day')[0];
  },
  e: function e(s) {
    return s.day();
  },
  ee: function ee(s) {
    return s.day();
  },
  eee: function eee(s) {
    return s.format('day-short');
  },
  eeee: function eeee(s) {
    return s.format('day');
  },
  eeeee: function eeeee(s) {
    return s.format('day')[0];
  },
  //am/pm
  a: function a(s) {
    return s.ampm().toUpperCase();
  },
  aa: function aa(s) {
    return s.ampm().toUpperCase();
  },
  aaa: function aaa(s) {
    return s.ampm().toUpperCase();
  },
  aaaa: function aaaa(s) {
    return s.ampm().toUpperCase();
  },
  //hour
  h: function h(s) {
    return s.h12();
  },
  hh: function hh(s) {
    return pad(s.h12());
  },
  H: function H(s) {
    return s.hour();
  },
  HH: function HH(s) {
    return pad(s.hour());
  },
  // j: (s) => {},//weird hour format
  m: function m(s) {
    return s.minute();
  },
  mm: function mm(s) {
    return pad(s.minute());
  },
  s: function s(_s) {
    return _s.second();
  },
  ss: function ss(s) {
    return pad(s.second());
  },
  //milliseconds in the day
  A: function A(s) {
    return s.epoch - s.startOf('day').epoch;
  },
  //timezone
  z: function z(s) {
    return s.timezone().name;
  },
  zz: function zz(s) {
    return s.timezone().name;
  },
  zzz: function zzz(s) {
    return s.timezone().name;
  },
  zzzz: function zzzz(s) {
    return s.timezone().name;
  },
  Z: function Z(s) {
    return s.timezone().current.offset + '00';
  },
  ZZ: function ZZ(s) {
    return s.timezone().current.offset + '00';
  },
  ZZZ: function ZZZ(s) {
    return s.timezone().current.offset + '00';
  },
  ZZZZ: function ZZZZ(s) {
    return s.timezone().current.offset + ':00';
  }
};

var addAlias = function addAlias(char, to, n) {
  var name = char;
  var toName = to;

  for (var i = 0; i < n; i += 1) {
    mapping[name] = mapping[toName];
    name += char;
    toName += to;
  }
};

addAlias('q', 'Q', 4);
addAlias('L', 'M', 4);
addAlias('Y', 'y', 4);
addAlias('c', 'e', 4);
addAlias('k', 'H', 2);
addAlias('K', 'h', 2);
addAlias('S', 's', 2);
addAlias('v', 'z', 4);
addAlias('V', 'Z', 4);

var unixFmt = function unixFmt(s, str) {
  var chars = str.split(''); //combine consecutive chars, like 'yyyy' as one.

  var arr = [chars[0]];
  var quoteOn = false;

  for (var i = 1; i < chars.length; i += 1) {
    //support quoted substrings
    if (chars[i] === "'") {
      quoteOn = !quoteOn; //support '', meaning one tick

      if (quoteOn === true && chars[i + 1] && chars[i + 1] === "'") {
        quoteOn = true;
      } else {
        continue;
      }
    } //merge it with the last one


    if (quoteOn === true || chars[i] === arr[arr.length - 1][0]) {
      arr[arr.length - 1] += chars[i];
    } else {
      arr.push(chars[i]);
    }
  }

  return arr.reduce(function (txt, c) {
    if (mapping[c] !== undefined) {
      txt += mapping[c](s) || '';
    } else {
      txt += c;
    }

    return txt;
  }, '');
};

module.exports = unixFmt;

},{"../../fns":8}],22:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns');

var days = _dereq_('../data/days');

var months = _dereq_('../data/months');

var addMethods = function addMethods(SpaceTime) {
  var methods = {
    i18n: function i18n(data) {
      if (!fns.isObject(data) || !fns.isObject(data.days) || !fns.isObject(data.months) || !fns.isArray(data.days.short) || !fns.isArray(data.days.long) || !fns.isArray(data.months.short) || !fns.isArray(data.months.long)) {
        throw new Error('Invalid i18n payload passed.');
      }

      days.set(data.days);
      months.set(data.months);
    }
  }; //hook them into proto

  Object.keys(methods).forEach(function (k) {
    SpaceTime.prototype[k] = methods[k];
  });
};

module.exports = addMethods;

},{"../data/days":2,"../data/months":5,"../fns":8}],23:[function(_dereq_,module,exports){
'use strict'; //round to either current, or +1 of this unit

var nearest = function nearest(s, unit) {
  unit = unit.toLowerCase();
  unit = unit.replace(/s$/, ''); //singular form...

  var prog = s.progress();

  if (prog[unit] !== undefined) {
    if (prog[unit] > 0.5) {
      s = s.add(1, unit);
    }

    s = s.startOf(unit);
  } else if (s.silent === false) {
    console.warn("no known unit '" + unit + "'");
  }

  return s;
};

module.exports = nearest;

},{}],24:[function(_dereq_,module,exports){
'use strict'; //how far it is along, from 0-1

var progress = function progress(s) {
  var units = ['year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute'];
  var obj = {};
  units.forEach(function (k) {
    var start = s.clone().startOf(k);
    var end = s.clone().endOf(k);
    var duration = end.epoch - start.epoch;
    var percent = (s.epoch - start.epoch) / duration;
    obj[k] = parseFloat(percent.toFixed(2));
  });
  return obj;
};

module.exports = progress;

},{}],25:[function(_dereq_,module,exports){
'use strict';

var quarters = _dereq_('../../data/quarters');

var seasons = _dereq_('../../data/seasons');

var set = _dereq_('../set/set');

var fns = _dereq_('../../fns'); //destructive setters change the seconds, milliseconds, etc
//- and not just the unit they're setting


var clearMinutes = function clearMinutes(s) {
  s = s.minute(0);
  s = s.second(0);
  s = s.millisecond(1);
  return s;
};

module.exports = {
  //some ambiguity here with 12/24h
  time: function time(str) {
    if (str !== undefined) {
      var s = this.clone();
      s.epoch = set.time(s, str);
      return s;
    }

    return "".concat(this.h12(), ":").concat(fns.zeroPad(this.minute())).concat(this.ampm());
  },
  //since the start of the year
  week: function week(num) {
    if (num !== undefined) {
      var s = this.clone();
      s = s.month(0);
      s = s.date(1);
      s = s.day('monday');
      s = clearMinutes(s); //don't go into last-year

      if (s.monthName() === 'december') {
        s = s.add(1, 'week');
      }

      num -= 1; //1-based

      s = s.add(num, 'weeks');
      return s;
    } //find-out which week it is


    var tmp = this.clone();
    tmp = tmp.month(0);
    tmp = tmp.date(1);
    tmp = clearMinutes(tmp);
    tmp = tmp.day('monday'); //don't go into last-year

    if (tmp.monthName() === 'december') {
      tmp = tmp.add(1, 'week');
    }

    var thisOne = this.epoch; //if the week technically hasn't started yet

    if (tmp.epoch > thisOne) {
      return 1;
    }

    for (var i = 0; i < 52; i++) {
      if (tmp.epoch > thisOne) {
        return i;
      }

      tmp = tmp.add(1, 'week');
    }

    return 52;
  },
  quarter: function quarter(num) {
    if (num !== undefined) {
      if (typeof num === 'string') {
        num = num.replace(/^q/i, '');
        num = parseInt(num, 10);
      }

      if (quarters[num]) {
        var s = this.clone();
        var _month = quarters[num][0];
        s = s.month(_month);
        s = s.date(1);
        s = s.startOf('day');
        return s;
      }
    }

    var month = this.d.getMonth();

    for (var i = 1; i < quarters.length; i++) {
      if (month < quarters[i][0]) {
        return i - 1;
      }
    }

    return 4;
  },
  //'3:30' is 3.5
  hourFloat: function hourFloat(num) {
    if (num !== undefined) {
      var s = this.clone();

      var _minute = num % 1;

      _minute = _minute * 60;

      var _hour = parseInt(num, 10);

      s.epoch = set.hours(s, _hour);
      s.epoch = set.minutes(s, _minute);
      return s;
    }

    var d = this.d;
    var hour = d.getHours();
    var minute = d.getMinutes();
    minute = minute / 60;
    return hour + minute;
  },
  season: function season(input) {
    var hem = 'north';

    if (this.hemisphere() === 'South') {
      hem = 'south';
    }

    if (input !== undefined) {
      var s = this.clone();

      for (var i = 0; i < seasons[hem].length; i++) {
        if (input === seasons[hem][i][0]) {
          s = s.month(seasons[hem][i][1]);
          s = s.date(1);
          s = s.startOf('day');
        }
      }

      return s;
    }

    var month = this.d.getMonth();

    for (var _i = 0; _i < seasons[hem].length - 1; _i++) {
      if (month >= seasons[hem][_i][1] && month < seasons[hem][_i + 1][1]) {
        return seasons[hem][_i][0];
      }
    }

    return 'winter';
  }
};

},{"../../data/quarters":6,"../../data/seasons":7,"../../fns":8,"../set/set":30}],26:[function(_dereq_,module,exports){
'use strict';

var normal = _dereq_('./normal');

var destructive = _dereq_('./destructive');

var tricky = _dereq_('./tricky');

var addMethods = function addMethods(Space) {
  //hook the methods into prototype
  Object.keys(normal).forEach(function (k) {
    Space.prototype[k] = normal[k];
  });
  Object.keys(destructive).forEach(function (k) {
    Space.prototype[k] = destructive[k];
  });
  Object.keys(tricky).forEach(function (k) {
    Space.prototype[k] = tricky[k];
  });
};

module.exports = addMethods;

},{"./destructive":25,"./normal":27,"./tricky":28}],27:[function(_dereq_,module,exports){
'use strict';

var set = _dereq_('../set/set');

var walkTo = _dereq_('../set/walk'); //the most basic get/set methods


var methods = {
  millisecond: function millisecond(num) {
    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.milliseconds(s, num);
      return s;
    }

    return this.d.getMilliseconds();
  },
  second: function second(num) {
    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.seconds(s, num);
      return s;
    }

    return this.d.getSeconds();
  },
  minute: function minute(num) {
    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.minutes(s, num);
      return s;
    }

    return this.d.getMinutes();
  },
  hour: function hour(num) {
    var d = this.d;

    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.hours(s, num);
      walkTo(s, {
        month: this.month(),
        date: this.date(),
        hour: num
      });
      return s;
    }

    return d.getHours();
  },
  hour12: function hour12(str) {
    var d = this.d;

    if (str !== undefined) {
      var s = this.clone();
      str = '' + str;
      var m = str.match(/^([0-9]+)(am|pm)$/);

      if (m) {
        var hour = parseInt(m[1], 10);

        if (m[2] === 'pm') {
          hour += 12;
        }

        s.epoch = set.hours(s, hour);
      }

      return s;
    } //get the hour


    var hour12 = d.getHours();

    if (hour12 > 12) {
      hour12 = hour12 - 12;
    }

    if (hour12 === 0) {
      hour12 = 12;
    }

    return hour12;
  },
  date: function date(num) {
    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.date(s, num);
      return s;
    }

    return this.d.getDate();
  },
  month: function month(input) {
    if (input !== undefined) {
      var s = this.clone();
      s.epoch = set.month(s, input);
      return s;
    }

    return this.d.getMonth();
  },
  year: function year(num) {
    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.year(s, num);
      return s;
    }

    return this.d.getFullYear();
  },
  iso: function iso(num) {
    if (num !== undefined) {
      return this.set(num);
    }

    return this.format('iso');
  },
  dayTime: function dayTime(str) {
    if (str !== undefined) {
      var times = {
        morning: '7:00am',
        breakfast: '7:00am',
        noon: '12:00am',
        lunch: '12:00pm',
        afternoon: '2:00pm',
        evening: '6:00pm',
        dinner: '6:00pm',
        night: '11:00pm',
        midnight: '23:59pm'
      };
      var s = this.clone();
      str = str || '';
      str = str.toLowerCase();

      if (times.hasOwnProperty(str) === true) {
        s = s.time(times[str]);
      }

      return s;
    }

    var h = this.hour();

    if (h < 6) {
      return 'night';
    }

    if (h < 12) {
      //until noon
      return 'morning';
    }

    if (h < 17) {
      //until 5pm
      return 'afternoon';
    }

    if (h < 22) {
      //until 10pm
      return 'evening';
    }

    return 'night';
  },
  dayOfYear: function dayOfYear(num) {
    if (num !== undefined) {
      var s = this.clone();
      s.epoch = set.dayOfYear(s, num);
      return s;
    } //days since newyears - jan 1st is 1, jan 2nd is 2...


    var sum = 0;
    var month = this.d.getMonth();
    var tmp; //count the num days in each month

    for (var i = 1; i <= month; i++) {
      tmp = new Date();
      tmp.setDate(1);
      tmp.setYear(this.d.getFullYear()); //the year matters, because leap-years

      tmp.setHours(1);
      tmp.setMinutes(1);
      tmp.setMonth(i);
      tmp.setHours(-2); //the last day of the month

      sum += tmp.getDate();
    }

    return sum + this.d.getDate();
  },
  //bc/ad years
  era: function era(str) {
    if (str !== undefined) {
      var s = this.clone();
      str = str.toLowerCase(); //TODO: there is no year-0AD i think. may have off-by-1 error here

      var year = s.d.getFullYear(); //make '1992' into 1992bc..

      if (str === 'bc' && year > 0) {
        s.epoch = set.year(s, year * -1);
      } //make '1992bc' into '1992'


      if (str === 'ad' && year < 0) {
        s.epoch = set.year(s, year * -1);
      }

      return s;
    }

    if (this.d.getFullYear() < 0) {
      return 'BC';
    }

    return 'AD';
  },
  //alias of 'since' but opposite - like moment.js
  from: function from(d) {
    d = this.clone().set(d);
    return d.since(this);
  },
  fromNow: function fromNow() {
    var d = this.clone().set(Date.now());
    return d.since(this);
  }
}; //aliases

methods.milliseconds = methods.millisecond;
methods.seconds = methods.second;
methods.minutes = methods.minute;
methods.hours = methods.hour;
methods.hour24 = methods.hour;
methods.h12 = methods.hour12;
methods.h24 = methods.hour24;
methods.days = methods.day;
module.exports = methods;

},{"../set/set":30,"../set/walk":31}],28:[function(_dereq_,module,exports){
'use strict';

var days = _dereq_('../../data/days');

var months = _dereq_('../../data/months');

var walkTo = _dereq_('../set/walk'); //non-destructive getters/setters with fancy moves to do


module.exports = {
  //like 'wednesday' (hard!)
  day: function day(input) {
    if (input === undefined) {
      return this.d.getDay();
    }

    var original = this.clone();
    var want = input; // accept 'wednesday'

    if (typeof input === 'string') {
      input = input.toLowerCase();
      want = days.short().indexOf(input);

      if (want === -1) {
        want = days.long().indexOf(input);
      }
    } //move approx


    var day = this.d.getDay();
    var diff = day - want;
    var s = this.subtract(diff * 24, 'hours'); //tighten it back up

    walkTo(s, {
      hour: original.hour(),
      minute: original.minute(),
      second: original.second()
    });
    return s;
  },
  ampm: function ampm(input) {
    var which = 'am';
    var hour = this.hour();

    if (hour >= 12) {
      which = 'pm';
    }

    if (input === undefined) {
      return which;
    }

    var s = this.clone();

    if (input === which) {
      return s;
    }

    if (s === 'am') {
      s = s.subtract(12, 'hours');
    } else {
      s = s.add(12, 'hours');
    }

    return s;
  },
  //these are helpful name-wrappers
  dayName: function dayName(input) {
    if (input === undefined) {
      return days.long()[this.day()];
    }

    var s = this.clone();
    s = s.day(input);
    return s;
  },
  monthName: function monthName(input) {
    if (input === undefined) {
      return months.long()[this.month()];
    }

    var s = this.clone();
    s = s.month(input);
    return s;
  }
};

},{"../../data/days":2,"../../data/months":5,"../set/walk":31}],29:[function(_dereq_,module,exports){
'use strict'; //make a string, for easy comparison between dates

var print = {
  millisecond: function millisecond(s) {
    return s.epoch;
  },
  second: function second(s) {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute(), s.second()].join('-');
  },
  minute: function minute(s) {
    return [s.year(), s.month(), s.date(), s.hour(), s.minute()].join('-');
  },
  hour: function hour(s) {
    return [s.year(), s.month(), s.date(), s.hour()].join('-');
  },
  day: function day(s) {
    return [s.year(), s.month(), s.date()].join('-');
  },
  week: function week(s) {
    return [s.year(), s.week()].join('-');
  },
  month: function month(s) {
    return [s.year(), s.month()].join('-');
  },
  quarter: function quarter(s) {
    return [s.year(), s.quarter()].join('-');
  },
  year: function year(s) {
    return s.year();
  }
};
print.date = print.day;

var addMethods = function addMethods(SpaceTime) {
  SpaceTime.prototype.isSame = function (b, unit) {
    var a = this;

    if (!unit) {
      return null;
    }

    if (typeof b === 'string' || typeof b === 'number') {
      b = new SpaceTime(b, this.timezone.name);
    } //support 'seconds' aswell as 'second'


    unit = unit.replace(/s$/, '');

    if (print[unit]) {
      return print[unit](a) === print[unit](b);
    }

    return null;
  };
};

module.exports = addMethods;

},{}],30:[function(_dereq_,module,exports){
'use strict'; // javascript setX methods like setDate() can't be used because of the local bias
//these methods wrap around them.

var ms = _dereq_('../../data/milliseconds');

var months = _dereq_('../../data/months');

var monthLength = _dereq_('../../data/monthLengths');

var walkTo = _dereq_('./walk');

var validate = function validate(n) {
  //handle number as a string
  if (typeof n === 'string') {
    n = parseInt(n, 10);
  }

  return n;
};

var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']; //reduce hostile micro-changes when moving dates by millisecond

var confirm = function confirm(s, tmp, unit) {
  var n = order.indexOf(unit);
  var arr = order.slice(n, order.length);

  for (var i = 0; i < arr.length; i++) {
    var want = tmp[arr[i]]();
    s[arr[i]](want);
  }

  return s;
};

module.exports = {
  milliseconds: function milliseconds(s, n) {
    n = validate(n);
    var current = s.millisecond();
    var diff = current - n; //milliseconds to shift by

    return s.epoch - diff;
  },
  seconds: function seconds(s, n) {
    n = validate(n);
    var diff = s.second() - n;
    var shift = diff * ms.second;
    return s.epoch - shift;
  },
  minutes: function minutes(s, n) {
    n = validate(n);
    var old = s.clone();
    var diff = s.minute() - n;
    var shift = diff * ms.minute;
    s.epoch -= shift;
    confirm(s, old, 'second');
    return s.epoch;
  },
  hours: function hours(s, n) {
    n = validate(n);
    var old = s.clone();
    var diff = s.hour() - n;
    var shift = diff * ms.hour;
    s.epoch -= shift;
    confirm(s, old, 'minute');
    return s.epoch;
  },
  //support setting time by '4:25pm' - this isn't very-well developed..
  time: function time(s, str) {
    var m = str.match(/([0-9]{1,2}):([0-9]{1,2})(am|pm)?/);

    if (!m) {
      //fallback to support just '2am'
      m = str.match(/([0-9]{1,2})(am|pm)/);

      if (!m) {
        return s.epoch;
      }

      m.splice(2, 0, '0'); //add implicit 0 minutes
    }

    var h24 = false;
    var hour = parseInt(m[1], 10);
    var minute = parseInt(m[2], 10);

    if (hour > 12) {
      h24 = true;
    } //make the hour into proper 24h time


    if (h24 === false) {
      if (m[3] === 'am' && hour === 12) {
        //12am is midnight
        hour = 0;
      }

      if (m[3] === 'pm' && hour < 12) {
        //12pm is noon
        hour += 12;
      }
    }

    s = s.hour(hour);
    s = s.minute(minute);
    s = s.second(0);
    s = s.millisecond(0);
    return s.epoch;
  },
  date: function date(s, n) {
    n = validate(n);
    walkTo(s, {
      date: n
    });
    return s.epoch;
  },
  //this one's tricky
  month: function month(s, n) {
    if (typeof n === 'string') {
      n = months.mapping()[n.toLowerCase()];
    }

    n = validate(n);
    var date = s.date(); //there's no 30th of february, etc.

    if (date > monthLength[n]) {
      //make it as close as we can..
      date = monthLength[n];
    }

    walkTo(s, {
      month: n,
      date: date
    });
    return s.epoch;
  },
  year: function year(s, n) {
    n = validate(n);
    walkTo(s, {
      year: n
    });
    return s.epoch;
  },
  dayOfYear: function dayOfYear(s, n) {
    n = validate(n);
    var old = s.clone();
    var diff = n - s.dayOfYear();
    var shift = diff * ms.day;
    s.epoch += shift;
    confirm(s, old, 'hour');
    return s.epoch;
  }
};

},{"../../data/milliseconds":3,"../../data/monthLengths":4,"../../data/months":5,"./walk":31}],31:[function(_dereq_,module,exports){
'use strict';

var ms = _dereq_('../../data/milliseconds'); //basically, step-forward/backward until js Date object says we're there.


var walk = function walk(s, n, fn, unit, previous) {
  var current = s.d[fn]();

  if (current === n) {
    return; //already there
  }

  var startUnit = previous === null ? null : s.d[previous]();
  var original = s.epoch; //try to get it as close as we can

  var diff = n - current;
  s.epoch += ms[unit] * diff; //DST edge-case: if we are going many days, be a little conservative

  if (unit === 'day' && Math.abs(diff) > 28) {
    //but don't push it over a month
    if (n < 28) {
      s.epoch += ms.hour;
    }
  } //repair it if we've gone too far or something
  //(go by half-steps, just in case)


  var halfStep = ms[unit] / 2;

  while (s.d[fn]() < n) {
    s.epoch += halfStep;
  }

  while (s.d[fn]() > n) {
    s.epoch -= halfStep;
  } //oops, did we change previous unit? revert it.


  if (previous !== null && startUnit !== s.d[previous]()) {
    console.warn('spacetime warning: missed setting ' + unit);
    s.epoch = original;
  }
}; //find the desired date by a increment/check while loop


var units = {
  year: {
    valid: function valid(n) {
      return n > -4000 && n < 4000;
    },
    walkTo: function walkTo(s, n) {
      return walk(s, n, 'getFullYear', 'year', null);
    }
  },
  month: {
    valid: function valid(n) {
      return n >= 0 && n <= 11;
    },
    walkTo: function walkTo(s, n) {
      var d = s.d;
      var current = d.getMonth();
      var original = s.epoch;
      var startUnit = d.getYear();

      if (current === n) {
        return;
      } //try to get it as close as we can..


      var diff = n - current;
      s.epoch += ms.day * (diff * 28); //special case
      //oops, did we change the year? revert it.

      if (startUnit !== s.d.getYear()) {
        s.epoch = original;
      } //incriment by day


      while (s.d.getMonth() < n) {
        s.epoch += ms.day;
      }

      while (s.d.getMonth() > n) {
        s.epoch -= ms.day;
      }
    }
  },
  date: {
    valid: function valid(n) {
      return n > 0 && n <= 31;
    },
    walkTo: function walkTo(s, n) {
      return walk(s, n, 'getDate', 'day', 'getMonth');
    }
  },
  hour: {
    valid: function valid(n) {
      return n >= 0 && n < 24;
    },
    walkTo: function walkTo(s, n) {
      return walk(s, n, 'getHours', 'hour', 'getDate');
    }
  },
  minute: {
    valid: function valid(n) {
      return n >= 0 && n < 60;
    },
    walkTo: function walkTo(s, n) {
      return walk(s, n, 'getMinutes', 'minute', 'getHours');
    }
  },
  second: {
    valid: function valid(n) {
      return n >= 0 && n < 60;
    },
    walkTo: function walkTo(s, n) {
      //do this one directly
      s.epoch = s.seconds(n).epoch;
    }
  },
  millisecond: {
    valid: function valid(n) {
      return n >= 0 && n < 1000;
    },
    walkTo: function walkTo(s, n) {
      //do this one directly
      s.epoch = s.milliseconds(n).epoch;
    }
  }
};

var walkTo = function walkTo(s, wants) {
  var keys = Object.keys(units);
  var old = s.clone();

  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var n = wants[k];

    if (n === undefined) {
      n = old[k]();
    }

    if (typeof n === 'string') {
      n = parseInt(n, 10);
    } //make-sure it's valid


    if (!units[k].valid(n)) {
      s.epoch = null;

      if (s.silent === false) {
        console.warn('invalid ' + k + ': ' + n);
      }

      return;
    } // console.log(k, n)


    units[k].walkTo(s, n);
  }

  return;
};

module.exports = walkTo;

},{"../../data/milliseconds":3}],32:[function(_dereq_,module,exports){
'use strict';

var fns = _dereq_('../fns'); //by spencermountain + Shaun Grady
//our conceptual 'break-points' for each unit


var qualifiers = {
  months: {
    almost: 10,
    over: 4
  },
  days: {
    almost: 25,
    over: 10
  },
  hours: {
    almost: 20,
    over: 8
  },
  minutes: {
    almost: 50,
    over: 20
  },
  seconds: {
    almost: 50,
    over: 20
  } //get number of hours/minutes... between the two dates

};

function getDiff(a, b) {
  var isBefore = a.isBefore(b);
  var later = isBefore ? b : a;
  var earlier = isBefore ? a : b;
  earlier = earlier.clone();
  var diff = {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  Object.keys(diff).forEach(function (unit) {
    if (earlier.isSame(later, unit)) {
      return;
    }

    var max = earlier.diff(later, unit);
    earlier = earlier.add(max, unit); //did we go one too far?

    if (earlier.epoch > later.epoch + 10) {
      //(fudge this calc by 10 milliseconds)
      earlier = earlier.subtract(1, unit);
      max -= 1;
    }

    diff[unit] = max;
  }); //reverse it

  if (isBefore) {
    Object.keys(diff).forEach(function (u) {
      if (diff[u] !== 0) {
        diff[u] *= -1;
      }
    });
  }

  return diff;
} // Expects a plural unit arg


function pluralize(value, unit) {
  if (value === 1) {
    unit = unit.slice(0, -1);
  }

  return value + ' ' + unit;
} //create the human-readable diff between the two dates


var since = function since(start, end) {
  end = fns.beADate(end, start);
  var diff = getDiff(start, end);
  var isNow = Object.keys(diff).every(function (u) {
    return !diff[u];
  });

  if (isNow === true) {
    return {
      diff: diff,
      rounded: 'now',
      qualified: 'now',
      precise: 'now'
    };
  }

  var rounded;
  var qualified;
  var precise;
  var englishValues = []; //go through each value and create its text-representation

  Object.keys(diff).forEach(function (unit, i, units) {
    var value = Math.abs(diff[unit]);

    if (value === 0) {
      return;
    }

    var englishValue = pluralize(value, unit);
    englishValues.push(englishValue);

    if (!rounded) {
      rounded = qualified = englishValue;

      if (i > 4) {
        return;
      } //is it a 'almost' something, etc?


      var nextUnit = units[i + 1];
      var nextValue = Math.abs(diff[nextUnit]);

      if (nextValue > qualifiers[nextUnit].almost) {
        rounded = pluralize(value + 1, unit);
        qualified = 'almost ' + rounded;
      } else if (nextValue > qualifiers[nextUnit].over) qualified = 'over ' + englishValue;
    }
  }); //make them into a string

  precise = englishValues.splice(0, 2).join(', '); //handle before/after logic

  if (start.isAfter(end) === true) {
    rounded += ' ago';
    qualified += ' ago';
    precise += ' ago';
  } else {
    rounded = 'in ' + rounded;
    qualified = 'in ' + qualified;
    precise = 'in ' + precise;
  }

  return {
    diff: diff,
    rounded: rounded,
    qualified: qualified,
    precise: precise
  };
};

module.exports = since;

},{"../fns":8}],33:[function(_dereq_,module,exports){
'use strict';

var seasons = _dereq_('../data/seasons');

var quarters = _dereq_('../data/quarters');

var walkTo = _dereq_('./set/walk');

var units = {
  minute: function minute(s) {
    walkTo(s, {
      second: 0,
      millisecond: 0
    });
    return s;
  },
  quarterHour: function quarterHour(s) {
    var minute = s.minutes();

    if (minute >= 45) {
      s = s.minutes(45);
    } else if (minute >= 30) {
      s = s.minutes(30);
    } else if (minute >= 15) {
      s = s.minutes(15);
    } else {
      s = s.minutes(0);
    }

    walkTo(s, {
      second: 0,
      millisecond: 0
    });
    return s;
  },
  hour: function hour(s) {
    walkTo(s, {
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  day: function day(s) {
    walkTo(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  week: function week(s) {
    var original = s.clone();
    s = s.day(1); //monday

    if (s.isAfter(original)) {
      s = s.subtract(1, 'week');
    }

    walkTo(s, {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  month: function month(s) {
    walkTo(s, {
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  quarter: function quarter(s) {
    var q = s.quarter();

    if (quarters[q]) {
      walkTo(s, {
        month: quarters[q][0],
        date: quarters[q][1],
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
    }

    return s;
  },
  season: function season(s) {
    var current = s.season();
    var hem = 'north';

    if (s.hemisphere() === 'South') {
      hem = 'south';
    }

    for (var i = 0; i < seasons[hem].length; i++) {
      if (seasons[hem][i][0] === current) {
        //winter goes between years
        var year = s.year();

        if (current === 'winter' && s.month() < 3) {
          year -= 1;
        }

        walkTo(s, {
          year: year,
          month: seasons[hem][i][1],
          date: seasons[hem][i][2],
          hour: 0,
          minute: 0,
          second: 0,
          millisecond: 0
        });
        return s;
      }
    }

    return s;
  },
  year: function year(s) {
    walkTo(s, {
      month: 0,
      date: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    return s;
  },
  decade: function decade(s) {
    s = s.startOf('year');
    var year = s.year();
    var decade = parseInt(year / 10, 10) * 10;
    s = s.year(decade);
    return s;
  },
  century: function century(s) {
    s = s.startOf('year');
    var year = s.year();
    var decade = parseInt(year / 100, 10) * 100;
    s = s.year(decade);
    return s;
  }
};
units.date = units.day;

var startOf = function startOf(a, unit) {
  var s = a.clone();

  if (units[unit]) {
    return units[unit](s);
  }

  if (unit === 'summer' || unit === 'winter') {
    s = s.season(unit);
    return units.season(s);
  }

  return s;
}; //piggy-backs off startOf


var endOf = function endOf(a, unit) {
  var s = a.clone();

  if (units[unit]) {
    s = units[unit](s);
    s = s.add(1, unit);
    s = s.subtract(1, 'milliseconds');
    return s;
  }

  return s;
};

module.exports = {
  startOf: startOf,
  endOf: endOf
};

},{"../data/quarters":6,"../data/seasons":7,"./set/walk":31}],34:[function(_dereq_,module,exports){
'use strict';

var quickOffset = _dereq_('./timezone/quick');

var findTz = _dereq_('./timezone/find');

var handleInput = _dereq_('./input');

var methods = _dereq_('./methods');

var timezones = _dereq_('../zonefile/unpack'); //fake timezone-support, for fakers (es5 class)


var SpaceTime = function SpaceTime(input, tz, options) {
  options = options || {}; //the holy moment

  this.epoch = null; //the shift for the given timezone

  this.tz = findTz(tz, timezones); //whether to output warnings to console

  this.silent = options.silent || true; //add getter/setters

  Object.defineProperty(this, 'd', {
    //return a js date object
    get: function get() {
      var offset = quickOffset(this); //every computer is somewhere- get this computer's built-in offset

      var bias = new Date(this.epoch).getTimezoneOffset() || 0; //movement

      var shift = bias + offset * 60; //in minutes

      shift = shift * 60 * 1000; //in ms
      //remove this computer's offset

      var epoch = this.epoch + shift;
      var d = new Date(epoch);
      return d;
    }
  }); //add this data on the object, to allow adding new timezones

  Object.defineProperty(this, 'timezones', {
    get: function get() {
      return timezones;
    },
    set: function set(obj) {
      timezones = obj;
      return obj;
    }
  }); //parse the various formats

  if (input !== undefined || input === null) {
    var tmp = handleInput(this, input, tz, options);
    this.epoch = tmp.epoch;
  }
}; //(add instance methods to prototype)


Object.keys(methods).forEach(function (k) {
  SpaceTime.prototype[k] = methods[k];
}); // ¯\_(ツ)_/¯

SpaceTime.prototype.clone = function () {
  return new SpaceTime(this.epoch, this.tz, {
    silent: this.silent
  });
}; //append more methods


_dereq_('./methods/query')(SpaceTime);

_dereq_('./methods/add')(SpaceTime);

_dereq_('./methods/same')(SpaceTime);

_dereq_('./methods/compare')(SpaceTime);

_dereq_('./methods/i18n')(SpaceTime);

module.exports = SpaceTime;

},{"../zonefile/unpack":45,"./input":11,"./methods":15,"./methods/add":16,"./methods/compare":17,"./methods/i18n":22,"./methods/query":26,"./methods/same":29,"./timezone/find":36,"./timezone/quick":39}],35:[function(_dereq_,module,exports){
"use strict";

var informal = _dereq_('../../zonefile/informal').informal; //these timezone abbreviations are used aggressively in other places
//if tz doesn't have an abbreviation, and is in the same offset...
//these are pretty subjective. i just made them up.


var greedy_north = {
  '-8': 'america/anchorage',
  '-7': 'america/los_angeles',
  '-6': 'america/denver',
  '-5': 'america/chicago',
  '-4': 'america/new_york',
  '-3': 'america/halifax',
  '0': 'etc/gmt',
  '1': 'europe/lisbon',
  '2': 'europe/berlin',
  // '3': 'europe/riga',
  // '3': 'europe/moscow',
  '8': 'asia/shanghai'
};
var greedy_south = {
  '-3': 'america/sao_paulo',
  '0': 'etc/gmt',
  '1': 'africa/lagos',
  // '2': 'africa/khartoum',//central africa
  '2': 'africa/johannesburg',
  //south africa
  '3': 'africa/nairobi',
  '10': 'australia/brisbane',
  '12': 'pacific/auckland'
};
var british = {
  'europe/belfast': true,
  'europe/dublin': true,
  'europe/guernsey': true,
  'europe/jersey': true
};

var handleSpecial = function handleSpecial(tz, offset) {
  if (british.hasOwnProperty(tz)) {
    if (offset === '1') {
      return 'BST';
    }

    return 'GMT';
  }

  return null;
};

var chooseAbbrev = function chooseAbbrev(arr, obj) {
  if (arr[1] && obj.current.isDST === true) {
    return arr[1].toUpperCase();
  }

  if (arr[0]) {
    return arr[0].toUpperCase();
  }

  return null;
}; //


var display = function display(tz, obj) {
  //try a straight-up match
  if (informal.hasOwnProperty(tz)) {
    var abbr = chooseAbbrev(informal[tz], obj);

    if (abbr !== null) {
      return abbr;
    }
  }

  var offset = String(obj.default_offset);
  var special = handleSpecial(tz, offset);

  if (special) {
    return special;
  }

  if (obj.hemisphere === 'North' && greedy_north.hasOwnProperty(offset)) {
    var useTz = greedy_north[offset];
    return chooseAbbrev(informal[useTz], obj) || '';
  }

  if (obj.hemisphere === 'South' && greedy_south.hasOwnProperty(offset)) {
    var _useTz = greedy_south[offset];
    return chooseAbbrev(informal[_useTz], obj) || '';
  }

  return '';
};

module.exports = display;

},{"../../zonefile/informal":44}],36:[function(_dereq_,module,exports){
'use strict';

var tzs = _dereq_('../../zonefile/unpack');

var informal = _dereq_('../../zonefile/informal').lookup;

var guessTz = _dereq_('./guessTz');

var local = guessTz();
var isOffset = /(\-?[0-9]+)h(rs)?/; //add all the city names by themselves

var cities = Object.keys(tzs).reduce(function (h, k) {
  var city = k.split('/')[1];
  city = city.replace(/_/g, ' ');
  h[city] = k;
  return h;
}, {}); //try to match these against iana form

var normalize = function normalize(tz) {
  tz = tz.replace(/ time/g, '');
  tz = tz.replace(/ (standard|daylight|summer)/g, '');
  tz = tz.replace(/\b(east|west|north|south)ern/g, '$1');
  tz = tz.replace(/\b(africa|america|australia)n/g, '$1');
  tz = tz.replace(/\beuropean/g, 'europe');
  tz = tz.replace(/\islands/g, 'island');
  return tz;
}; // try our best to reconcile the timzone to this given string


var lookupTz = function lookupTz(str, zones) {
  if (!str) {
    return local;
  }

  var tz = str.trim();
  var split = str.split('/'); //support long timezones like 'America/Argentina/Rio_Gallegos'

  if (split.length > 2 && zones.hasOwnProperty(tz) === false) {
    tz = split[0] + '/' + split[1];
  }

  tz = tz.toLowerCase();

  if (zones.hasOwnProperty(tz) === true) {
    return tz;
  } //lookup more loosely..


  tz = normalize(tz);

  if (zones.hasOwnProperty(tz) === true) {
    return tz;
  } //try abbrevations and things


  if (informal.hasOwnProperty(tz) === true) {
    return informal[tz];
  } //try city-names


  if (cities.hasOwnProperty(tz) === true) {
    return cities[tz];
  } // //try to parse '-5h'


  var m = tz.match(isOffset);

  if (m !== null) {
    var num = Number(m[1]);
    num = num * -1; //it's opposite!

    num = (num > 0 ? '+' : '') + num;
    var gmt = 'etc/gmt' + num;

    if (zones.hasOwnProperty(gmt)) {
      return gmt;
    }
  }

  console.warn('Cannot find timezone named: \'' + str + '\'');
  return local;
};

module.exports = lookupTz;

},{"../../zonefile/informal":44,"../../zonefile/unpack":45,"./guessTz":37}],37:[function(_dereq_,module,exports){
'use strict'; //find the implicit iana code for this machine.
//safely query the Intl object
//based on - https://bitbucket.org/pellepim/jstimezonedetect/src

var fallbackTZ = 'asia/shanghai'; //
//this Intl object is not supported often, yet

var safeIntl = function safeIntl() {
  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return null;
  }

  var format = Intl.DateTimeFormat();

  if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
    return null;
  }

  var timezone = format.resolvedOptions().timeZone;

  if (!timezone || timezone.indexOf('/') === -1 && timezone === 'UTC') {
    return null;
  }

  return timezone;
};

var guessTz = function guessTz() {
  var timezone = safeIntl();

  if (timezone === null) {
    return fallbackTZ;
  }

  return timezone.toLowerCase();
}; //do it once per computer


module.exports = guessTz;

},{}],38:[function(_dereq_,module,exports){
'use strict'; // const zones = require('../../data');

var findTz = _dereq_('./find');

var inSummerTime = _dereq_('./summerTime');

var display = _dereq_('./display');

var parseDst = function parseDst(dst) {
  if (!dst) {
    return [];
  }

  return dst.split('->');
};

var titleCase = function titleCase(str) {
  str = str[0].toUpperCase() + str.substr(1);
  str = str.replace(/\/gmt/, '/GMT');
  str = str.replace(/[\/_]([a-z])/ig, function (s) {
    return s.toUpperCase();
  });
  return str;
}; //get metadata about this timezone


var timezone = function timezone(s) {
  var zones = s.timezones;
  var tz = s.tz;

  if (zones.hasOwnProperty(tz) === false) {
    tz = findTz(s.tz, zones);
  }

  if (tz === null) {
    if (s.silent === false) {
      console.warn("Warn: could not find given or local timezone - '" + s.tz + "'");
    }

    return {
      current: {
        epochShift: 0
      }
    };
  }

  var found = zones[tz];
  var result = {
    name: titleCase(tz),
    hasDst: Boolean(found.dst),
    default_offset: found.offset,
    //do north-hemisphere version as default (sorry!)
    hemisphere: found.hem === 's' ? 'South' : 'North',
    current: {}
  };

  if (result.hasDst) {
    var arr = parseDst(found.dst);
    result.change = {
      start: arr[0],
      back: arr[1]
    };
  } //find the offsets for summer/winter times
  //(these variable names are north-centric)


  var summer = found.offset; // (july)

  var winter = summer; // (january) assume it's the same for now

  if (result.hasDst === true) {
    if (result.hemisphere === 'North') {
      winter = summer - 1;
    } else {
      //southern hemisphere
      winter = found.offset + 1;
    }
  } //find out which offset to use right now
  //use 'summer' time july-time


  if (result.hasDst === false) {
    result.current.offset = summer;
    result.current.isDST = false;
  } else if (inSummerTime(s.epoch, result.change.start, result.change.back, summer) === true) {
    result.current.offset = summer;
    result.current.isDST = result.hemisphere === 'North'; //dst 'on' in winter in north
  } else {
    //use 'winter' january-time
    result.current.offset = winter;
    result.current.isDST = result.hemisphere === 'South'; //dst 'on' in summer in south
  } //try to find the best name for it..


  result.display = display(tz, result, zones);
  return result;
};

module.exports = timezone;

},{"./display":35,"./find":36,"./summerTime":40}],39:[function(_dereq_,module,exports){
"use strict";

var isSummer = _dereq_('./summerTime'); //


var quickOffset = function quickOffset(s) {
  var zones = s.timezones;
  var obj = zones[s.tz];

  if (obj.dst === undefined) {
    return obj.offset;
  } //get our two possible offsets


  var jul = obj.offset;
  var dec = obj.offset + 1; // assume it's the same for now

  if (obj.hem === 'n') {
    dec = jul - 1;
  }

  var split = obj.dst.split('->');
  var inSummer = isSummer(s.epoch, split[0], split[1], jul);

  if (inSummer === true) {
    return jul;
  }

  return dec;
};

module.exports = quickOffset;

},{"./summerTime":40}],40:[function(_dereq_,module,exports){
'use strict';

var zeroPad = _dereq_('../fns').zeroPad;

var toString = function toString(d) {
  return zeroPad(d.getMonth() + 1) + '/' + zeroPad(d.getDate()) + ':' + zeroPad(d.getHours());
}; // a timezone will begin with a specific offset in january
// then some will switch to something else between november-march


var shouldChange = function shouldChange(epoch, start, end, defaultOffset) {
  //note: this has a cray order-of-operations issue
  //we can't get the date, without knowing the timezone, and vice-versa
  //it's possible that we can miss a dst-change by a few hours.
  var d = new Date(epoch); //(try to mediate this a little?)

  var bias = d.getTimezoneOffset() || 0;
  var shift = bias + defaultOffset * 60; //in minutes

  shift = shift * 60 * 1000; //in ms

  d = new Date(epoch + shift);
  var current = toString(d); //eg. is it after ~november?

  if (current >= start) {
    //eg. is it before ~march~ too?
    if (current < end) {
      return true;
    }
  }

  return false;
};

module.exports = shouldChange;

},{"../fns":8}],41:[function(_dereq_,module,exports){
'use strict';

var Spacetime = _dereq_('./spacetime'); // const timezones = require('../data');


var whereIts = function whereIts(a, b) {
  var start = new Spacetime(null);
  var end = new Spacetime(null);
  start = start.time(a); //if b is undefined, use as 'within one hour'

  if (b) {
    end = end.time(b);
  } else {
    end = start.add(59, 'minutes');
  }

  var startHour = start.hour();
  var endHour = end.hour();
  var tzs = Object.keys(start.timezones).filter(function (tz) {
    if (tz.indexOf('/') === -1) {
      return false;
    }

    var m = new Spacetime(null, tz);
    var hour = m.hour(); //do 'calendar-compare' not real-time-compare

    if (hour >= startHour && hour <= endHour) {
      //test minutes too, if applicable
      if (hour === startHour && m.minute() < start.minute()) {
        return false;
      }

      if (hour === endHour && m.minute() > end.minute()) {
        return false;
      }

      return true;
    }

    return false;
  });
  return tzs;
};

module.exports = whereIts;

},{"./spacetime":34}],42:[function(_dereq_,module,exports){
module.exports={
  "9|s": "2/dili,2/jayapura",
  "9|n": "2/chita,2/khandyga,2/pyongyang,2/seoul,2/tokyo,11/palau",
  "9.5|s|04/01:03->10/07:02": "4/adelaide,4/broken_hill,4/south,4/yancowinna",
  "9.5|s": "4/darwin,4/north",
  "8|s": "12/casey,2/kuala_lumpur,2/makassar,2/singapore,4/perth,4/west",
  "8|n|03/25:03->09/29:23": "2/ulan_bator",
  "8|n": "2/brunei,2/choibalsan,2/chongqing,2/chungking,2/harbin,2/hong_kong,2/irkutsk,2/kuching,2/macao,2/macau,2/manila,2/shanghai,2/taipei,2/ujung_pandang,2/ulaanbaatar",
  "8.75|s": "4/eucla",
  "7|s": "12/davis,2/jakarta,9/christmas",
  "7|n": "2/bangkok,2/barnaul,2/ho_chi_minh,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/pontianak,2/saigon,2/vientiane",
  "6|s": "12/vostok",
  "6|n": "2/almaty,2/bishkek,2/dacca,2/dhaka,2/kashgar,2/omsk,2/qyzylorda,2/thimbu,2/thimphu,2/urumqi,9/chagos",
  "6.5|n": "2/rangoon,9/cocos",
  "5|s": "12/mawson,9/kerguelen",
  "5|n": "2/aqtau,2/aqtobe,2/ashgabat,2/ashkhabad,2/atyrau,2/baku,2/dushanbe,2/karachi,2/oral,2/samarkand,2/tashkent,2/yekaterinburg,9/maldives",
  "5.75|n": "2/kathmandu,2/katmandu",
  "5.5|n": "2/calcutta,2/colombo,2/kolkata",
  "4|s": "9/reunion",
  "4|n": "2/dubai,2/muscat,2/tbilisi,2/yerevan,8/astrakhan,8/samara,8/saratov,8/ulyanovsk,9/mahe,9/mauritius",
  "4.5|n|03/22:00->09/21:24": "2/tehran",
  "4.5|n": "2/kabul",
  "3|s": "12/syowa,9/antananarivo",
  "3|n|03/30:00->10/26:01": "2/amman",
  "3|n|03/30:00->10/25:24": "2/damascus",
  "3|n|03/25:03->10/28:04": "2/nicosia,8/athens,8/bucharest,8/helsinki,8/kiev,8/mariehamn,8/nicosia,8/riga,8/sofia,8/tallinn,8/uzhgorod,8/vilnius,8/zaporozhye",
  "3|n|03/25:02->10/28:03": "8/chisinau,8/tiraspol",
  "3|n|03/25:00->10/27:24": "2/beirut",
  "3|n|03/24:01->10/27:01": "2/gaza,2/hebron",
  "3|n|03/23:02->10/28:02": "2/jerusalem,2/tel_aviv",
  "3|n": "0/addis_ababa,0/asmara,0/asmera,0/dar_es_salaam,0/djibouti,0/juba,0/kampala,0/mogadishu,0/nairobi,2/aden,2/baghdad,2/bahrain,2/istanbul,2/kuwait,2/qatar,2/riyadh,8/istanbul,8/kirov,8/minsk,8/moscow,8/simferopol,8/volgograd,9/comoro,9/mayotte",
  "2|s|03/25:02->10/28:02": "12/troll",
  "2|s": "0/gaborone,0/harare,0/johannesburg,0/lubumbashi,0/lusaka,0/maputo,0/maseru,0/mbabane",
  "2|n|03/25:02->10/28:03": "0/ceuta,arctic/longyearbyen,3/jan_mayen,8/amsterdam,8/andorra,8/belgrade,8/berlin,8/bratislava,8/brussels,8/budapest,8/busingen,8/copenhagen,8/gibraltar,8/ljubljana,8/luxembourg,8/madrid,8/malta,8/monaco,8/oslo,8/paris,8/podgorica,8/prague,8/rome,8/san_marino,8/sarajevo,8/skopje,8/stockholm,8/tirane,8/vaduz,8/vatican,8/vienna,8/warsaw,8/zagreb,8/zurich",
  "2|n": "0/blantyre,0/bujumbura,0/cairo,0/khartoum,0/kigali,0/tripoli,8/kaliningrad",
  "1|s|04/02:01->09/03:03": "0/windhoek",
  "1|s": "0/kinshasa,0/luanda",
  "1|n|07/02:03->10/29:02": "0/casablanca,0/el_aaiun",
  "1|n|03/25:01->10/28:02": "3/canary,3/faeroe,3/faroe,3/madeira,8/belfast,8/dublin,8/guernsey,8/isle_of_man,8/jersey,8/lisbon,8/london",
  "1|n": "0/algiers,0/bangui,0/brazzaville,0/douala,0/lagos,0/libreville,0/malabo,0/ndjamena,0/niamey,0/porto-novo,0/tunis",
  "14|n": "11/kiritimati",
  "13|s|04/01:04->09/30:03": "11/apia",
  "13|s|01/15:02->11/05:03": "11/tongatapu",
  "13|n": "11/enderbury,11/fakaofo",
  "12|s|04/01:03->09/30:02": "12/mcmurdo,12/south_pole,11/auckland",
  "12|s|01/14:03->11/04:02": "11/fiji",
  "12|n": "2/anadyr,2/kamchatka,2/srednekolymsk,11/funafuti,11/kwajalein,11/majuro,11/nauru,11/tarawa,11/wake,11/wallis",
  "12.75|s|04/07:03->09/29:02": "11/chatham",
  "11|s": "12/macquarie,11/bougainville",
  "11|n": "2/magadan,2/sakhalin,11/efate,11/guadalcanal,11/kosrae,11/noumea,11/pohnpei,11/ponape",
  "11.5|n": "11/norfolk",
  "10|s|04/01:03->10/07:02": "4/act,4/canberra,4/currie,4/hobart,4/melbourne,4/nsw,4/sydney,4/tasmania,4/victoria",
  "10|s": "12/dumontdurville,4/brisbane,4/lindeman,4/queensland",
  "10|n": "2/ust-nera,2/vladivostok,2/yakutsk,11/chuuk,11/guam,11/port_moresby,11/saipan,11/truk,11/yap",
  "10.5|s|04/01:01->10/07:02": "4/lhi,4/lord_howe",
  "0|n|03/25:00->10/28:01": "1/scoresbysund,3/azores",
  "0|n": "0/abidjan,0/accra,0/bamako,0/banjul,0/bissau,0/conakry,0/dakar,0/freetown,0/lome,0/monrovia,0/nouakchott,0/ouagadougou,0/sao_tome,0/timbuktu,1/danmarkshavn,3/reykjavik,3/st_helena,13/gmt,13/gmt+0,13/gmt-0,13/gmt0,13/greenwich,13/utc,13/universal,13/zulu",
  "-9|n|03/11:02->11/04:02": "1/adak,1/atka",
  "-9|n": "11/gambier",
  "-9.5|n": "11/marquesas",
  "-8|n|03/11:02->11/04:02": "1/anchorage,1/juneau,1/metlakatla,1/nome,1/sitka,1/yakutat",
  "-8|n": "11/pitcairn",
  "-7|n|03/11:02->11/04:02": "1/dawson,1/ensenada,1/los_angeles,1/santa_isabel,1/tijuana,1/vancouver,1/whitehorse,6/pacific,6/yukon,10/bajanorte",
  "-7|n": "1/creston,1/dawson_creek,1/hermosillo,1/phoenix",
  "-6|s|05/12:22->08/11:22": "7/easterisland,11/easter",
  "-6|n|04/01:02->10/28:02": "1/chihuahua,1/mazatlan,10/bajasur",
  "-6|n|03/11:02->11/04:02": "1/boise,1/cambridge_bay,1/denver,1/edmonton,1/inuvik,1/ojinaga,1/shiprock,1/yellowknife,6/mountain",
  "-6|n": "1/belize,1/costa_rica,1/el_salvador,1/guatemala,1/managua,1/regina,1/swift_current,1/tegucigalpa,6/east-saskatchewan,6/saskatchewan,11/galapagos",
  "-5|s": "1/lima,1/rio_branco,5/acre",
  "-5|n|04/01:02->10/28:02": "1/bahia_banderas,1/merida,1/mexico_city,1/monterrey,10/general",
  "-5|n|03/12:03->11/05:01": "1/north_dakota",
  "-5|n|03/11:02->11/04:02": "1/chicago,1/knox_in,1/matamoros,1/menominee,1/rainy_river,1/rankin_inlet,1/resolute,1/winnipeg,6/central",
  "-5|n": "1/atikokan,1/bogota,1/cancun,1/cayman,1/coral_harbour,1/eirunepe,1/guayaquil,1/jamaica,1/panama,1/porto_acre",
  "-4|s|05/13:23->08/13:01": "12/palmer",
  "-4|s|05/12:24->08/12:00": "1/santiago,7/continental",
  "-4|s|03/24:24->10/07:00": "1/asuncion",
  "-4|s|02/17:24->11/04:00": "1/campo_grande,1/cuiaba",
  "-4|s": "1/la_paz,1/manaus,5/west",
  "-4|n|03/12:03->11/05:01": "1/indiana,1/kentucky",
  "-4|n|03/11:02->11/04:02": "1/detroit,1/fort_wayne,1/grand_turk,1/indianapolis,1/iqaluit,1/louisville,1/montreal,1/nassau,1/new_york,1/nipigon,1/pangnirtung,1/port-au-prince,1/thunder_bay,1/toronto,6/eastern",
  "-4|n|03/11:00->11/04:01": "1/havana",
  "-4|n": "1/anguilla,1/antigua,1/aruba,1/barbados,1/blanc-sablon,1/boa_vista,1/caracas,1/curacao,1/dominica,1/grenada,1/guadeloupe,1/guyana,1/kralendijk,1/lower_princes,1/marigot,1/martinique,1/montserrat,1/port_of_spain,1/porto_velho,1/puerto_rico,1/santo_domingo,1/st_barthelemy,1/st_kitts,1/st_lucia,1/st_thomas,1/st_vincent,1/tortola,1/virgin",
  "-3|s|02/17:24->11/04:00": "1/sao_paulo,5/east",
  "-3|s": "1/argentina,1/buenos_aires,1/cordoba,1/fortaleza,1/montevideo,1/punta_arenas,12/rothera,3/stanley",
  "-3|n|03/11:02->11/04:02": "1/glace_bay,1/goose_bay,1/halifax,1/moncton,1/thule,3/bermuda,6/atlantic",
  "-3|n": "1/araguaina,1/bahia,1/belem,1/catamarca,1/cayenne,1/jujuy,1/maceio,1/mendoza,1/paramaribo,1/recife,1/rosario,1/santarem",
  "-2|s": "5/denoronha",
  "-2|n|03/24:22->10/27:23": "1/godthab",
  "-2|n|03/11:02->11/04:02": "1/miquelon",
  "-2|n": "1/noronha,3/south_georgia",
  "-2.5|n|03/11:02->11/04:02": "1/st_johns,6/newfoundland",
  "-1|n": "3/cape_verde",
  "-11|n": "11/midway,11/niue,11/pago_pago,11/samoa",
  "-10|n": "11/honolulu,11/johnston,11/rarotonga,11/tahiti"
}
},{}],43:[function(_dereq_,module,exports){
"use strict";

//prefixes for iana names..
module.exports = ['africa', 'america', 'asia', 'atlantic', 'australia', 'brazil', 'canada', 'chile', 'europe', 'indian', 'mexico', 'pacific', 'antarctica', 'etc'];

},{}],44:[function(_dereq_,module,exports){
"use strict";

// this is a very rough list of informal and abbreviated timezones
// i am not an expert, or even half-knowledgeable in this subject.
// please help.
// partially from: https://en.wikipedia.org/wiki/list_of_time_zone_abbreviations
//format:  'best/iana': [standard, daylight, alias...]
var informal = {
  //north america
  'america/halifax': ['ast', 'adt', 'atlantic'],
  //or 'arabia standard time'
  'america/new_york': ['est', 'edt', 'eastern'],
  //or 'Ecuador Time'
  'america/chicago': ['cst', 'cdt', 'central'],
  'america/denver': ['mst', 'mdt', 'mountain'],
  'america/los_angeles': ['pst', 'pdt', 'pacific'],
  'america/anchorage': ['ahst', 'ahdt', 'akst', 'akdt', 'alaska'],
  //Alaska Standard Time
  'america/st_johns': ['nst', 'ndt', 'nt', 'newfoundland', 'nddt'],
  //south america
  'america/caracas': ['vet', null, 'venezuela'],
  'america/bogota': ['cot', null, 'colombia'],
  'america/cayenne': ['gft', null, 'french guiana'],
  'america/paramaribo': ['srt', null, 'suriname'],
  'america/guyana': ['gyt'],
  'america/buenos_aires': ['art', null, 'argentina'],
  'america/la_paz': ['bot', null, 'bolivia'],
  'america/asuncion': ['pyt', 'pyst', 'paraguay'],
  'america/santiago': ['clt', 'clst', 'chile'],
  'america/lima': ['pet', null, 'peru'],
  'america/montevideo': ['uyt', null, 'uruguay'],
  'atlantic/stanley': ['fkst', null, 'falkland island'],
  //brazil
  'america/manaus': ['amt'],
  'america/sao_paulo': ['brt', 'brst'],
  'brazil/acre': ['act'],
  // amst: -3, //amazon summer time (brazil)
  // fnt: -2, //fernando de noronha time
  // pmdt: -2, //saint pierre and miquelon daylight time
  // pmst: -3, //saint pierre and miquelon standard time
  // rott: -3, //rothera research station time
  // awt: 'america/blanc-sablon',
  // addt: 'america/pangnirtung',
  // apt: 'america/blanc-sablon',
  // cddt: 'america/rankin_inlet',
  // cwt: 'america/mexico_city',
  // cpt: 'america/atikokan',
  // eddt: 'america/iqaluit',
  // ept: 'america/detroit',
  // ewt: 'america/detroit',
  // ect: 'america/anguilla', //eastern caribbean time (does not recognise dst)
  // 'eastern caribbean': 'america/anguilla',
  // ffmt: 'america/martinique',
  // kmt: 'america/grand_turk',
  // mddt: 'america/cambridge_bay',
  // mpt: 'america/boise',
  // mwt: 'america/phoenix',
  // nwt: 'america/adak',
  // // npt: 'america/goose_bay',
  // pddt: 'america/inuvik',
  // ppmt: 'america/port-au-prince',
  // ppt: 'america/dawson_creek',
  // pwt: 'america/dawson_creek',
  // qmt: 'america/guayaquil',
  // sdmt: 'america/santo_domingo',
  // sjmt: 'america/costa_rica',
  // ydt: 'america/dawson', //yukon
  // ypt: 'america/dawson',
  // yddt: 'america/dawson',
  // ywt: 'america/dawson',
  // yst: 'america/whitehorse',
  //europe
  'europe/london': ['gmt', 'bst', 'british'],
  //britain is different
  'etc/gmt': ['gmt', null, 'greenwich'],
  'europe/lisbon': ['wet', 'west', 'west europe'],
  //western europe
  'europe/berlin': ['cet', 'cest', 'central europe', 'middle european', 'met', 'mest'],
  //central europe
  'europe/riga': ['eet', 'eest', 'east europe', 'kalt'],
  //eastern europe
  // -- these are old european ones, before the EU, i think:
  // 'europe/minsk': ['feet', 'feest', 'eastern europe'], //further eastern europe (discontinued)
  // ace: 'europe/dublin',
  // amt: 'europe/amsterdam',
  // bdst: 'europe/gibraltar',
  // bmt: 'europe/brussels',
  // bst: 'europe/gibraltar', //british summer time
  // 'british summer': 1,
  // dmt: 'europe/dublin',
  // dft: 1, //aix-specific equivalent of central european time
  // cmt: 'europe/copenhagen',
  // // ist: 'europe/dublin',
  // imt: 'europe/sofia',
  // lst: 'europe/riga',
  // pmt: 'europe/prague',
  // rmt: 'europe/rome',
  // set: 'europe/stockholm',
  // wemt: 'europe/madrid',
  // tse: 'europe/dublin',
  // utc: 'etc/utc', //coordinated universal time
  // 'coordinated universal': 'etc/utc',
  //russia
  'europe/moscow': ['msk', null, 'fet', 'mdst', 'msd'],
  //'further eastern europe'
  'europe/samara': ['samt'],
  'asia/yekaterinburg': ['yekt'],
  'asia/omsk': ['omst'],
  'asia/krasnoyarsk': ['krat'],
  'asia/novosibirsk': ['novt'],
  'asia/irkutsk': ['irkt'],
  'asia/yakutsk': ['yakt'],
  'asia/vladivostok': ['vlat'],
  'asia/magadan': ['magt'],
  'asia/sakhalin': ['sakt'],
  'asia/srednekolymsk': ['sret'],
  'asia/anadyr': ['anat'],
  'asia/kamchatka': ['pett'],
  //near-russia
  'asia/tashkent': ['uzt', 'uzbekistan'],
  //uzbekistan time
  'asia/bishkek': ['kgt', 'kyrgyzstan'],
  //kyrgyzstan time
  'antarctica/vostok': ['vost'],
  'asia/hovd': ['hovt'],
  'asia/ashgabat': ['tmt', null, 'turkmenistan'],
  // wmt: 'europe/warsaw',
  // 'europe/volgograd':['volt']
  //africa
  'africa/lagos': ['wat', 'wast', 'west africa'],
  //west african
  'africa/khartoum': ['cat', null, 'central africa'],
  'africa/nairobi': ['eat', null, 'east africa'],
  'atlantic/cape_verde': ['cvt'],
  'indian/mauritius': ['mut'],
  'indian/reunion': ['ret'],
  'africa/johannesburg': ['sast', null, 'south africa'],
  //atlantic
  'atlantic/azores': ['azot', 'azost', 'hmt'],
  'america/godthab': ['wgt', 'wgst', 'west greenland'],
  'america/scoresbysund': ['egt', 'egst', 'east greenland'],
  //middle-east
  'europe/istanbul': ['trt', null, 'turkey'],
  'asia/tbilisi': ['get', null, 'georgia'],
  // 'asia/yerevan': ['amt', null, 'armenia'], //(sorry!)
  'asia/baku': ['azt', null, 'azerbaijan'],
  'asia/jerusalem': [null, 'idt', 'israel', 'jmt', 'iddt'],
  //using ist for india
  'asia/tehran': ['irst', 'irdt', 'iran'],
  'asia/karachi': ['pkt', null, 'pakistan'],
  'asia/kabul': ['aft', null, 'afghanistan'],
  'asia/dushanbe': ['tjt', null, 'tajikistan'],
  'asia/almaty': ['almt', null, 'alma ata'],
  'asia/dubai': ['gst', null, 'gulf'],
  //india
  'asia/kolkata': ['ist', null, 'india', 'slst'],
  // 'asia/dhaka': ['bst', null, 'bangladesh'], //(sorry)
  'asia/thimbu': ['btt', null, 'bhutan'],
  'indian/maldives': ['mvt'],
  'asia/kathmandu': ['npt', null, 'nepal'],
  'indian/cocos': ['cct', null, 'cocos island'],
  'indian/chagos': ['iot', null, 'indian chagos'],
  'indian/kerguelen': ['tft', null, 'french southern and antarctic'],
  // biot: 6, //british indian ocean time
  // iot: 3, //indian ocean time
  //asia
  'asia/shanghai': ['ct', null, 'china', 'hkt'],
  'asia/ulaanbaatar': ['ulat'],
  'asia/seoul': ['kst', null, 'korea'],
  'asia/tokyo': ['jst', null, 'japan'],
  'asia/phnom_penh': ['ict', null, 'indochina'],
  'asia/manila': ['pht', null, 'philippines'],
  'asia/singapore': ['sgt'],
  // mmt: 'asia/colombo',
  //australia
  'australia/brisbane': ['aest', 'aedt', 'australian east'],
  //australian eastern standard time
  'australia/adelaide': ['acst', 'acdt', 'australian central'],
  //australian central daylight savings time
  'australia/eucla': ['acwst', null, 'cwst', 'australian central western'],
  //australian central western standard time (unofficial)
  'australia/perth': ['awst', 'awdt', 'australian west'],
  //australian western standard time
  'pacific/auckland': ['nzst', 'nzdt', 'nzmt'],
  'australia/lord_howe': ['lhst', 'lhdt'],
  //pacific
  'pacific/guam': ['chst'],
  'pacific/chatham': ['chast', 'chadt'],
  'pacific/honolulu': ['hst'],
  'asia/brunei': ['bnt', null, 'bdt'],
  'pacific/midway': ['sst', null, 'samoa', 'sdt'],
  'pacific/niue': ['nut'],
  'pacific/fakaofo': ['tkt'],
  'pacific/rarotonga': ['ckt', null, 'cook islands'],
  'chile/easterisland': ['east', 'easst', 'easter island', 'emt'],
  'asia/jayapura': ['wit', null, 'east indonesia'],
  'asia/jakarta': ['wib', null, 'west indonesia'],
  'asia/makassar': ['wita', null, 'central indonesia'],
  'pacific/galapagos': ['galt'],
  'pacific/fiji': ['fjt', 'fjst'],
  'asia/dili': ['tlt', null, 'east timor'],
  'indian/christmas': ['cxt'] // sbt: 11, //solomon islands time
  // mht: 12, //marshall islands time
  // bit: -12, //baker island time
  // cist: -8, //clipperton island standard time
  // chut: 10, //chuuk time
  // ddut: 10, //dumont durville time
  // gst: 'pacific/guam',
  // gamt: -9, //gambier islands time
  // git: -9, //gambier island time
  // gilt: 12, //gilbert island time
  // idlw: -12, //international day line west time zone
  // 'international day line west': -12,
  // kost: 11, //kosrae time
  // lint: 14, //line islands time
  // magt: 12, //magadan time
  // mist: 11, //macquarie island station time
  // nct: 11, //new caledonia time
  // nft: 11, //norfolk island time
  // phot: 13, //phoenix island time
  // pont: 11, //pohnpei standard time
  // pett: 12, //kamchatka time
  // mart: -9.5, //marquesas islands time
  // mit: -9.5, //marquesas islands time
  // myt: 8, //malaysia time
  // nut: -11, //niue time
  // pht: 8, //philippine time
  // pgt: 10, //papua new guinea time
  // pmmt: 'pacific/bougainville',
  // // smt: 'asia/singapore',
  // sakt: 11, //sakhalin island time
  // sret: 11, //srednekolymsk time
  // sst: 'pacific/pago_pago',
  // taht: -10, //tahiti time
  // tvt: 12, //tuvalu time
  // tkt: 13, //tokelau time
  // tot: 13, //tonga time
  // vut: 11, //vanuatu time
  // wakt: 12, //wake island time
  //i forget (sorry!)
  // haec: 2, //heure avancée deurope centrale french-language name for cest
  // syot: 3, //showa station time
  // yekt: 5, //yekaterinburg time
  // sct: 4, //seychelles time
  // orat: 5, //oral time
  // mawt: 5, //mawson station time
  // hovt: 7, //khovd standard time
  // hovst: 8, //khovd summer time
  // davt: 7, //davis time
  // chost: 9, //choibalsan summer time
  // chot: 8, //choibalsan standard time
  // wst: 8, //western standard time
  //use each abbreviation as a key

};
var lookup = Object.keys(informal).reduce(function (h, k) {
  var arr = informal[k];

  for (var i = 0; i < 5; i += 1) {
    if (arr[i]) {
      h[arr[i]] = k;
    }
  }

  return h;
}, {});
module.exports = {
  informal: informal,
  lookup: lookup
};

},{}],45:[function(_dereq_,module,exports){
"use strict";

var data = _dereq_('./_build.json');

var prefixes = _dereq_('./_prefixes.js');

var all = {};
Object.keys(data).forEach(function (k) {
  var split = k.split('|');
  var obj = {
    offset: Number(split[0]),
    hem: split[1]
  };

  if (split[2]) {
    obj.dst = split[2];
  }

  var names = data[k].split(',');
  names.forEach(function (str) {
    str = str.replace(/(^[0-9]+)\//, function (before, num) {
      num = Number(num);
      return prefixes[num] + '/';
    });
    all[str] = obj;
  });
}); //add etc/gmt+n

for (var i = -12; i < 13; i += 1) {
  var num = i;

  if (num > 0) {
    num = '+' + num;
  }

  var name = 'etc/gmt' + num;
  all[name] = {
    offset: i * -1,
    //they're negative!
    hem: 'n' //(sorry)

  };
  name = 'utc/gmt' + num; //this one too, why not.

  all[name] = {
    offset: i * -1,
    hem: 'n'
  };
} // console.log(all)
// console.log(Object.keys(all).length)


module.exports = all;

},{"./_build.json":42,"./_prefixes.js":43}]},{},[9])(9)
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
"use strict";

var spacetime = _dereq_('spacetime');

var methods = _dereq_('./methods');

var chooseMethod = function chooseMethod(start, end) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;
  var diff = start.diff(end);

  if (diff.years > 3) {
    return methods.years(start, end, n);
  }

  if (diff.months > 3) {
    return methods.months(start, end, n);
  }

  if (diff.days > 3) {
    return methods.days(start, end, n);
  }

  if (diff.hours > 3) {
    return methods.hours(start, end, n);
  }

  if (diff.minutes > 3) {
    return methods.minutes(start, end, n);
  }

  return methods.months(start, end, n);
};

var spacetimeTicks = function spacetimeTicks(start, end) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;
  start = spacetime(start);
  end = spacetime(end); //reverse them, if necessary

  if (start.epoch > end.epoch) {
    var tmp = start.epoch;
    start.epoch = end.epoch;
    end.epoch = tmp;
  }

  var ticks = chooseMethod(start, end, n);
  return ticks;
};

module.exports = spacetimeTicks;

},{"./methods":3,"spacetime":1}],3:[function(_dereq_,module,exports){
"use strict";

var reduceTo = function reduceTo(arr, n) {
  if (arr.length <= n || arr.length <= 5) {
    return arr;
  }

  while (arr.length > n) {
    //remove every other one
    arr = arr.filter(function (o, i) {
      return i % 2 === 0;
    });

    if (arr.length <= n || arr.length <= 5) {
      return arr;
    }
  }

  return arr;
}; //increment by this unit


var allTicks = function allTicks(start, end, unit) {
  var ticks = [];
  start = start.add(1, unit);
  start = start.startOf(unit);

  while (start.isBefore(end)) {
    ticks.push(start);
    start = start.add(1, unit);
  }

  return ticks;
};

var formatTicks = function formatTicks(arr, fmt, start, end) {
  var delta = end.epoch - start.epoch;
  return arr.map(function (s) {
    var percent = (s.epoch - start.epoch) / delta;
    return {
      label: s.format(fmt),
      epoch: s.epoch,
      value: parseInt(percent * 1000, 10) / 1000
    };
  });
};

var methods = {
  years: function years(start, end, n) {
    var ticks = allTicks(start, end, 'year');
    ticks = reduceTo(ticks, n);
    var fmt = '{month-short} {year-short}';

    if (start.diff(end, 'year') > 6) {
      fmt = '{year}';
    }

    ticks = formatTicks(ticks, fmt, start, end);
    return ticks;
  },
  months: function months(start, end, n) {
    var ticks = allTicks(start, end, 'month');
    ticks = reduceTo(ticks, n);
    var fmt = '{month-short} {date}';

    if (start.isSame(end, 'year') === false) {
      fmt = '{month-short} {year}';
    }

    ticks = formatTicks(ticks, fmt, start, end);
    return ticks;
  },
  days: function days(start, end, n) {
    var ticks = allTicks(start, end, 'day');
    ticks = reduceTo(ticks, n);
    var fmt = '{month-short} {date}';
    ticks = formatTicks(ticks, fmt, start, end);
    return ticks;
  },
  hours: function hours(start, end, n) {
    console.log('hours');
    var ticks = allTicks(start, end, 'hour');
    ticks = reduceTo(ticks, n);
    var fmt = '{time}';

    if (start.isSame(end, 'day') === false) {
      fmt = '{day-short} {hour}{ampm}';
    }

    ticks = formatTicks(ticks, fmt, start, end);
    return ticks;
  },
  minutes: function minutes(start, end, n) {
    var ticks = allTicks(start, end, 'minute');
    ticks = reduceTo(ticks, n);
    var fmt = '{time}';
    ticks = formatTicks(ticks, fmt, start, end);
    return ticks;
  }
};
module.exports = methods;

},{}]},{},[2])(2)
});
