'use strict';

var util = require('util');

var getDefaultMessage = function (deprecatedMethod, preferredMethod) {
  var DEFAULT_MSG = 'DEPRECATION WARNING: Do not use "%s".';
  var msg = util.format(DEFAULT_MSG, deprecatedMethod);

  if (preferredMethod) {
    msg += util.format(' Use "%s" instead.', preferredMethod);
  }

  return msg;
};

var wrapMethod = function (scope, deprecatedMethod, message, alternate) {

  scope[deprecatedMethod] = (function () {
    var execute = scope[alternate] || scope[deprecatedMethod];
    var logged = false;

    return function () {
      var args = Array.prototype.slice.apply(arguments);
      message = message || getDefaultMessage(deprecatedMethod, alternate);

      if (!logged && (logged = true)) {
        console.log(message);
      }

      execute.apply(scope, args);
    };
  }());
};

module.exports = function (scope, member, message, alternate) {

  if (typeof scope[member] === 'function') {
    wrapMethod(scope, member, message, alternate);
  }
};
