# to-uint8array

Convert anything to Uint8Array without a copy

Like [typedarray-to-buffer] but returns pure Uint8Array instead.<br>
- Do not require `node:buffer` to do so.
- Best for cross platform coding (Deno, Node, Browser)
- `node:buffer` (or anything else that extens Uint8Array) gets degraded to plain `Uint8Array`
- Same ArrayBuffer is used, no copies will occur

Anything that isn't a `ArrayBuffer` or `ArrayBufferView` is
casted to `String` and then converted to `Uint8Array` by
`TextEncoder().encode(whatever)` (that's how webidl conversion stuff works)

One last thing: It **only supports ESM**, So you can import this easily with any CDN.<br>
Still using commonjs? Switch to ESM also! Or use the async [import()] syntax.

# Example

```js
import toUint8 from 'anything-to-uint8array'

const buffer = Buffer.from('abc')
const u8 = new Uint8Array([97])
const u16 = new Uint16Array([0, 1, 2])
const ab = new ArrayBuffer(3)

toUint8(u16) // Uint8Array(6) [ 0, 0, 1, 0, 2, 0 ]
toUint8(ab) // Uint8Array(3) [ 0, 0, 0 ]
toUint8('abc') // Uint8Array(3) [ 97, 98, 99 ]
toUint8(buffer) // Uint8Array(3) [ 97, 98, 99 ]

toUint8(u8) === u8 // true
toUint8(ab).buffer === ab // true
toUint8(u16).buffer === u16.buffer // true
toUint8(buffer) instanceof Uint8Array // true
toUint8(buffer) instanceof Buffer // false
```

[typedarray-to-buffer]: https://npmjs.com/package/typedarray-to-buffer
[import()]: https://nodejs.org/dist/latest-v16.x/docs/api/esm.html#esm_require
