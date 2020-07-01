**NOTE: THIS LIBRARY IS CURRENTLY UNDER HEAVY DEVELOPMENT, USE AT YOUR OWN RISK**

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Coveralls][coveralls-image]][coveralls-url]
[![CI][build-image]][build-url]

### @team-choco/xiv

> A collection of Final Fantasy XIV APIs used by @team-choco!

### Install

```sh
$ npm install -S @team-choco/xiv
```

### Usage

```sh
$ npm install -S @team-choco/xiv
```

```js
import { XIV } from '@team-choco/xiv';

const xiv = new XIV({
  xivapi: '<token-here>',
});

xiv.characters.search({
  name: 'First Last',
  server: 'Famfrit',
}).then((response) => {
  console.log(response);
})
```

[npm-version-image]: https://img.shields.io/npm/v/@team-choco/xiv.svg?style=flat
[npm-downloads-image]: https://img.shields.io/npm/dm/@team-choco/xiv.svg?style=flat
[npm-url]: https://npmjs.org/package/@team-choco/xiv

[coveralls-image]: https://coveralls.io/repos/github/team-choco/xiv/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/team-choco/xiv?branch=master

[build-image]: https://github.com/team-choco/xiv/workflows/CI/badge.svg
[build-url]: https://github.com/team-choco/xiv/actions
