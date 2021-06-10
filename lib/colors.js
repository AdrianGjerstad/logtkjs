// Implementation of all color factories

(function(API) {
  function createTheme(name, colors) {
    API(name, {
      default_: function default_(x) { return x; },
      string: function string(x) {
        return "\x1b[38;5;" + colors.green + "m" + x + "\x1b[39m";
      },
      number: function number(x) {
        return "\x1b[38;5;" + colors.yellow + "m" + x + "\x1b[39m";
      },
      keyword: function keyword(x) {
        return "\x1b[38;5;" + colors.red + "m" + x + "\x1b[39m";
      },
      constant: function constant(x) {
        return "\x1b[38;5;" + colors.cyan + "m" + x + "\x1b[39m";
      },
      statement: function statement(x) {
        return "\x1b[38;5;" + colors.purple + "m" + x + "\x1b[39m";
      },
      comment: function comment(x) {
        return "\x1b[38;5;" + colors.comment + "m" + x + "\x1b[39m";
      },
      black: function black(x) {
        return "\x1b[38;5;" + colors.black + "m" + x + "\x1b[39m";
      },
      red: function red(x) {
        return "\x1b[38;5;" + colors.red + "m" + x + "\x1b[39m";
      },
      green: function green(x) {
        return "\x1b[38;5;" + colors.green + "m" + x + "\x1b[39m";
      },
      yellow: function yellow(x) {
        return "\x1b[38;5;" + colors.yellow + "m" + x + "\x1b[39m";
      },
      blue: function blue(x) {
        return "\x1b[38;5;" + colors.blue + "m" + x + "\x1b[39m";
      },
      purple: function purple(x) {
        return "\x1b[38;5;" + colors.purple + "m" + x + "\x1b[39m";
      },
      cyan: function cyan(x) {
        return "\x1b[38;5;" + colors.cyan + "m" + x + "\x1b[39m";
      },
      white: function white(x) {
        return "\x1b[38;5;" + colors.white + "m" + x + "\x1b[39m";
      },
      bgBlack: function bgBlack(x) {
        return "\x1b[48;5;" + colors.black + "m" + x + "\x1b[49m";
      },
      bgRed: function bgRed(x) {
        return "\x1b[48;5;" + colors.red + "m" + x + "\x1b[49m";
      },
      bgGreen: function bgGreen(x) {
        return "\x1b[48;5;" + colors.green + "m" + x + "\x1b[49m";
      },
      bgYellow: function bgYellow(x) {
        return "\x1b[48;5;" + colors.yellow + "m" + x + "\x1b[49m";
      },
      bgBlue: function bgBlue(x) {
        return "\x1b[48;5;" + colors.blue + "m" + x + "\x1b[49m";
      },
      bgPurple: function bgPurple(x) {
        return "\x1b[48;5;" + colors.purple + "m" + x + "\x1b[49m";
      },
      bgCyan: function bgCyan(x) {
        return "\x1b[48;5;" + colors.cyan + "m" + x + "\x1b[49m";
      },
      bgWhite: function bgWhite(x) {
        return "\x1b[48;5;" + colors.white + "m" + x + "\x1b[49m";
      }
    });
  }
  
  // No colors
  API("none", {
    default_: function default_(x) { return x; },
    string: function string(x) {
      return x;
    },
    number: function number(x) {
      return x;
    },
    keyword: function keyword(x) {
      return x;
    },
    constant: function constant(x) {
      return x;
    },
    statement: function statement(x) {
      return x;
    },
    comment: function comment(x) {
      return x;
    },
    black: function black(x) {
      return x;
    },
    red: function red(x) {
      return x;
    },
    green: function green(x) {
      return x;
    },
    yellow: function yellow(x) {
      return x;
    },
    blue: function blue(x) {
      return x;
    },
    purple: function purple(x) {
      return x;
    },
    cyan: function cyan(x) {
      return x;
    },
    white: function white(x) {
      return x;
    },
    bgBlack: function bgBlack(x) {
      return x;
    },
    bgRed: function bgRed(x) {
      return x;
    },
    bgGreen: function bgGreen(x) {
      return x;
    },
    bgYellow: function bgYellow(x) {
      return x;
    },
    bgBlue: function bgBlue(x) {
      return x;
    },
    bgPurple: function bgPurple(x) {
      return x;
    },
    bgCyan: function bgCyan(x) {
      return x;
    },
    bgWhite: function bgWhite(x) {
      return x;
    }
  });

  // Default (terminal) color set
  //
  // (These colors are defined by terminals and not by this framework)
  API("default_", {
    default_: function default_(x) { return x; },
    string: function string(x) {
      return "\x1b[32m" + x + "\x1b[39m";
    },
    number: function number(x) {
      return "\x1b[33m" + x + "\x1b[39m";
    },
    keyword: function keyword(x) {
      return "\x1b[31m" + x + "\x1b[39m";
    },
    constant: function constant(x) {
      return "\x1b[36m" + x + "\x1b[39m";
    },
    statement: function statement(x) {
      return "\x1b[35m" + x + "\x1b[39m";
    },
    comment: function comment(x) {
      return "\x1b[90m" + x + "\x1b[39m";
    },
    black: function black(x) {
      return "\x1b[30m" + x + "\x1b[39m";
    },
    red: function red(x) {
      return "\x1b[31m" + x + "\x1b[39m";
    },
    green: function green(x) {
      return "\x1b[32m" + x + "\x1b[39m";
    },
    yellow: function yellow(x) {
      return "\x1b[33m" + x + "\x1b[39m";
    },
    blue: function blue(x) {
      return "\x1b[34m" + x + "\x1b[39m";
    },
    purple: function purple(x) {
      return "\x1b[35m" + x + "\x1b[39m";
    },
    cyan: function cyan(x) {
      return "\x1b[36m" + x + "\x1b[39m";
    },
    white: function white(x) {
      return "\x1b[37m" + x + "\x1b[39m";
    },
    bgBlack: function bgBlack(x) {
      return "\x1b[40m" + x + "\x1b[49m";
    },
    bgRed: function bgRed(x) {
      return "\x1b[41m" + x + "\x1b[49m";
    },
    bgGreen: function bgGreen(x) {
      return "\x1b[42m" + x + "\x1b[49m";
    },
    bgYellow: function bgYellow(x) {
      return "\x1b[43m" + x + "\x1b[49m";
    },
    bgBlue: function bgBlue(x) {
      return "\x1b[44m" + x + "\x1b[49m";
    },
    bgPurple: function bgPurple(x) {
      return "\x1b[45m" + x + "\x1b[49m";
    },
    bgCyan: function bgCyan(x) {
      return "\x1b[46m" + x + "\x1b[49m";
    },
    bgWhite: function bgWhite(x) {
      return "\x1b[47m" + x + "\x1b[49m";
    }
  });
  
  // One Dark Theme
  createTheme("onedark", {
    black: 17,
    gray: 59,
    red: 168,
    green: 114,
    yellow: 180,
    blue: 75,
    purple: 176,
    cyan: 73,
    white: 145
  });

  createTheme("afterglow", {
    black: 16,
    gray: 59,
    red: 131,
    green: 101,
    yellow: 179,
    blue: 67,
    purple: 132,
    cyan: 116,
    white: 188
  });

  createTheme("bricks", {
    black: 234,
    gray: 242,
    red: 196,
    green: 84,
    yellow: 220,
    blue: 69,
    purple: 165,
    cyan: 117,
    white: 255
  });

  API("createTheme", createTheme);  // For custom themes
})(function(n, f) {
  module.exports[n] = f;
});

