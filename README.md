# node-cld3

Unofficial Node.js bindings for Compact Language Detector v3 (CLD3).

The library exposes a `getLanguages` function that returns the detected languages in the provided text.

This is an unofficial wrapper around the CLD3 library. It is not affiliated with Google in any way.

## Usage

Installation: `npm install node-cld3`

```js
import { getLanguages } from "node-cld3";

const langs = getLanguages(
  "This piece of text is in English. Този текст е на Български."
);

console.log(langs);
/**
 * [
 *  {
 *      language: 'bg',
 *      probability: 0.9173873066902161,
 *      is_reliable: true,
 *      proportion: 0.5853658318519592
 *  },
 *  {
 *      language: 'en',
 *      probability: 0.9999790191650391,
 *      is_reliable: true,
 *      proportion: 0.4146341383457184
 *  }
 * ]
 */
```

## Local development

1. Ensure you are using Node.js >= 18 and have the protobuf, clang and cmake installed
2. Install dependencies `npm install`
3. Compile bindings `npm run build`
4. Run the tests `npm run test`

or use Docker

1. `docker build . -t node-cld3:node`
2. `docker run --rm -it node-cld3:node`
