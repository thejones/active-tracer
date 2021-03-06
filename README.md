<h1 align="center" style="border-bottom: none;">⚒️ active tracer</h1>

<h3 align="center">OTEL plugins I commonly use.</h3>

<p align="center">
        <a href="./LICENSE">
    <img alt="license" src="https://img.shields.io/badge/license-ISC-blue.svg" />
  </a> <a href="https://requirejs.org/docs/commonjs.html">
      <img alt="commonjs module" src="https://img.shields.io/badge/module-CommonJS-blue" />
    </a> <a href="https://www.npmjs.com/package/active-tracer">
    <img alt="npm version" src="https://img.shields.io/npm/v/active-tracer.svg?style=flat" />
  </a> <a href="https://www.npmjs.com/package/active-tracer">
    <img alt="npm downloads" src="https://img.shields.io/npm/dt/active-tracer.svg?style=flat" />
  </a> 
    </p>

## Install

```
npm install --save active-tracer
```

## Usage

```
// index.js
require("active-tracer")({
  serviceName: 'My Service Name',
  pinoInstrumentationOptions: {}, // just passes into this plugin
  expressInstrumentationOptions: {},
  pgInstrumentationOptions: {},
});
```

```
serviceName is a string. All others are objects.
{
  serviceName: '' //dafualt to 'UNKNOWN_SERVICE,
  expressInstrumentationOptions: {},
  fastifyInstrumentationOptions: {},
  pgInstrumentationOptions: {},
  pinoInstrumentationOptions: {},
  graphQlInstrumentationOptions: {},
  redisInstrumentationOptions: {},
}

```

## Build

```
npm run build // for single build

npm run watch // to watch changes
```

or

```
yarn build // for single build

yarn watch // to watch changes
```

## Author

[alexander.t.jones@gmail.com](mailto:alexander.t.jones@gmail.com)

## License

ISC License

Copyright (c) 2022 alexander.t.jones@gmail.com

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
