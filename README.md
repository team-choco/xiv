**NOTE: THIS LIBRARY IS CURRENTLY UNDER HEAVY DEVELOPMENT, USE AT YOUR OWN RISK**

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]

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
