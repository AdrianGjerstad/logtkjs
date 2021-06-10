const format = require("./format.js");

(function(API) {
  /**
   * Locale Datastore
   *
   * This object contains a collection of locale data for various purposes, such
   * as proper formatting of dates.
   *
   * Each locale includes a set of entries:
   * - weekdays: List of unabbreviated weekday names *STARTING WITH SUNDAY*
   * - weekdays_abbr: List of abbreviated weekday names *STARTING WITH SUNDAY*
   * - months: List of unabbreviated month names
   * - months_abbr: List of abbreviated month names
   * - ap_abbr: Abbreviated form of "am" and "pm" (lowercase if possible)
   * - ap: Unabbreviated form of "am" and "pm" (lowercase if possible)
   * - AP_abbr: Abbreviated form of "am" and "pm" (uppercase if possible)
   * - AP: Unabbreviated form of "am" and "pm" (uppercase if possible)
   * - clock: Locale's timestamp format (using strftime)
   * - date: Locale's date format (using strftime)
   * - time: Locale's time format (using strftime)
   *
   * Please note that if the process locale cannot be resolved, (e.g. the locale
   * does not exist in this store), the default is "C", which adheres to ISO
   * standards as closely as possible.
   */
  let locData = {
    "C": {
      weekdays: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
      weekdays_abbr: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
      months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
      months_abbr: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
      ap_abbr: [ "a", "p" ],
      ap: [ "am", "pm" ],
      AP_abbr: [ "A", "P" ],
      AP: [ "AM", "PM" ],
      clock: "%u%Y-%m-%dT%H:%M:%S.%fZ",
      date: "%u%Y-%m-%dZ",
      time: "%u%H:%M:%S.%fZ"
    },
    "en_US": {
      weekdays: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
      weekdays_abbr: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
      months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
      months_abbr: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
      ap_abbr: [ "a", "p" ],
      ap: [ "am", "pm" ],
      AP_abbr: [ "A", "P" ],
      AP: [ "AM", "PM" ],
      clock: "%-m/%-d/%y %h:%M:%S %P",
      date: "%-m/%-d/%y",
      time: "%h:%M:%S %P"
    },
    "es_MX": {
      weekdays: [ "domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sábado" ],
      weekdays_abbr: [ "dom", "lun", "mar", "mie", "jue", "vie", "sáb" ],
      months: [ "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre" ],
      months_abbr: [ "ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic" ],
      ap_abbr: [ "a", "p" ],
      ap: [ "am", "pm" ],
      AP_abbr: [ "A", "P" ],
      AP: [ "AM", "PM" ],
      clock: "%-d/%-m/%y %h:%M:%S %P",
      date: "%-d/%-m/%y",
      time: "%h:%M:%S %P"
    }
  };
  
  // Standard C locale
  const localeC = "C";

  /**
   * strftime(Date, String) -> String
   *
   * Timestamp formatter utility
   *
   * Format atoms:
   *   %%   -  Literal '%'
   *   %a   -  Abbreviated weekday name (locale-based)
   *   %A   -  Full weekday name (locale-based)
   *   %b   -  Abbreviated month name (locale-based)
   *   %B   -  Full month name (locale-based)
   *   %c   -  Locale-appopriate date+time format
   *   %d   -  Date (zero-padded)
   *   %-d  -  Date (as-is)
   *   %f   -  Milliseconds (zero-padded)
   *   %-f  -  Milliseconds (as-is)
   *   %h   -  12-Hour Count (zero-padded)
   *   %-h  -  12-Hour Count (as-is)
   *   %H   -  24-Hour Count (zero-padded)
   *   %-H  -  24-Hour Count (as-is)
   *   %j   -  Day of Year (zero-padded)
   *   %-j  -  Day of Year (as-is)
   *   %m   -  Month as Number (zero-padded)
   *   %-m  -  Month as Number (as-is)
   *   %M   -  Minute (zero-padded)
   *   %-M  -  Minute (as-is)
   *   %p   -  "am" or "pm" (locale-appropriate)
   *   %-p  -  "a" or "p" (locale-appropriate)
   *   %P   -  "AM" or "PM" (locale-appropriate)
   *   %-P  -  "A" or "P" (local-appropriate)
   *   %S   -  Second (zero-padded)
   *   %-S  -  Second (as-is)
   *   %u   -  Switch between using UTC or local TZ (default: local)
   *   %w   -  Weekday (number)
   *   %x   -  Locale-appropriate date format
   *   %X   -  Locale-appropriate time format
   *   %y   -  Year w/o Century (zero-padded)
   *   %-y  -  Year w/o Century (as-is)
   *   %Y   -  Year with Century
   *   %z   -  Timezone offset in format +/-HHMM
   *   %:z  -  Timezone offset in format +/-HH:MM
   */
  function strftime(d, fmt, locstr=null) {
    if (locstr === null) {
      try {
        locstr = process.env.LANG.split('.')[0];
      } catch(e) {
        locstr = localeC;
      }
    }

    let locale;
    try {
      locale = locData[locstr] || locData[localeC];
    } catch(e) {
      locale = locData[localeC];
    }

    let utc = false;

    return format.sprintfcb(fmt, function({ sig, flags }) {
      if (sig === "a") {
        if (flags === "") {
          if (utc) return locale.weekdays_abbr[d.getUTCDay()];
          return locale.weekdays_abbr[d.getDay()];
        }
      } else if (sig === "A") {
        if (flags === "") {
          if (utc) return locale.weekdays[d.getUTCDay()];
          return locale.weekdays[d.getDay()];
        }
      } else if (sig === "b") {
        if (flags === "") {
          if (utc) return locale.months_abbr[d.getUTCMonth()];
          return locale.months_abbr[d.getMonth()];
        }
      } else if (sig === "B") {
        if (flags === "") {
          if (utc) return locale.months[d.getUTCMonth()];
          return locale.months[d.getMonth()];
        }
      } else if (sig === "c") {
        if (flags === "") {
          return strftime(d, locale.clock, locstr);
        }
      } else if (sig === "d") {
        if (flags === "") {
          if (utc) return d.getUTCDate().toString().padStart(2, '0');
          return d.getDate().toString().padStart(2, '0');
        } else if (flags === "-") {
          if (utc) return d.getUTCDate();
          return d.getDate();
        }
      } else if (sig === "f") {
        if (flags === "") {
          if (utc) return d.getUTCMilliseconds().toString().padStart(3, '0');
          return d.getMilliseconds().toString().padStart(3, '0');
        } else if (flags === "-") {
          if (utc) return d.getUTCMilliseconds();
          return d.getMilliseconds();
        }
      } else if (sig === "h") {
        if (flags === "") {
          if (utc) return (d.getUTCHours()%12 === 0 ? 12 : d.getUTCHours()%12).toString().padStart(2, '0');
          return (d.getHours()%12 === 0 ? 12 : d.getHours()%12).toString().padStart(2, '0');
        } else if (flags === "-") {
          if (utc) return (d.getUTCHours()%12 === 0) ? 12 : d.getUTCHours()%12;
          return d.getHours()%12 === 0 ? 12 : d.getHours()%12;
        }
      } else if (sig === "H") {
        if (flags === "") {
          if (utc) return d.getUTCHours().toString().padStart(2, '0');
          return d.getHours().toString().padStart(2, '0');
        } else if (flags === "-") {
          if (utc) return d.getUTCHours();
          return d.getHours();
        }
      } else if (sig === "j") {
        let doy;
        if (utc) doy = Math.floor((d - new Date(d.getUTCFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        else doy = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

        if (flags === "") {
          return doy.toString().padStart(3, '0');
        } else if (flags === "-") {
          return doy;
        }
      } else if (sig === "m") {
        if (flags === "") {
          if (utc) return (d.getUTCMonth()+1).toString().padStart(2, '0');
          return (d.getMonth()+1).toString().padStart(2, '0');
        } else if (flags === "-") {
          if (utc) return d.getUTCMonth()+1;
          return d.getMonth()+1;
        }
      } else if (sig === "M") {
        if (flags === "") {
          if (utc) return d.getUTCMinutes().toString().padStart(2, '0');
          return d.getMinutes().toString().padStart(2, '0');
        } else if (flags === "-") {
          if (utc) return d.getUTCMinutes();
          return d.getMinutes();
        }
      } else if (sig === "p") {
        if (flags === "") {
          if (utc) return locale.ap[Math.floor(d.getUTCHours()/12)];
          return locale.ap[Math.floor(d.getHours()/12)];
        } else if (flags === "-") {
          if (utc) return locale.ap_abbr[Math.floor(d.getUTCHours()/12)];
          return locale.ap_abbr[Math.floor(d.getHours()/12)];
        }
      } else if (sig === "P") {
        if (flags === "") {
          if (utc) return locale.AP[Math.floor(d.getUTCHours()/12)];
          return locale.AP[Math.floor(d.getHours()/12)];
        } else if (flags === "-") {
          if (utc) return locale.AP_abbr[Math.floor(d.getUTCHours()/12)];
          return locale.AP_abbr[Math.floor(d.getHours()/12)];
        }
      } else if (sig === "S") {
        if (flags === "") {
          if (utc) return d.getUTCSeconds().toString().padStart(2, '0');
          return d.getSeconds().toString().padStart(2, '0');
        } else if (flags === "-") {
          if (utc) return d.getUTCSeconds();
          return d.getSeconds();
        }
      } else if (sig === "u") {
        if (flags === "") {
          utc = !utc;
          return "";  // %u acts as a switch, and does not alter output.
        }
      } else if (sig === "w") {
        if (flags === "") {
          if (utc) return d.getUTCDay();
          return d.getDay();
        }
      } else if (sig === "x") {
        if (flags === "") {
          return strftime(d, locale.date, locstr);
        }
      } else if (sig === "X") {
        if (flags === "") {
          return strftime(d, locale.time, locstr);
        }
      } else if (sig === "y") {
        if (flags === "") {
          if (utc) return d.getUTCFullYear().toString().substring(2);
          return d.getFullYear().toString().substring(2);
        } else if (flags === "-") {
          if (utc) return parseInt(d.getUTCFullYear().toString().substring(2));
          return parseInt(d.getFullYear().toString().substring(2));
        }
      } else if (sig === "Y") {
        if (flags === "") {
          if (utc) return d.getUTCFullYear();
          return d.getFullYear();
        }
      } else if (sig === "z") {
        let sign, hours, minutes;
        if (utc) sign = "+";
        sign = d.getTimezoneOffset() < 0 ? "+" : "-"
        if (utc) hours = "00";
        hours = Math.floor(Math.abs(d.getTimezoneOffset())/60).toString().padStart(2, '0');
        if (utc) minutes = "00";
        minutes = (Math.abs(d.getTimezoneOffset())%60).toString().padStart(2, '0');

        if (flags === "") {
          return sign + hours + minutes;
        } else if (flags === ":") {
          return sign + hours + ":" + minutes;
        }
      }

      throw new Error("Not a valid format atom for strftime: '%" + flags + sig + "'");
    });
  }

  API("strftime", strftime);

  API("locale_data", locData);

  function timestamp(fmt, locstr=null) {
    return function(d) {
      return strftime(d, fmt, locstr);
    }
  }

  API("timestamp", timestamp);  // Factory method to build timestamps of a consistent format.
})(function(n, f) {
  module.exports[n] = f;
});

