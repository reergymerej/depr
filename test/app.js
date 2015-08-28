'use strict';

var will = require('willy').will;
var yps = require('yps');
var app = require('../app.js');

var monitor = function (method) {

};

describe('methods', function () {
  var obj;
  var called;
  var alternateCalled;

  beforeEach(function () {
    obj = {
      foo: function () { called = true; },
      bar: function () { alternateCalled = true; }
    };

    yps.infiltrate(console, 'log');
  });

  afterEach(function () {
    obj = null;
    called = false;
    alternateCalled = false;
    yps.exfiltrate(console, 'log');
  });

  it('should log when method is called', function () {
    var msg = 'avoid the foo';

    app(obj, 'foo', msg);
    obj.foo();

    will(console.log.calls[0][0]).be(msg);
  });

  it('should execute the deprecated method', function () {
    app(obj, 'foo');
    obj.foo();

    will(called).be(true);
  });

  it('should provide a default message', function () {
    app(obj, 'foo');
    obj.foo();

    will(console.log.calls[0][0]).be('DEPRECATION WARNING: Do not use "foo".');
  });

  it('should only log once', function () {
    app(obj, 'foo');
    obj.foo();
    obj.foo();

    will(console.log.calls.length).be(1);
  });

  it('should execute a different function when provided', function () {
    app(obj, 'foo', null, 'bar');
    obj.foo();
    will(alternateCalled).be(true);
  });

  it('should point to the preferred function', function () {
    app(obj, 'foo', null, 'bar');
    obj.foo();
    will(console.log.calls[0][0]).be('DEPRECATION WARNING: Do not use "foo". Use "bar" instead.');
  });
});
