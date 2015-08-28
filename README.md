# deprecated

```js
var app = {
  oldMethod: function () {},
  newMethod: function () {}
};
```

## Basic
```js
deprecate(app, 'oldMethod');
app.oldMethod();  // logs 'DEPRECATION WARNING: Do not use "oldMethod".'
```

The deprecated method is executed, but a message is logged the first time.

## Custom Message
```js
deprecate(app, 'oldMethod', 'This method sucks.  Don\'t use it.');
app.oldMethod();  // logs 'This method sucks.  Don't use it.'
```

The deprecated method is executed, but a custom message is logged the first time.

## Redirect
```js
deprecate(app, 'oldMethod', null, 'newMethod');
app.oldMethod();  // logs 'DEPRECATION WARNING: Do not use "oldMethod". Use "newMethod" instead.'
```

An alternate method is executed and a message is logged the first time.