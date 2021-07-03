import { Buffer } from 'buffer'
import fn from './mod.js'

const assert = (...args) => console.assert(...args)

{
  console.group('buffer to uint8')
  const buf = Buffer.from('whatever')
  const a = fn(buf)
  assert(a.buffer === buf.buffer, 'buffer reference equality')
  assert(a.constructor.name === 'Uint8Array', 'constructor name')
  assert(a.length === 8, 'buffer length')
  console.groupEnd()
}

{
  console.group('uint16 to uint8')
  const buf = new Uint16Array(2)
  const a = fn(buf)
  assert(a.buffer === buf.buffer, 'buffer reference equality')
  assert(a.constructor.name === 'Uint8Array', 'constructor name')
  assert(a.length === 4, 'buffer length')
  console.groupEnd()
}

{
  console.group('uint8 to uint8')
  const a = new TextEncoder().encode('hello')
  const b = fn(a)
  assert(a === b, 'reference equality')
  assert(a.constructor.name, 'Uint8Array', 'constructor name')
  assert(a.length === 5, 'u8 length')
  console.groupEnd()
}

{
  console.group('* > string > uint8 > Type')
  const decoder = new TextDecoder()
  const types = ['str', true, false, 0, 20, {}, null, NaN, new URLSearchParams()]
  const expected = ['str', 'true', 'false', '0', '20', '[object Object]', 'null', 'NaN', '']
  for (let i = 0; i < types.length; i++) {
    const uint8 = fn(types[i])
    assert(decoder.decode(uint8) === expected[i], 'unknown is casted to string')
    assert(uint8.constructor.name, 'Uint8Array', 'constructor name')
  }
  console.groupEnd()
}

console.log('done')
