/**
 * Converts a hex string representation (e.g. `deadbeef`) to the respective byte array
 * @param {string} hexString hex string
 * @returns {Uint8Array}
 */
export function hexToBytes (hexString: string = ''): Uint8Array {
  if(hexString.length % 2 !== 0) {
    throw new Error(`The string "${hexString}" is not divisible by 2.`)
  }

  if (/^([0-9a-f]{2})*$/i.test(hexString) === false) {
    throw new Error(`The string "${hexString}" is not valid HEX.`)
  }

  const bytes = (hexString.match(/[0-9a-f]{2}/gi) || [])
    .map(byte => parseInt(byte, 16))

  return new Uint8Array(bytes)
}

/**
 * Converts a bytes array to the respective string representation
 * @param {Array<number>|Uint8Array} bytes bytes array
 * @returns {string}
 */
export function bytesToHex (bytes: Uint8Array | Array<number>): string {
  return Uint8Array.from(bytes).reduce(
    (acc: string, byte: number): string => {
      return acc + byte.toString(16).padStart(2, '0')
    }, ''
  )
}
