# lipo-koa

[![build status](https://img.shields.io/travis/niftylettuce/lipo-koa.svg)](https://travis-ci.org/niftylettuce/lipo-koa)
[![code coverage](https://img.shields.io/codecov/c/github/niftylettuce/lipo-koa.svg)](https://codecov.io/gh/niftylettuce/lipo-koa)
[![code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![made with lass](https://img.shields.io/badge/made_with-lass-95CC28.svg)](https://lass.js.org)
[![license](https://img.shields.io/github/license/niftylettuce/lipo-koa.svg)](LICENSE)

> Lipo middleware for Lad and Koa


## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Contributors](#contributors)
* [License](#license)


## Install

[npm][]:

```sh
npm install lipo-koa
```

[yarn][]:

```sh
yarn add lipo-koa
```


## Usage

```js
const Koa = require('koa');
const multer = require('koa-multer');
const bytes = require('bytes');
const errorHandler = require('koa-better-error-handler');
const lipoMiddleware = require('lipo-koa');

const app = new Koa();

const upload = multer({
  limits: {
    fieldNameSize: bytes('100b'),
    fieldSize: bytes('1mb'),
    fileSize: bytes('5mb'),
    fields: 10,
    files: 1
  }
});
app.use(upload.single('input'));

// override koa's undocumented error handler
app.context.onerror = errorHandler;

// specify that this is our api
app.context.api = true;

// use lipo's koa middleware
app.use(lipoKoa);

// start server
app.listen(3000);
```


## Contributors

| Name           | Website                    |
| -------------- | -------------------------- |
| **Nick Baugh** | <http://niftylettuce.com/> |


## License

[MIT](LICENSE) © [Nick Baugh](http://niftylettuce.com/)


## 

[npm]: https://www.npmjs.com/

[yarn]: https://yarnpkg.com/
