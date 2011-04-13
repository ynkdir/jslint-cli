var optspec = (function() {
  'use strict';

  function getopt(args, options) {
    var rest = [], option, names, opt, value, i, j;
    for (i = 0; i < args.length; ++i) {
      if (args[i].match(/^-([^\-].*)$/)) {
        names = RegExp.$1;
        for (j = 0; j < names.length; ++j) {
          opt = '-' + names.substr(j, 1);
          option = options[opt];
          if (option === undefined) {
            throw new Error('option ' + opt + ' not recognized');
          }
          if (option.has_arg) {
            if (j === names.length - 1) {
              if (i === args.length - 1 || args[i + 1].match(/^-/)) {
                throw new Error('option ' + opt + ' requires argument');
              }
              value = args[++i];
            } else {
              value = names.substr(j + 1);
            }
            option.callback(opt, value);
            break;
          } else {
            option.callback(opt);
          }
        }
      } else if (args[i].match(/^(--[^=]+)(?:(=)(.*))?$/)) {
        opt = RegExp.$1;
        value = (RegExp.$2 === '=' ? RegExp.$3 : null);
        option = options[opt];
        if (option === undefined) {
          throw new Error('option ' + opt + ' not recognized');
        }
        if (option.has_arg) {
          if (value === null) {
            if (i === args.length - 1 || args[i + 1].match(/^-/)) {
              throw new Error('option ' + opt + ' requires argument');
            }
            value = args[++i];
          }
          option.callback(opt, value);
        } else {
          if (value !== null) {
            throw new Error('option ' + opt + ' must not have argument');
          }
          option.callback(opt);
        }
      } else if (args[i].match(/^-/)) {
        throw new Error('option ' + args[i] + ' not recognized');
      } else {
        rest.push(args[i]);
      }
    }
    return rest;
  }

  function parse_desc(desc) {
    var spec = {}, names, i;
    if (!desc.match(/^\s*(.+?) {2}.*/)) {
      throw new Error('assert: invalid description: ' + desc);
    }
    names = RegExp.$1.split(/\s*,\s*/);
    for (i = 0; i < names.length; ++i) {
      if (names[i].match(/^(--[^=]*)(?:[ =](\S+))?$/)) {
        spec.longopt = RegExp.$1;
        spec.type = RegExp.$2 || 'BOOLEAN';
      } else if (names[i].match(/^(-[^\-])(?: (\S+))?$/)) {
        spec.shortopt = RegExp.$1;
        spec.type = RegExp.$2 || 'BOOLEAN';
      } else {
        throw new Error('assert: invalid description: ' + desc);
      }
    }
    if (spec.shortopt === undefined && spec.longopt === undefined) {
      throw new Error('assert: no option: ' + desc);
    }
    return spec;
  }

  function OptionParser(usage) {
    this.help = ['usage: ' + usage];
    this.usage = usage;
    this.options = {};
    this.opts = {};
    this.actions = {
      BOOLEAN: function(opt) {
        var option = this.options[opt];
        this.opts[option.name] = (option.init ? false : true);
      },
      NUMBER: function(opt, value) {
        var option = this.options[opt];
        if (!value.match(/^[\-+]?\d+/)) {
          throw new Error('option ' + opt + ' should be integer');
        }
        this.opts[option.name] = Number(value);
      },
      DEFAULT: function(opt, value) {
        var option = this.options[opt];
        this.opts[option.name] = value;
      }
    };
  }

  OptionParser.prototype.add_option = function(desc, init) {
    var self = this;
    var spec = parse_desc(desc);
    var option = {
      desc: desc,
      init: init,
      spec: spec,
      name: spec.longopt ? spec.longopt.substr(2) : spec.shortopt.substr(1),
      has_arg: (spec.type !== 'BOOLEAN'),
      callback: function(opt, value) {
        var action = self.actions[spec.type] || self.actions.DEFAULT;
        action.call(self, opt, value);
      }
    };
    if (spec.shortopt) {
      this.options[spec.shortopt] = option;
    }
    if (spec.longopt) {
      this.options[spec.longopt] = option;
    }
    this.opts[option.name] = init;
    this.help.push(desc);
  };

  OptionParser.prototype.parse_args = function(args) {
    var rest = getopt(args, this.options);
    return { opts: this.opts, args: rest };
  };

  OptionParser.prototype.format_help = function() {
    return this.help.join('\n');
  };

  return {
    OptionParser: OptionParser
  };

}());
