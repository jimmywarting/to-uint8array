/*! to-uint8array. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */

var c=new TextEncoder,U=Uint8Array,A=ArrayBuffer
/** Convert anything to Uint8Array without a copy */
export default x=>x instanceof A?new U(x):A.isView(x)?x instanceof U&&x.constructor.name===U.name?x:new U(x.buffer,x.byteOffset,x.byteLength):c.encode(x)
