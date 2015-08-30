# deprecate

[![Build Status][travis-badge]][travis-url]

Easily deprecate a method.  Log a warning the first time it's used and optionally redirect to another method.

```js
/**
* @param {Object} scope - the object containing the method
* @param {String} method - the name of the method to deprecate
* @param {String} [message] - the message to log
* @param {String} [preferredMethod] - an alternate method to execute
*/
deprecate(scope, method, message, preferredMethod)
```

## Examples

```js
var deprecate = require('deprecate');
var app = {
  oldMethod: function () {},
  newMethod: function () {}
};
```

### Basic
The deprecated method is executed, and a message is logged.

```js
deprecate(app, 'oldMethod');
app.oldMethod();  // 'DEPRECATION WARNING: Do not use "oldMethod".'
```

### Custom Message
The deprecated method is executed, and a custom message is logged.

```js
deprecate(app, 'oldMethod', 'This method sucks.  Don\'t use it.');
app.oldMethod();  // 'This method sucks.  Don't use it.'
```

### Redirect - Default Message
An alternate method is executed and a message is logged.

```js
deprecate(app, 'oldMethod', null, 'newMethod');
app.oldMethod();
// 'DEPRECATION WARNING: Do not use "oldMethod". Use "newMethod" instead.'
```

### Redirect - Custom Message
An alternate method is executed and a custom message is logged.

```js
deprecate(app, 'oldMethod', 'STOP USING oldMethod!!!!1!', 'newMethod');
app.oldMethod();
// 'STOP USING oldMethod!!!!1!'
```


[travis-badge]: https://travis-ci.org/reergymerej/deprecate.svg
[travis-url]: https://travis-ci.org/reergymerej/deprecate
