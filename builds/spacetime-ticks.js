(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global['spacetime-ticks'] = factory());
}(this, function () { 'use strict';

  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }

  function getCjsExportFromNamespace(n) {
    return n && n['default'] || n;
  }

  var fns = createCommonjsModule(function (module, exports) {
    //git:blame @JuliasCaesar https://www.timeanddate.com/date/leapyear.html
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

    exports.zeroPad = function (str) {
      var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
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
    }; //used mostly for cleanup of unit names, like 'months'


    exports.normalize = function () {
      var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      str = str.toLowerCase().trim();
      str = str.replace(/ies$/, 'y'); //'centuries'

      str = str.replace(/s$/, '');
      str = str.replace(/-/g, '');

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

    exports.formatTimezone = function (offset) {
      var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var absOffset = Math.abs(offset);
      var sign = offset > 0 ? '+' : '-';
      return "".concat(sign).concat(exports.zeroPad(absOffset)).concat(delimiter, "00");
    };
  });
  var fns_1 = fns.isLeapYear;
  var fns_2 = fns.isDate;
  var fns_3 = fns.isArray;
  var fns_4 = fns.isObject;
  var fns_5 = fns.zeroPad;
  var fns_6 = fns.titleCase;
  var fns_7 = fns.ordinal;
  var fns_8 = fns.toCardinal;
  var fns_9 = fns.normalize;
  var fns_10 = fns.getEpoch;
  var fns_11 = fns.beADate;
  var fns_12 = fns.formatTimezone;
  var zeroPad = fns.zeroPad;

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

  var summerTime = shouldChange; // this method avoids having to do a full dst-calculation on every operation
  // it reproduces some things in ./index.js, but speeds up spacetime considerably

  var quickOffset = function quickOffset(s) {
    var zones = s.timezones;
    var obj = zones[s.tz];

    if (obj === undefined) {
      console.warn("Warning: couldn't find timezone " + s.tz);
      return 0;
    }

    if (obj.dst === undefined) {
      return obj.offset;
    } //get our two possible offsets


    var jul = obj.offset;
    var dec = obj.offset + 1; // assume it's the same for now

    if (obj.hem === 'n') {
      dec = jul - 1;
    }

    var split = obj.dst.split('->');
    var inSummer = summerTime(s.epoch, split[0], split[1], jul);

    if (inSummer === true) {
      return jul;
    }

    return dec;
  };

  var quick = quickOffset;
  var _build = {
    "9|s": "2/dili,2/jayapura",
    "9|n": "2/chita,2/khandyga,2/pyongyang,2/seoul,2/tokyo,11/palau",
    "9.5|s|04/07:03->10/06:02": "4/adelaide,4/broken_hill,4/south,4/yancowinna",
    "9.5|s": "4/darwin,4/north",
    "8|s": "12/casey,2/kuala_lumpur,2/makassar,2/singapore,4/perth,4/west",
    "8|n|03/25:03->09/29:23": "2/ulan_bator",
    "8|n": "2/brunei,2/choibalsan,2/chongqing,2/chungking,2/harbin,2/hong_kong,2/irkutsk,2/kuching,2/macao,2/macau,2/manila,2/shanghai,2/taipei,2/ujung_pandang,2/ulaanbaatar",
    "8.75|s": "4/eucla",
    "7|s": "12/davis,2/jakarta,9/christmas",
    "7|n": "2/bangkok,2/barnaul,2/ho_chi_minh,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/pontianak,2/saigon,2/tomsk,2/vientiane",
    "6|s": "12/vostok",
    "6|n": "2/almaty,2/bishkek,2/dacca,2/dhaka,2/kashgar,2/omsk,2/qyzylorda,2/thimbu,2/thimphu,2/urumqi,9/chagos",
    "6.5|n": "2/rangoon,9/cocos",
    "5|s": "12/mawson,9/kerguelen",
    "5|n": "2/aqtau,2/aqtobe,2/ashgabat,2/ashkhabad,2/atyrau,2/baku,2/dushanbe,2/karachi,2/oral,2/samarkand,2/tashkent,2/yekaterinburg,9/maldives",
    "5.75|n": "2/kathmandu,2/katmandu",
    "5.5|n": "2/calcutta,2/colombo,2/kolkata",
    "4|s": "9/reunion",
    "4|n": "2/dubai,2/muscat,2/tbilisi,2/yerevan,8/astrakhan,8/samara,8/saratov,8/ulyanovsk,8/volgograd,2/volgograd,9/mahe,9/mauritius",
    "4.5|n|03/22:00->09/21:24": "2/tehran",
    "4.5|n": "2/kabul",
    "3|s": "12/syowa,9/antananarivo",
    "3|n|03/31:03->10/27:04": "2/nicosia,8/athens,8/bucharest,8/helsinki,8/kiev,8/mariehamn,8/nicosia,8/riga,8/sofia,8/tallinn,8/uzhgorod,8/vilnius,8/zaporozhye",
    "3|n|03/31:02->10/27:03": "8/chisinau,8/tiraspol",
    "3|n|03/31:00->10/26:24": "2/beirut",
    "3|n|03/29:02->10/27:02": "2/jerusalem,2/tel_aviv",
    "3|n|03/29:00->10/26:01": "2/gaza,2/hebron",
    "3|n|03/29:00->10/25:01": "2/amman",
    "3|n|03/29:00->10/24:24": "2/damascus",
    "3|n": "0/addis_ababa,0/asmara,0/asmera,0/dar_es_salaam,0/djibouti,0/juba,0/kampala,0/mogadishu,0/nairobi,2/aden,2/baghdad,2/bahrain,2/istanbul,2/kuwait,2/qatar,2/riyadh,8/istanbul,8/kirov,8/minsk,8/moscow,8/simferopol,9/comoro,9/mayotte",
    "2|s|03/31:02->10/27:02": "12/troll",
    "2|s": "0/gaborone,0/harare,0/johannesburg,0/lubumbashi,0/lusaka,0/maputo,0/maseru,0/mbabane",
    "2|n|03/31:02->10/27:03": "0/ceuta,arctic/longyearbyen,3/jan_mayen,8/amsterdam,8/andorra,8/belgrade,8/berlin,8/bratislava,8/brussels,8/budapest,8/busingen,8/copenhagen,8/gibraltar,8/ljubljana,8/luxembourg,8/madrid,8/malta,8/monaco,8/oslo,8/paris,8/podgorica,8/prague,8/rome,8/san_marino,8/sarajevo,8/skopje,8/stockholm,8/tirane,8/vaduz,8/vatican,8/vienna,8/warsaw,8/zagreb,8/zurich",
    "2|n": "0/blantyre,0/bujumbura,0/cairo,0/khartoum,0/kigali,0/tripoli,8/kaliningrad",
    "1|s|04/02:01->09/03:03": "0/windhoek",
    "1|s": "0/kinshasa,0/luanda",
    "1|n|05/05:03->06/09:02": "0/casablanca,0/el_aaiun",
    "1|n|03/31:01->10/27:02": "3/canary,3/faeroe,3/faroe,3/madeira,8/belfast,8/dublin,8/guernsey,8/isle_of_man,8/jersey,8/lisbon,8/london",
    "1|n": "0/algiers,0/bangui,0/brazzaville,0/douala,0/lagos,0/libreville,0/malabo,0/ndjamena,0/niamey,0/porto-novo,0/tunis",
    "14|n": "11/kiritimati",
    "13|s|04/07:04->09/29:03": "11/apia",
    "13|s|01/15:02->11/05:03": "11/tongatapu",
    "13|n": "11/enderbury,11/fakaofo",
    "12|s|04/07:03->09/29:02": "12/mcmurdo,12/south_pole,11/auckland",
    "12|s|01/13:03->11/03:02": "11/fiji",
    "12|n": "2/anadyr,2/kamchatka,2/srednekolymsk,11/funafuti,11/kwajalein,11/majuro,11/nauru,11/tarawa,11/wake,11/wallis",
    "12.75|s|04/07:03->04/07:02": "11/chatham",
    "11|s": "12/macquarie,11/bougainville",
    "11|n": "2/magadan,2/sakhalin,11/efate,11/guadalcanal,11/kosrae,11/noumea,11/pohnpei,11/ponape",
    "11.5|n": "11/norfolk",
    "10|s|04/07:03->10/06:02": "4/act,4/canberra,4/currie,4/hobart,4/melbourne,4/nsw,4/sydney,4/tasmania,4/victoria",
    "10|s": "12/dumontdurville,4/brisbane,4/lindeman,4/queensland",
    "10|n": "2/ust-nera,2/vladivostok,2/yakutsk,11/chuuk,11/guam,11/port_moresby,11/saipan,11/truk,11/yap",
    "10.5|s|04/07:01->10/06:02": "4/lhi,4/lord_howe",
    "0|n|03/31:00->10/27:01": "1/scoresbysund,3/azores",
    "0|n": "0/abidjan,0/accra,0/bamako,0/banjul,0/bissau,0/conakry,0/dakar,0/freetown,0/lome,0/monrovia,0/nouakchott,0/ouagadougou,0/sao_tome,0/timbuktu,1/danmarkshavn,3/reykjavik,3/st_helena,13/gmt,13/gmt+0,13/gmt-0,13/gmt0,13/greenwich,13/utc,13/universal,13/zulu",
    "-9|n|03/10:02->11/03:02": "1/adak,1/atka",
    "-9|n": "11/gambier",
    "-9.5|n": "11/marquesas",
    "-8|n|03/10:02->11/03:02": "1/anchorage,1/juneau,1/metlakatla,1/nome,1/sitka,1/yakutat",
    "-8|n": "11/pitcairn",
    "-7|n|03/10:02->11/03:02": "1/dawson,1/ensenada,1/los_angeles,1/santa_isabel,1/tijuana,1/vancouver,1/whitehorse,6/pacific,6/yukon,10/bajanorte",
    "-7|n": "1/creston,1/dawson_creek,1/hermosillo,1/phoenix",
    "-6|s|04/06:22->09/07:22": "7/easterisland,11/easter",
    "-6|n|04/07:02->10/27:02": "1/chihuahua,1/mazatlan,10/bajasur",
    "-6|n|03/10:02->11/03:02": "1/boise,1/cambridge_bay,1/denver,1/edmonton,1/inuvik,1/ojinaga,1/shiprock,1/yellowknife,6/mountain",
    "-6|n": "1/belize,1/costa_rica,1/el_salvador,1/guatemala,1/managua,1/regina,1/swift_current,1/tegucigalpa,6/east-saskatchewan,6/saskatchewan,11/galapagos",
    "-5|s": "1/lima,1/rio_branco,5/acre",
    "-5|n|04/07:02->10/27:02": "1/bahia_banderas,1/merida,1/mexico_city,1/monterrey,10/general",
    "-5|n|03/12:03->11/05:01": "1/north_dakota",
    "-5|n|03/10:02->11/03:02": "1/chicago,1/knox_in,1/matamoros,1/menominee,1/rainy_river,1/rankin_inlet,1/resolute,1/winnipeg,6/central",
    "-5|n": "1/atikokan,1/bogota,1/cancun,1/cayman,1/coral_harbour,1/eirunepe,1/guayaquil,1/jamaica,1/panama,1/porto_acre",
    "-4|s|05/13:23->08/13:01": "12/palmer",
    "-4|s|04/06:24->09/08:00": "1/santiago,7/continental",
    "-4|s|03/23:24->10/06:00": "1/asuncion",
    "-4|s|02/16:24->11/03:00": "1/campo_grande,1/cuiaba",
    "-4|s": "1/la_paz,1/manaus,5/west",
    "-4|n|03/12:03->11/05:01": "1/indiana,1/kentucky",
    "-4|n|03/10:02->11/03:02": "1/detroit,1/fort_wayne,1/grand_turk,1/indianapolis,1/iqaluit,1/louisville,1/montreal,1/nassau,1/new_york,1/nipigon,1/pangnirtung,1/port-au-prince,1/thunder_bay,1/toronto,6/eastern",
    "-4|n|03/10:00->11/03:01": "1/havana",
    "-4|n": "1/anguilla,1/antigua,1/aruba,1/barbados,1/blanc-sablon,1/boa_vista,1/caracas,1/curacao,1/dominica,1/grenada,1/guadeloupe,1/guyana,1/kralendijk,1/lower_princes,1/marigot,1/martinique,1/montserrat,1/port_of_spain,1/porto_velho,1/puerto_rico,1/santo_domingo,1/st_barthelemy,1/st_kitts,1/st_lucia,1/st_thomas,1/st_vincent,1/tortola,1/virgin",
    "-3|s|02/16:24->11/03:00": "1/sao_paulo,5/east",
    "-3|s": "1/argentina,1/buenos_aires,1/cordoba,1/fortaleza,1/montevideo,1/punta_arenas,12/rothera,3/stanley",
    "-3|n|03/10:02->11/03:02": "1/glace_bay,1/goose_bay,1/halifax,1/moncton,1/thule,3/bermuda,6/atlantic",
    "-3|n": "1/araguaina,1/bahia,1/belem,1/catamarca,1/cayenne,1/jujuy,1/maceio,1/mendoza,1/paramaribo,1/recife,1/rosario,1/santarem",
    "-2|s": "5/denoronha",
    "-2|n|03/30:22->10/26:23": "1/godthab",
    "-2|n|03/10:02->11/03:02": "1/miquelon",
    "-2|n": "1/noronha,3/south_georgia",
    "-2.5|n|03/10:02->11/03:02": "1/st_johns,6/newfoundland",
    "-1|n": "3/cape_verde",
    "-11|n": "11/midway,11/niue,11/pago_pago,11/samoa",
    "-10|n": "11/honolulu,11/johnston,11/rarotonga,11/tahiti"
  };

  var _build$1 =
  /*#__PURE__*/
  Object.freeze({
    'default': _build
  }); //prefixes for iana names..


  var _prefixes = ['africa', 'america', 'asia', 'atlantic', 'australia', 'brazil', 'canada', 'chile', 'europe', 'indian', 'mexico', 'pacific', 'antarctica', 'etc'];
  var data = getCjsExportFromNamespace(_build$1);
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
        return _prefixes[num] + '/';
      });
      all[str] = obj;
    });
  });
  all['utc'] = {
    offset: 0,
    hem: 'n' //(sorry)

  }; //add etc/gmt+n

  for (var i = -14; i <= 14; i += 0.5) {
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


  var unpack = all; //find the implicit iana code for this machine.
  //safely query the Intl object
  //based on - https://bitbucket.org/pellepim/jstimezonedetect/src

  var fallbackTZ = 'utc'; //
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

    if (!timezone) {
      return null;
    }

    return timezone.toLowerCase();
  };

  var guessTz = function guessTz() {
    var timezone = safeIntl();

    if (timezone === null) {
      return fallbackTZ;
    }

    return timezone;
  }; //do it once per computer


  var guessTz_1 = guessTz;
  var isOffset = /(\-?[0-9]+)h(rs)?/i;
  var isNumber = /(\-?[0-9]+)/;
  var utcOffset = /utc([\-+]?[0-9]+)/i;
  var gmtOffset = /gmt([\-+]?[0-9]+)/i;

  var toIana = function toIana(num) {
    num = Number(num);

    if (num > -13 && num < 13) {
      num = num * -1; //it's opposite!

      num = (num > 0 ? '+' : '') + num; //add plus sign

      return 'etc/gmt' + num;
    }

    return null;
  };

  var parseOffset = function parseOffset(tz) {
    // '+5hrs'
    var m = tz.match(isOffset);

    if (m !== null) {
      return toIana(m[1]);
    } // 'utc+5'


    m = tz.match(utcOffset);

    if (m !== null) {
      return toIana(m[1]);
    } // 'GMT-5' (not opposite)


    m = tz.match(gmtOffset);

    if (m !== null) {
      var _num = Number(m[1]) * -1;

      return toIana(_num);
    } // '+5'


    m = tz.match(isNumber);

    if (m !== null) {
      return toIana(m[1]);
    }

    return null;
  };

  var parseOffset_1 = parseOffset;
  var local = guessTz_1(); //add all the city names by themselves

  var cities = Object.keys(unpack).reduce(function (h, k) {
    var city = k.split('/')[1] || '';
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
    } //try city-names


    if (cities.hasOwnProperty(tz) === true) {
      return cities[tz];
    } // //try to parse '-5h'


    if (/[0-9]/.test(tz) === true) {
      var id = parseOffset_1(tz);

      if (id) {
        return id;
      }
    }

    throw new Error("Spacetime: Cannot find timezone named: '" + str + "'. Please enter an IANA timezone id.");
  };

  var find = lookupTz;
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
  var milliseconds = o; //basically, step-forward/backward until js Date object says we're there.

  var walk = function walk(s, n, fn, unit, previous) {
    var current = s.d[fn]();

    if (current === n) {
      return; //already there
    }

    var startUnit = previous === null ? null : s.d[previous]();
    var original = s.epoch; //try to get it as close as we can

    var diff = n - current;
    s.epoch += milliseconds[unit] * diff; //DST edge-case: if we are going many days, be a little conservative

    if (unit === 'day' && Math.abs(diff) > 28) {
      //but don't push it over a month
      if (n < 28) {
        s.epoch += milliseconds.hour;
      }
    } //repair it if we've gone too far or something
    //(go by half-steps, just in case)


    var halfStep = milliseconds[unit] / 2;

    while (s.d[fn]() < n) {
      s.epoch += halfStep;
    }

    while (s.d[fn]() > n) {
      s.epoch -= halfStep;
    } //oops, did we change previous unit? revert it.


    if (previous !== null && startUnit !== s.d[previous]()) {
      // console.warn('spacetime warning: missed setting ' + unit)
      s.epoch = original; // i mean, but make it close...

      s.epoch += milliseconds[unit] * diff * 0.97; // i guess?
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
        s.epoch += milliseconds.day * (diff * 28); //special case
        //oops, did we change the year? revert it.

        if (startUnit !== s.d.getYear()) {
          s.epoch = original;
        } //incriment by day


        while (s.d.getMonth() < n) {
          s.epoch += milliseconds.day;
        }

        while (s.d.getMonth() > n) {
          s.epoch -= milliseconds.day;
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

    for (var _i = 0; _i < keys.length; _i++) {
      var k = keys[_i];
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

  var walk_1 = walkTo;
  var shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
  var longMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

  function buildMapping() {
    var obj = {
      sep: 8 //support this format

    };

    for (var _i2 = 0; _i2 < shortMonths.length; _i2++) {
      obj[shortMonths[_i2]] = _i2;
    }

    for (var _i3 = 0; _i3 < longMonths.length; _i3++) {
      obj[longMonths[_i3]] = _i3;
    }

    return obj;
  }

  var months = {
    "short": function short() {
      return shortMonths;
    },
    "long": function long() {
      return longMonths;
    },
    mapping: function mapping() {
      return buildMapping();
    },
    set: function set(i18n) {
      shortMonths = i18n["short"] || shortMonths;
      longMonths = i18n["long"] || longMonths;
    }
  }; //pull-apart ISO offsets, like "+0100"

  var parseOffset$1 = function parseOffset$1(s, offset) {
    if (!offset) {
      return s;
    } //this is a fancy-move


    if (offset === 'Z') {
      offset = '+0000';
    } // according to ISO8601, tz could be hh:mm, hhmm or hh
    // so need few more steps before the calculation.


    var num = 0; // for (+-)hh:mm

    if (/^[\+-]?[0-9]{2}:[0-9]{2}$/.test(offset)) {
      //support "+01:00"
      if (/:00/.test(offset) === true) {
        offset = offset.replace(/:00/, '');
      } //support "+01:30"


      if (/:30/.test(offset) === true) {
        offset = offset.replace(/:30/, '.5');
      }
    } // for (+-)hhmm


    if (/^[\+-]?[0-9]{4}$/.test(offset)) {
      offset = offset.replace(/30$/, '.5');
    }

    num = parseFloat(offset); //divide by 100 or 10 - , "+0100", "+01"

    if (Math.abs(num) > 100) {
      num = num / 100;
    } //okay, try to match it to a utc timezone
    //remember - this is opposite! a -5 offset maps to Etc/GMT+5  ¯\_(:/)_/¯
    //https://askubuntu.com/questions/519550/why-is-the-8-timezone-called-gmt-8-in-the-filesystem


    num *= -1;

    if (num >= 0) {
      num = '+' + num;
    }

    var tz = 'etc/gmt' + num;
    var zones = s.timezones;

    if (zones[tz]) {
      // log a warning if we're over-writing a given timezone?
      // console.log('changing timezone to: ' + tz)
      s.tz = tz;
    }

    return s;
  };

  var parseOffset_1$1 = parseOffset$1;

  var parseTime = function parseTime(s) {
    var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    str = str.replace(/^\s+/, '').toLowerCase(); //trim
    //formal time formats - 04:30.23

    var arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/);

    if (arr !== null) {
      //validate it a little
      var h = Number(arr[1]);

      if (h < 0 || h > 24) {
        return s.startOf('day');
      }

      var m = Number(arr[2]); //don't accept '5:3pm'

      if (arr[2].length < 2 || m < 0 || m > 59) {
        return s.startOf('day');
      }

      s = s.hour(h);
      s = s.minute(m);
      s = s.seconds(arr[3] || 0);
      s = s.millisecond(arr[4] || 0); //parse-out am/pm

      var ampm = str.match(/[\b0-9](am|pm)\b/);

      if (ampm !== null && ampm[1]) {
        s = s.ampm(ampm[1]);
      }

      return s;
    } //try an informal form - 5pm (no minutes)


    arr = str.match(/([0-9]+) ?(am|pm)/);

    if (arr !== null && arr[1]) {
      var _h = Number(arr[1]); //validate it a little..


      if (_h > 12 || _h < 1) {
        return s.startOf('day');
      }

      s = s.hour(arr[1] || 0);
      s = s.ampm(arr[2]);
      s = s.startOf('hour');
      return s;
    } //no time info found, use start-of-day


    s = s.startOf('day');
    return s;
  };

  var parseTime_1 = parseTime;
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
  var monthLengths_1 = monthLengths;
  var isLeapYear = fns.isLeapYear; //given a month, return whether day number exists in it

  var hasDate = function hasDate(obj) {
    //invalid values
    if (monthLengths_1.hasOwnProperty(obj.month) !== true) {
      return false;
    } //support leap-year in february


    if (obj.month === 1) {
      if (isLeapYear(obj.year) && obj.date <= 29) {
        return true;
      } else {
        return obj.date <= 28;
      }
    } //is this date too-big for this month?


    var max = monthLengths_1[obj.month] || 0;

    if (obj.date <= max) {
      return true;
    }

    return false;
  };

  var hasDate_1 = hasDate;
  var months$1 = months.mapping();

  var parseYear = function parseYear() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    //support '18 -> 2018
    // str = str.replace(/^'([0-9]{2})/, '20$1')
    // str = str.replace('([0-9]+) ?b\.?c\.?$', '-$1')
    var year = parseInt(str.trim(), 10);
    year = year || new Date().getFullYear();
    return year;
  };

  var strFmt = [//iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
  {
    reg: /^(\-?0?0?[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/,
    parse: function parse(s, arr, givenTz, options) {
      var month = parseInt(arr[2], 10) - 1;
      var obj = {
        year: arr[1],
        month: month,
        date: arr[3]
      };

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      parseOffset_1$1(s, arr[5]);
      walk_1(s, obj);
      s = parseTime_1(s, arr[4]);
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

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walk_1(s, obj);
      s = parseTime_1(s);
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

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walk_1(s, obj);
      s = parseTime_1(s);
      return s;
    }
  }, //Long "Mar 25 2015"
  //February 22, 2017 15:30:00
  {
    reg: /^([a-z]+) ([0-9]{1,2}(?:st|nd|rd|th)?),?( [0-9]{4})?( ([0-9:]+( ?am| ?pm)?))?$/i,
    parse: function parse(s, arr) {
      var month = months$1[arr[1].toLowerCase()];
      var year = parseYear(arr[3]);
      var obj = {
        year: year,
        month: month,
        date: fns.toCardinal(arr[2] || '')
      };

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walk_1(s, obj);
      s = parseTime_1(s, arr[4]);
      return s;
    }
  }, //February 2017 (implied date)
  {
    reg: /^([a-z]+) ([0-9]{4})$/i,
    parse: function parse(s, arr) {
      var month = months$1[arr[1].toLowerCase()];
      var year = parseYear(arr[2]);
      var obj = {
        year: year,
        month: month,
        date: 1
      };

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walk_1(s, obj);
      s = parseTime_1(s, arr[4]);
      return s;
    }
  }, //Long "25 Mar 2015"
  {
    reg: /^([0-9]{1,2}(?:st|nd|rd|th)?) ([a-z]+),?( [0-9]{4})?$/i,
    parse: function parse(s, arr) {
      var month = months$1[arr[2].toLowerCase()];
      var year = parseYear(arr[3]);
      var obj = {
        year: year,
        month: month,
        date: fns.toCardinal(arr[1])
      };

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walk_1(s, obj);
      s = parseTime_1(s);
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

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walk_1(s, obj);
      s = parseTime_1(s);
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

      if (hasDate_1(obj) === false) {
        s.epoch = null;
        return s;
      }

      walk_1(s, obj);
      s = parseTime_1(s);
      return s;
    }
  }];
  var strParse = strFmt;
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
  var namedDates = dates; //we have to actually parse these inputs ourselves
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

  var minimumEpoch = 2500000000;
  var defaults = {
    year: new Date().getFullYear(),
    month: 0,
    date: 1
  }; //support [2016, 03, 01] format

  var handleArray = function handleArray(s, arr) {
    var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];

    for (var _i4 = 0; _i4 < order.length; _i4++) {
      var _num2 = arr[_i4] || defaults[order[_i4]] || 0;

      s = s[order[_i4]](_num2);
    }

    return s;
  }; //support {year:2016, month:3} format


  var handleObject = function handleObject(s, obj) {
    obj = Object.assign({}, defaults, obj);
    var keys = Object.keys(obj);

    for (var _i5 = 0; _i5 < keys.length; _i5++) {
      var unit = keys[_i5]; //make sure we have this method

      if (s[unit] === undefined || typeof s[unit] !== 'function') {
        continue;
      } //make sure the value is a number


      if (obj[unit] === null || obj[unit] === undefined || obj[unit] === '') {
        continue;
      }

      var _num3 = obj[unit] || defaults[unit] || 0;

      s = s[unit](_num3);
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
        s.tz = input.tz;
        return s;
      }

      s = handleObject(s, input);
      return s;
    } //input as a string..


    if (typeof input !== 'string') {
      return s;
    } //little cleanup..


    input = input.replace(/\b(mon|tues|wed|wednes|thu|thurs|fri|sat|satur|sun)(day)?\b/i, '');
    input = input.replace(/,/g, '');
    input = input.replace(/ +/g, ' ').trim(); //try some known-words, like 'now'

    if (namedDates.hasOwnProperty(input) === true) {
      s = namedDates[input](s);
      return s;
    } //try each text-parse template, use the first good result


    for (var _i6 = 0; _i6 < strParse.length; _i6++) {
      var m = input.match(strParse[_i6].reg);

      if (m) {
        s = strParse[_i6].parse(s, m, givenTz);
        return s;
      }
    }

    if (s.silent === false) {
      console.warn("Warning: couldn't parse date-string: '" + input + "'");
    }

    s.epoch = null;
    return s;
  };

  var input = parseInput;
  var shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  var longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  var days = {
    "short": function short() {
      return shortDays;
    },
    "long": function long() {
      return longDays;
    },
    set: function set(i18n) {
      shortDays = i18n["short"] || shortDays;
      longDays = i18n["long"] || longDays;
    }
  }; // create the timezone offset part of an iso timestamp
  // it's kind of nuts how involved this is
  // "+01:00", "+0100", or simply "+01"

  var isoOffset = function isoOffset(s) {
    var offset = s.timezone().current.offset;
    var isNegative = offset < 0;
    var minute = '00'; //handle 5.5 → '5:30'

    if (Math.abs(offset % 1) === 0.5) {
      minute = '30';

      if (offset >= 0) {
        offset = Math.floor(offset);
      } else {
        offset = Math.ceil(offset);
      }
    }

    if (isNegative) {
      //handle negative sign
      offset *= -1;
      offset = fns.zeroPad(offset, 2);
      offset = '-' + offset;
    } else {
      offset = fns.zeroPad(offset, 2);
      offset = '+' + offset;
    }

    offset = offset + ':' + minute; //'Z' means 00

    if (offset === '+00:00') {
      offset = 'Z';
    }

    return offset;
  };

  var _offset = isoOffset;
  var format = {
    day: function day(s) {
      return fns.titleCase(s.dayName());
    },
    'day-short': function dayShort(s) {
      return fns.titleCase(days["short"]()[s.day()]);
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
      return fns.titleCase(months["short"]()[s.month()]);
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
    'iso-month': function isoMonth(s) {
      return fns.zeroPad(s.month() + 1);
    },
    //1-based months
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
    'iso-year': function isoYear(s) {
      var year = s.year();
      var isNegative = year < 0;
      var str = fns.zeroPad(Math.abs(year), 4); //0-padded

      if (isNegative) {
        //negative years are for some reason 6-digits ('-00008')
        str = fns.zeroPad(str, 6);
        str = '-' + str;
      }

      return str;
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
    'hour-pad': function hourPad(s) {
      return fns.zeroPad(s.hour12());
    },
    'hour-24': function hour24(s) {
      return s.hour24();
    },
    'hour-24-pad': function hour24Pad(s) {
      return fns.zeroPad(s.hour24());
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
      return _offset(s);
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
      var year = s.format('iso-year');
      var month = fns.zeroPad(s.month() + 1); //1-based months

      var date = fns.zeroPad(s.date());
      var hour = fns.zeroPad(s.h24());
      var minute = fns.zeroPad(s.minute());
      var second = fns.zeroPad(s.second());
      var ms = fns.zeroPad(s.millisecond(), 3);

      var offset = _offset(s);

      return "".concat(year, "-").concat(month, "-").concat(date, "T").concat(hour, ":").concat(minute, ":").concat(second, ".").concat(ms).concat(offset); //2018-03-09T08:50:00.000-05:00
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
    nice: function nice(s) {
      return "".concat(months["short"]()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.time());
    },
    'nice-year': function niceYear(s) {
      return "".concat(months["short"]()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.year());
    },
    'nice-day': function niceDay(s) {
      return "".concat(days["short"]()[s.day()], " ").concat(fns.titleCase(months["short"]()[s.month()]), " ").concat(fns.ordinal(s.date()));
    },
    'nice-full': function niceFull(s) {
      return "".concat(s.dayName(), " ").concat(fns.titleCase(s.monthName()), " ").concat(fns.ordinal(s.date()), ", ").concat(s.time());
    }
  }; //aliases

  var aliases = {
    'day-name': 'day',
    'month-name': 'month',
    'iso 8601': 'iso',
    'time-h24': 'time-24',
    'time-12': 'time',
    'time-h12': 'time',
    tz: 'timezone',
    'day-num': 'day-number',
    'month-num': 'month-number',
    'month-iso': 'iso-month',
    'year-iso': 'iso-year',
    'nice-short': 'nice',
    mdy: 'numeric-us',
    dmy: 'numeric-uk',
    ymd: 'numeric',
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

  var format_1 = printFormat;
  var pad = fns.zeroPad;
  var formatTimezone = fns.formatTimezone; //parse this insane unix-time-templating thing, from the 19th century
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
      return formatTimezone(s.timezone().current.offset);
    },
    ZZ: function ZZ(s) {
      return formatTimezone(s.timezone().current.offset);
    },
    ZZZ: function ZZZ(s) {
      return formatTimezone(s.timezone().current.offset);
    },
    ZZZZ: function ZZZZ(s) {
      return formatTimezone(s.timezone().current.offset, ':');
    }
  };

  var addAlias = function addAlias(_char, to, n) {
    var name = _char;
    var toName = to;

    for (var _i7 = 0; _i7 < n; _i7 += 1) {
      mapping[name] = mapping[toName];
      name += _char;
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

    for (var _i8 = 1; _i8 < chars.length; _i8 += 1) {
      //support quoted substrings
      if (chars[_i8] === "'") {
        quoteOn = !quoteOn; //support '', meaning one tick

        if (quoteOn === true && chars[_i8 + 1] && chars[_i8 + 1] === "'") {
          quoteOn = true;
        } else {
          continue;
        }
      } //merge it with the last one


      if (quoteOn === true || chars[_i8] === arr[arr.length - 1][0]) {
        arr[arr.length - 1] += chars[_i8];
      } else {
        arr.push(chars[_i8]);
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

  var unixFmt_1 = unixFmt;
  var units$1 = ['year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute'];

  var doUnit = function doUnit(s, k) {
    var start = s.clone().startOf(k);
    var end = s.clone().endOf(k);
    var duration = end.epoch - start.epoch;
    var percent = (s.epoch - start.epoch) / duration;
    return parseFloat(percent.toFixed(2));
  }; //how far it is along, from 0-1


  var progress = function progress(s, unit) {
    if (unit) {
      unit = fns.normalize(unit);
      return doUnit(s, unit);
    }

    var obj = {};
    units$1.forEach(function (k) {
      obj[k] = doUnit(s, k);
    });
    return obj;
  };

  var progress_1 = progress; //round to either current, or +1 of this unit

  var nearest = function nearest(s, unit) {
    //how far have we gone?
    var prog = s.progress();
    unit = fns.normalize(unit); //fix camel-case for this one

    if (unit === 'quarterhour') {
      unit = 'quarterHour';
    }

    if (prog[unit] !== undefined) {
      // go forward one?
      if (prog[unit] > 0.5) {
        s = s.add(1, unit);
      } // go to start


      s = s.startOf(unit);
    } else if (s.silent === false) {
      console.warn("no known unit '" + unit + "'");
    }

    return s;
  };

  var nearest_1 = nearest; //increment until dates are the same

  var climb = function climb(a, b, unit) {
    var i = 0;
    a = a.clone();

    while (a.isBefore(b)) {
      //do proper, expensive increment to catch all-the-tricks
      a = a.add(1, unit);
      i += 1;
    } //oops, we went too-far..


    if (a.isAfter(b, unit)) {
      i -= 1;
    }

    return i;
  }; // do a thurough +=1 on the unit, until they match
  // for speed-reasons, only used on day, month, week.


  var diffOne = function diffOne(a, b, unit) {
    if (a.isBefore(b)) {
      return climb(a, b, unit);
    } else {
      return climb(b, a, unit) * -1; //reverse it
    }
  };

  var one = diffOne; // don't do anything too fancy here.
  // 2020 - 2019 may be 1 year, or 0 years
  // - '1 year difference' means 366 days during a leap year

  var fastYear = function fastYear(a, b) {
    var years = b.year() - a.year(); // should we decrement it by 1?

    a = a.year(b.year());

    if (a.isAfter(b)) {
      years -= 1;
    }

    return years;
  }; // use a waterfall-method for computing a diff of any 'pre-knowable' units
  // compute years, then compute months, etc..
  // ... then ms-math for any very-small units


  var diff = function diff(a, b) {
    // an hour is always the same # of milliseconds
    // so these units can be 'pre-calculated'
    var msDiff = b.epoch - a.epoch;
    var obj = {
      milliseconds: msDiff,
      seconds: parseInt(msDiff / 1000, 10)
    };
    obj.minutes = parseInt(obj.seconds / 60, 10);
    obj.hours = parseInt(obj.minutes / 60, 10); //do the year

    var tmp = a.clone();
    obj.years = fastYear(tmp, b);
    tmp = a.add(obj.years, 'year'); //there's always 12 months in a year...

    obj.months = obj.years * 12;
    tmp = a.add(obj.months, 'month');
    obj.months += one(tmp, b, 'month'); // there's always atleast 52 weeks in a year..
    // (month * 4) isn't as close

    obj.weeks = obj.years * 52;
    tmp = a.add(obj.weeks, 'week');
    obj.weeks += one(tmp, b, 'week'); // there's always atleast 7 days in a week

    obj.days = obj.weeks * 7;
    tmp = a.add(obj.days, 'day');
    obj.days += one(tmp, b, 'day');
    return obj;
  };

  var waterfall = diff;

  var reverseDiff = function reverseDiff(obj) {
    Object.keys(obj).forEach(function (k) {
      obj[k] *= -1;
    });
    return obj;
  }; // this method counts a total # of each unit, between a, b.
  // '1 month' means 28 days in february
  // '1 year' means 366 days in a leap year


  var main = function main(a, b, unit) {
    b = fns.beADate(b, a); //reverse values, if necessary

    var reversed = false;

    if (a.isAfter(b)) {
      var tmp = a;
      a = b;
      b = tmp;
      reversed = true;
    } //compute them all (i know!)


    var obj = waterfall(a, b);

    if (reversed) {
      obj = reverseDiff(obj);
    } //return just the requested unit


    if (unit) {
      //make sure it's plural-form
      unit = fns.normalize(unit);

      if (/s$/.test(unit) !== true) {
        unit += 's';
      }

      if (unit === 'dates') {
        unit = 'days';
      }

      return obj[unit];
    }

    return obj;
  };

  var diff$1 = main; //by spencermountain + Shaun Grady
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
    }
  }; //get number of hours/minutes... between the two dates

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
      earlier = earlier.add(max, unit);
      diff[unit] = max;
    }); //reverse it, if necessary

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

  var since_1 = since; //https://www.timeanddate.com/calendar/aboutseasons.html
  // Spring - from March 1 to May 31;
  // Summer - from June 1 to August 31;
  // Fall (autumn) - from September 1 to November 30; and,
  // Winter - from December 1 to February 28 (February 29 in a leap year).

  var seasons = {
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
  var quarters = [null, [0, 1], //jan 1
  [3, 1], //apr 1
  [6, 1], //july 1
  [9, 1] //oct 1
  ];
  var units$2 = {
    minute: function minute(s) {
      walk_1(s, {
        second: 0,
        millisecond: 0
      });
      return s;
    },
    quarterhour: function quarterhour(s) {
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

      walk_1(s, {
        second: 0,
        millisecond: 0
      });
      return s;
    },
    hour: function hour(s) {
      walk_1(s, {
        minute: 0,
        second: 0,
        millisecond: 0
      });
      return s;
    },
    day: function day(s) {
      walk_1(s, {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
      return s;
    },
    week: function week(s) {
      var original = s.clone();
      s = s.day(s._weekStart); //monday

      if (s.isAfter(original)) {
        s = s.subtract(1, 'week');
      }

      walk_1(s, {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
      return s;
    },
    month: function month(s) {
      walk_1(s, {
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
        walk_1(s, {
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

      for (var _i9 = 0; _i9 < seasons[hem].length; _i9++) {
        if (seasons[hem][_i9][0] === current) {
          //winter goes between years
          var year = s.year();

          if (current === 'winter' && s.month() < 3) {
            year -= 1;
          }

          walk_1(s, {
            year: year,
            month: seasons[hem][_i9][1],
            date: seasons[hem][_i9][2],
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
      walk_1(s, {
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
  units$2.date = units$2.day;

  var startOf = function startOf(a, unit) {
    var s = a.clone();
    unit = fns.normalize(unit);

    if (units$2[unit]) {
      return units$2[unit](s);
    }

    if (unit === 'summer' || unit === 'winter') {
      s = s.season(unit);
      return units$2.season(s);
    }

    return s;
  }; //piggy-backs off startOf


  var endOf = function endOf(a, unit) {
    var s = a.clone();
    unit = fns.normalize(unit);

    if (units$2[unit]) {
      s = units$2[unit](s);
      s = s.add(1, unit);
      s = s.subtract(1, 'milliseconds');
      return s;
    }

    return s;
  };

  var startOf_1 = {
    startOf: startOf,
    endOf: endOf
  }; //is it 'wednesday'?

  var isDay = function isDay(unit) {
    if (days["short"]().find(function (s) {
      return s === unit;
    })) {
      return true;
    }

    if (days["long"]().find(function (s) {
      return s === unit;
    })) {
      return true;
    }

    return false;
  }; // return a list of the weeks/months/days between a -> b
  // returns spacetime objects in the timezone of the input


  var every = function every(start) {
    var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var end = arguments.length > 2 ? arguments[2] : undefined;

    if (!unit || !end) {
      return [];
    } //cleanup unit param


    unit = fns.normalize(unit); //cleanup to param

    end = start.clone().set(end); //swap them, if they're backwards

    if (start.isAfter(end)) {
      var tmp = start;
      start = end;
      end = tmp;
    } //support 'every wednesday'


    var d = start.clone();

    if (isDay(unit)) {
      d = d.next(unit);
      unit = 'week';
    } else {
      d = d.next(unit);
    } //okay, actually start doing it


    var result = [];

    while (d.isBefore(end)) {
      result.push(d);
      d = d.add(1, unit);
    }

    return result;
  };

  var every_1 = every;

  var parseDst = function parseDst(dst) {
    if (!dst) {
      return [];
    }

    return dst.split('->');
  };

  var titleCase = function titleCase(str) {
    str = str[0].toUpperCase() + str.substr(1);
    str = str.replace(/\/gmt/, '/GMT');
    str = str.replace(/[\/_]([a-z])/gi, function (s) {
      return s.toUpperCase();
    });
    return str;
  }; //get metadata about this timezone


  var timezone = function timezone(s) {
    var zones = s.timezones;
    var tz = s.tz;

    if (zones.hasOwnProperty(tz) === false) {
      tz = find(s.tz, zones);
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
    } else if (summerTime(s.epoch, result.change.start, result.change.back, summer) === true) {
      result.current.offset = summer;
      result.current.isDST = result.hemisphere === 'North'; //dst 'on' in winter in north
    } else {
      //use 'winter' january-time
      result.current.offset = winter;
      result.current.isDST = result.hemisphere === 'South'; //dst 'on' in summer in south
    }

    return result;
  };

  var timezone_1 = timezone; //the spacetime instance methods (also, the API)

  var methods = {
    set: function set(input$1, tz) {
      var s = this.clone();
      s = input(s, input$1);

      if (tz) {
        this.tz = find(tz);
      }

      return s;
    },
    timezone: function timezone() {
      return timezone_1(this);
    },
    isDST: function isDST() {
      return timezone_1(this).current.isDST;
    },
    hasDST: function hasDST() {
      return timezone_1(this).hasDst;
    },
    offset: function offset() {
      return timezone_1(this).current.offset * 60;
    },
    hemisphere: function hemisphere() {
      return timezone_1(this).hemisphere;
    },
    format: function format(fmt) {
      return format_1(this, fmt);
    },
    unixFmt: function unixFmt(fmt) {
      return unixFmt_1(this, fmt);
    },
    startOf: function startOf(unit) {
      return startOf_1.startOf(this, unit);
    },
    endOf: function endOf(unit) {
      return startOf_1.endOf(this, unit);
    },
    leapYear: function leapYear() {
      var year = this.year();
      return fns.isLeapYear(year);
    },
    progress: function progress(unit) {
      return progress_1(this, unit);
    },
    nearest: function nearest(unit) {
      return nearest_1(this, unit);
    },
    diff: function diff(d, unit) {
      return diff$1(this, d, unit);
    },
    since: function since(d) {
      if (!d) {
        d = this.clone().set();
      }

      return since_1(this, d);
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
    "goto": function goto(tz) {
      var s = this.clone();
      s.tz = find(tz, s.timezones); //science!

      return s;
    },
    //get each week/month/day between a -> b
    every: function every(unit, to) {
      return every_1(this, unit, to);
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
      console.log(format_1(this, 'nice-short'));
      return this;
    },
    logYear: function logYear() {
      console.log('');
      console.log(format_1(this, 'full-short'));
      return this;
    },
    debug: function debug() {
      var tz = this.timezone();
      var date = this.format('MM') + ' ' + this.format('date-ordinal') + ' ' + this.year();
      date += '\n     - ' + this.format('time');
      console.log('\n\n', date + '\n     - ' + tz.name + ' (' + tz.current.offset + ')');
      return this;
    },
    //alias of 'since' but opposite - like moment.js
    from: function from(d) {
      d = this.clone().set(d);
      return d.since(this);
    },
    fromNow: function fromNow() {
      var d = this.clone().set(Date.now());
      return d.since(this);
    },
    weekStart: function weekStart(input) {
      //accept a number directly
      if (typeof input === 'number') {
        this._weekStart = input;
        return this;
      }

      if (typeof input === 'string') {
        // accept 'wednesday'
        input = input.toLowerCase().trim();

        var _num4 = days["short"]().indexOf(input);

        if (_num4 === -1) {
          _num4 = days["long"]().indexOf(input);
        }

        if (_num4 === -1) {
          _num4 = 1; //go back to default
        }

        this._weekStart = _num4;
      } else {
        console.warn('Spacetime Error: Cannot understand .weekStart() input:', input);
      }

      return this;
    }
  }; // aliases

  methods.inDST = methods.isDST;
  methods.round = methods.nearest;
  methods.each = methods.every;
  var methods_1 = methods; // javascript setX methods like setDate() can't be used because of the local bias
  //these methods wrap around them.

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

    for (var _i10 = 0; _i10 < arr.length; _i10++) {
      var want = tmp[arr[_i10]]();

      s[arr[_i10]](want);
    }

    return s;
  };

  var set = {
    milliseconds: function milliseconds(s, n) {
      n = validate(n);
      var current = s.millisecond();
      var diff = current - n; //milliseconds to shift by

      return s.epoch - diff;
    },
    seconds: function seconds(s, n) {
      n = validate(n);
      var diff = s.second() - n;
      var shift = diff * milliseconds.second;
      return s.epoch - shift;
    },
    minutes: function minutes(s, n) {
      n = validate(n);
      var old = s.clone();
      var diff = s.minute() - n;
      var shift = diff * milliseconds.minute;
      s.epoch -= shift;
      confirm(s, old, 'second');
      return s.epoch;
    },
    hours: function hours(s, n) {
      n = validate(n);

      if (n >= 24) {
        n = 24;
      } else if (n < 0) {
        n = 0;
      }

      var old = s.clone();
      var diff = s.hour() - n;
      var shift = diff * milliseconds.hour;
      s.epoch -= shift;
      walk_1(s, {
        hour: n
      });
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
      n = validate(n); //avoid setting february 31st

      if (n > 28) {
        var max = monthLengths_1[s.month()];

        if (n > max) {
          n = max;
        }
      } //avoid setting < 0


      if (n <= 0) {
        n = 1;
      }

      walk_1(s, {
        date: n
      });
      return s.epoch;
    },
    //this one's tricky
    month: function month(s, n) {
      if (typeof n === 'string') {
        n = months.mapping()[n.toLowerCase()];
      }

      n = validate(n); //don't go past december

      if (n >= 12) {
        n = 11;
      }

      if (n <= 0) {
        n = 0;
      }

      var date = s.date(); //there's no 30th of february, etc.

      if (date > monthLengths_1[n]) {
        //make it as close as we can..
        date = monthLengths_1[n];
      }

      walk_1(s, {
        month: n,
        date: date
      });
      return s.epoch;
    },
    year: function year(s, n) {
      n = validate(n);
      walk_1(s, {
        year: n
      });
      return s.epoch;
    },
    dayOfYear: function dayOfYear(s, n) {
      n = validate(n);
      var old = s.clone();
      n -= 1; //days are 1-based

      if (n <= 0) {
        n = 0;
      } else if (n >= 365) {
        n = 364;
      }

      s = s.startOf('year');
      s = s.add(n, 'day');
      confirm(s, old, 'hour');
      return s.epoch;
    }
  };
  var methods$1 = {
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
        return s;
      }

      return d.getHours();
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
    // hour in 12h format
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
    //some ambiguity here with 12/24h
    time: function time(str) {
      if (str !== undefined) {
        var s = this.clone();
        s.epoch = set.time(s, str);
        return s;
      }

      return "".concat(this.h12(), ":").concat(fns.zeroPad(this.minute())).concat(this.ampm());
    },
    // either 'am' or 'pm'
    ampm: function ampm(input) {
      var which = 'am';
      var hour = this.hour();

      if (hour >= 12) {
        which = 'pm';
      }

      if (typeof input !== 'string') {
        return which;
      } //okay, we're doing a setter


      var s = this.clone();
      input = input.toLowerCase().trim(); //ampm should never change the day
      // - so use `.hour(n)` instead of `.minus(12,'hour')`

      if (hour >= 12 && input === 'am') {
        //noon is 12pm
        hour -= 12;
        return s.hour(hour);
      }

      if (hour < 12 && input === 'pm') {
        hour += 12;
        return s.hour(hour);
      }

      return s;
    },
    //some hard-coded times of day, like 'noon'
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
    //parse a proper iso string
    iso: function iso(num) {
      if (num !== undefined) {
        return this.set(num);
      }

      return this.format('iso');
    }
  };
  var _01Time = methods$1;
  var methods$2 = {
    // # day in the month
    date: function date(num) {
      if (num !== undefined) {
        var s = this.clone();
        s.epoch = set.date(s, num);
        return s;
      }

      return this.d.getDate();
    },
    //like 'wednesday' (hard!)
    day: function day(input) {
      if (input === undefined) {
        return this.d.getDay();
      }

      var original = this.clone();
      var want = input; // accept 'wednesday'

      if (typeof input === 'string') {
        input = input.toLowerCase();
        want = days["short"]().indexOf(input);

        if (want === -1) {
          want = days["long"]().indexOf(input);
        }
      } //move approx


      var day = this.d.getDay();
      var diff = day - want;
      var s = this.subtract(diff * 24, 'hours'); //tighten it back up

      walk_1(s, {
        hour: original.hour(),
        minute: original.minute(),
        second: original.second()
      });
      return s;
    },
    //these are helpful name-wrappers
    dayName: function dayName(input) {
      if (input === undefined) {
        return days["long"]()[this.day()];
      }

      var s = this.clone();
      s = s.day(input);
      return s;
    },
    //either name or number
    month: function month(input) {
      if (input !== undefined) {
        var s = this.clone();
        s.epoch = set.month(s, input);
        return s;
      }

      return this.d.getMonth();
    }
  };
  var _02Date = methods$2;

  var clearMinutes = function clearMinutes(s) {
    s = s.minute(0);
    s = s.second(0);
    s = s.millisecond(1);
    return s;
  };

  var methods$3 = {
    // day 0-366
    dayOfYear: function dayOfYear(num) {
      if (num !== undefined) {
        var s = this.clone();
        s.epoch = set.dayOfYear(s, num);
        return s;
      } //days since newyears - jan 1st is 1, jan 2nd is 2...


      var sum = 0;
      var month = this.d.getMonth();
      var tmp; //count the num days in each month

      for (var _i11 = 1; _i11 <= month; _i11++) {
        tmp = new Date();
        tmp.setDate(1);
        tmp.setYear(this.d.getFullYear()); //the year matters, because leap-years

        tmp.setHours(1);
        tmp.setMinutes(1);
        tmp.setMonth(_i11);
        tmp.setHours(-2); //the last day of the month

        sum += tmp.getDate();
      }

      return sum + this.d.getDate();
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
      } //speed it up, if we can


      var i = 0;
      var skipWeeks = this.month() * 4;
      tmp.epoch += milliseconds.week * skipWeeks;
      i += skipWeeks;

      for (; i < 52; i++) {
        if (tmp.epoch > thisOne) {
          return i;
        }

        tmp = tmp.add(1, 'week');
      }

      return 52;
    },
    //'january'
    monthName: function monthName(input) {
      if (input === undefined) {
        return months["long"]()[this.month()];
      }

      var s = this.clone();
      s = s.month(input);
      return s;
    },
    //q1, q2, q3, q4
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

      for (var _i12 = 1; _i12 < quarters.length; _i12++) {
        if (month < quarters[_i12][0]) {
          return _i12 - 1;
        }
      }

      return 4;
    },
    //spring, summer, winter, fall
    season: function season(input) {
      var hem = 'north';

      if (this.hemisphere() === 'South') {
        hem = 'south';
      }

      if (input !== undefined) {
        var s = this.clone();

        for (var _i13 = 0; _i13 < seasons[hem].length; _i13++) {
          if (input === seasons[hem][_i13][0]) {
            s = s.month(seasons[hem][_i13][1]);
            s = s.date(1);
            s = s.startOf('day');
          }
        }

        return s;
      }

      var month = this.d.getMonth();

      for (var _i14 = 0; _i14 < seasons[hem].length - 1; _i14++) {
        if (month >= seasons[hem][_i14][1] && month < seasons[hem][_i14 + 1][1]) {
          return seasons[hem][_i14][0];
        }
      }

      return 'winter';
    },
    //the year number
    year: function year(num) {
      if (num !== undefined) {
        var s = this.clone();
        s.epoch = set.year(s, num);
        return s;
      }

      return this.d.getFullYear();
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
    }
  };
  var _03Year = methods$3;
  var methods$4 = Object.assign({}, _01Time, _02Date, _03Year); //aliases

  methods$4.milliseconds = methods$4.millisecond;
  methods$4.seconds = methods$4.second;
  methods$4.minutes = methods$4.minute;
  methods$4.hours = methods$4.hour;
  methods$4.hour24 = methods$4.hour;
  methods$4.h12 = methods$4.hour12;
  methods$4.h24 = methods$4.hour24;
  methods$4.days = methods$4.day;

  var addMethods = function addMethods(Space) {
    //hook the methods into prototype
    Object.keys(methods$4).forEach(function (k) {
      Space.prototype[k] = methods$4[k];
    });
  };

  var query = addMethods;
  var order$1 = ['millisecond', 'second', 'minute', 'hour', 'date', 'month'];
  var keep = {
    second: order$1.slice(0, 1),
    minute: order$1.slice(0, 2),
    quarterhour: order$1.slice(0, 2),
    hour: order$1.slice(0, 3),
    date: order$1.slice(0, 4),
    month: order$1.slice(0, 4),
    quarter: order$1.slice(0, 4),
    season: order$1.slice(0, 4),
    year: order$1,
    decade: order$1,
    century: order$1
  };
  keep.week = keep.hour;
  keep.season = keep.date;
  keep.quarter = keep.date; // Units need to be dst adjuested

  var dstAwareUnits = {
    year: true,
    quarter: true,
    season: true,
    month: true,
    week: true,
    day: true
  };
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

  var addMethods$1 = function addMethods$1(SpaceTime) {
    SpaceTime.prototype.add = function (num, unit) {
      var s = this.clone();

      if (!unit || num === 0) {
        return s; //don't bother
      }

      var old = this.clone();
      unit = fns.normalize(unit); //move forward by the estimated milliseconds (rough)

      if (milliseconds[unit]) {
        s.epoch += milliseconds[unit] * num;
      } else if (unit === 'week') {
        s.epoch += milliseconds.day * (num * 7);
      } else if (unit === 'quarter' || unit === 'season') {
        s.epoch += milliseconds.month * (num * 4);
      } else if (unit === 'season') {
        s.epoch += milliseconds.month * (num * 4);
      } else if (unit === 'quarterhour') {
        s.epoch += milliseconds.minute * 15 * num;
      } //now ensure our milliseconds/etc are in-line


      var want = {};

      if (keep[unit]) {
        keep[unit].forEach(function (u) {
          want[u] = old[u]();
        });
      }

      if (dstAwareUnits[unit]) {
        var _diff = old.timezone().current.offset - s.timezone().current.offset;

        s.epoch += _diff * 3600 * 1000;
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
            s.epoch += milliseconds.week;
          } //these are easier
          else if (unit === 'decade') {
              want.year = s.year() + 10;
            } else if (unit === 'century') {
              want.year = s.year() + 100;
            } //keep current date, unless the month doesn't have it.


      if (keepDate[unit]) {
        var max = monthLengths_1[want.month];
        want.date = old.date();

        if (want.date > max) {
          want.date = max;
        }
      }

      walk_1(s, want);
      return s;
    }; //subtract is only add *-1


    SpaceTime.prototype.subtract = function (num, unit) {
      var s = this.clone();
      return s.add(num * -1, unit);
    }; //add aliases


    SpaceTime.prototype.minus = SpaceTime.prototype.subtract;
    SpaceTime.prototype.plus = SpaceTime.prototype.add;
  };

  var add = addMethods$1; //make a string, for easy comparison between dates

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

  var addMethods$2 = function addMethods$2(SpaceTime) {
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

  var same = addMethods$2;

  var addMethods$3 = function addMethods$3(SpaceTime) {
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

  var compare = addMethods$3;

  var addMethods$4 = function addMethods$4(SpaceTime) {
    var methods = {
      i18n: function i18n(data) {
        //change the day names
        if (fns.isObject(data.days)) {
          days.set(data.days);
        } //change the month names


        if (fns.isObject(data.months)) {
          months.set(data.months);
        }
      }
    }; //hook them into proto

    Object.keys(methods).forEach(function (k) {
      SpaceTime.prototype[k] = methods[k];
    });
  };

  var i18n = addMethods$4;
  var timezones = unpack; //fake timezone-support, for fakers (es5 class)

  var SpaceTime = function SpaceTime(input$1, tz) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    //the holy moment
    this.epoch = null; //the shift for the given timezone

    this.tz = find(tz, timezones); //whether to output warnings to console

    this.silent = options.silent || true; //does the week start on sunday, or monday:

    this._weekStart = 1; //default to monday

    if (options.weekStart !== undefined) {
      this._weekStart = options.weekStart;
    } //add getter/setters


    Object.defineProperty(this, 'd', {
      //return a js date object
      get: function get() {
        var offset = quick(this); //every computer is somewhere- get this computer's built-in offset

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

    if (input$1 !== undefined || input$1 === null) {
      var tmp = input(this, input$1, tz);
      this.epoch = tmp.epoch;
    }
  }; //(add instance methods to prototype)


  Object.keys(methods_1).forEach(function (k) {
    SpaceTime.prototype[k] = methods_1[k];
  }); // ¯\_(ツ)_/¯

  SpaceTime.prototype.clone = function () {
    return new SpaceTime(this.epoch, this.tz, {
      silent: this.silent,
      weekStart: this._weekStart
    });
  }; //append more methods


  query(SpaceTime);
  add(SpaceTime);
  same(SpaceTime);
  compare(SpaceTime);
  i18n(SpaceTime);
  var spacetime = SpaceTime; // const timezones = require('../data');

  var whereIts = function whereIts(a, b) {
    var start = new spacetime(null);
    var end = new spacetime(null);
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

      var m = new spacetime(null, tz);
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

  var whereIts_1 = whereIts;
  var _version = '6.1.0';

  var main$1 = function main$1(input, tz, options) {
    return new spacetime(input, tz, options);
  }; //some helper functions on the main method


  main$1.now = function (tz, options) {
    return new spacetime(new Date().getTime(), tz, options);
  };

  main$1.today = function (tz, options) {
    var s = new spacetime(new Date().getTime(), tz, options);
    return s.startOf('day');
  };

  main$1.tomorrow = function (tz, options) {
    var s = new spacetime(new Date().getTime(), tz, options);
    return s.add(1, 'day').startOf('day');
  };

  main$1.yesterday = function (tz, options) {
    var s = new spacetime(new Date().getTime(), tz, options);
    return s.subtract(1, 'day').startOf('day');
  };

  main$1.extend = function (obj) {
    Object.keys(obj).forEach(function (k) {
      spacetime.prototype[k] = obj[k];
    });
    return this;
  }; //find tz by time


  main$1.whereIts = whereIts_1;
  main$1.version = _version; //aliases:

  main$1.plugin = main$1.extend;
  var src = main$1;

  var spacetime$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': src
  });

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
  };

  var _reduce = reduceTo;

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

  var methods$5 = {
    centuries: function centuries(start, end, n) {
      var ticks = allTicks(start, end, 'century');
      ticks = _reduce(ticks, n);
      var fmt = '{year}';

      if (start.diff(end, 'year') > 6) {
        fmt = '{year}';
      }

      ticks = formatTicks(ticks, fmt, start, end);
      return ticks;
    },
    decades: function decades(start, end, n) {
      var ticks = allTicks(start, end, 'decade');
      ticks = _reduce(ticks, n);
      var fmt = '{year}';

      if (start.diff(end, 'year') > 6) {
        fmt = '{year}';
      }

      ticks = formatTicks(ticks, fmt, start, end);
      return ticks;
    },
    years: function years(start, end, n) {
      var ticks = allTicks(start, end, 'year');
      ticks = _reduce(ticks, n);
      var fmt = '{month-short} {year-short}';

      if (start.diff(end, 'year') > 6) {
        fmt = '{year}';
      }

      ticks = formatTicks(ticks, fmt, start, end);
      return ticks;
    },
    months: function months(start, end, n) {
      var ticks = allTicks(start, end, 'month');
      ticks = _reduce(ticks, n);
      var fmt = '{month-short} {date}';

      if (start.isSame(end, 'year') === false) {
        fmt = '{month-short} {year}';
      }

      ticks = formatTicks(ticks, fmt, start, end);
      return ticks;
    },
    days: function days(start, end, n) {
      var ticks = allTicks(start, end, 'day');
      ticks = _reduce(ticks, n);
      var fmt = '{month-short} {date}';
      ticks = formatTicks(ticks, fmt, start, end);
      return ticks;
    },
    hours: function hours(start, end, n) {
      var ticks = allTicks(start, end, 'hour');
      ticks = _reduce(ticks, n);
      var fmt = '{time}';

      if (start.isSame(end, 'day') === false) {
        fmt = '{day-short} {hour}{ampm}';
      }

      ticks = formatTicks(ticks, fmt, start, end);
      return ticks;
    },
    minutes: function minutes(start, end, n) {
      var ticks = allTicks(start, end, 'minute');
      ticks = _reduce(ticks, n);
      var fmt = '{time}';
      ticks = formatTicks(ticks, fmt, start, end);
      return ticks;
    }
  };
  var methods_1$1 = methods$5;

  var _version$1 = '0.2.1';

  function getCjsExportFromNamespace$1 (n) {
  	return n && n['default'] || n;
  }

  var spacetime$2 = getCjsExportFromNamespace$1(spacetime$1);

  var chooseMethod = function chooseMethod(start, end) {
    var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;
    var diff = start.diff(end);

    if (diff.years > 300) {
      return methods_1$1.centuries(start, end, n);
    }

    if (diff.years > 30) {
      return methods_1$1.decades(start, end, n);
    }

    if (diff.years > 3) {
      return methods_1$1.years(start, end, n);
    }

    if (diff.months > 3) {
      return methods_1$1.months(start, end, n);
    }

    if (diff.days > 3) {
      return methods_1$1.days(start, end, n);
    }

    if (diff.hours > 3) {
      return methods_1$1.hours(start, end, n);
    }

    if (diff.minutes > 3) {
      return methods_1$1.minutes(start, end, n);
    }

    return methods_1$1.months(start, end, n);
  }; //flip it around backwards


  var reverseTicks = function reverseTicks(ticks) {
    ticks = ticks.map(function (o) {
      o.value = 1 - o.value;
      return o;
    });
    return ticks.reverse();
  };

  var spacetimeTicks = function spacetimeTicks(start, end) {
    var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;
    var reverse = false;
    start = spacetime$2(start);
    end = spacetime$2(end); //reverse them, if necessary

    if (start.epoch > end.epoch) {
      reverse = true;
      var tmp = start.epoch;
      start.epoch = end.epoch;
      end.epoch = tmp;
    } // nudge first one back 1 minute


    if (start.time() === '12:00am') {
      start = start.minus(1, 'minute');
    }

    var ticks = chooseMethod(start, end, n); //support backwards ticks

    if (reverse === true) {
      ticks = reverseTicks(ticks);
    }

    return ticks;
  };

  spacetimeTicks.version = _version$1;
  var src$1 = spacetimeTicks;

  return src$1;

}));
//# sourceMappingURL=spacetime-ticks.js.map
