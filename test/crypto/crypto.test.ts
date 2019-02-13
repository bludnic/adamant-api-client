import { hexToBytes, bytesToHex, decodeAsset } from '@/crypto'

describe('crypto', () => {
  describe('hexToBytes()', () => {
    it('should return [] when empty string', () => {
      expect(hexToBytes('')).toEqual(new Uint8Array([]))
    })

    it('should return Uint8Array when pair bytes', () => {
      expect(hexToBytes('01')).toEqual(new Uint8Array([1]))
      expect(hexToBytes('FF')).toEqual(new Uint8Array([255]))
      expect(hexToBytes('0AFE')).toEqual(new Uint8Array([10, 254]))
      expect(hexToBytes('ff')).toEqual(new Uint8Array([255]))
      expect(hexToBytes('fF')).toEqual(new Uint8Array([255]))
      expect(hexToBytes('0aFe')).toEqual(new Uint8Array([10, 254]))
    })

    it('should throw Error when no pair bytes', () => {
      try {
        hexToBytes('FFD')
      } catch (err) {
        expect(err.message).toBe(`The string "FFD" is not divisible by 2.`)
      }
    })

    it('should throw Error when invalid hex', () => {
      try {
        hexToBytes('FFAA00YZ')
      } catch (err) {
        expect(err.message).toBe(`The string "FFAA00YZ" is not valid HEX.`)
      }
    })
  })

  describe('bytesToHex()', () => {
    it('should return empty string when empty array', () => {
      expect(bytesToHex([])).toBe('')
      expect(bytesToHex(new Uint8Array([]))).toBe('')
    })

    it('should return hex', () => {
      expect(bytesToHex([255])).toBe('ff')
      expect(bytesToHex(new Uint8Array([255]))).toBe('ff')

      expect(bytesToHex([10, 254])).toBe('0afe')
      expect(bytesToHex([0])).toBe('00')
    })

    it('out of range', () => {
      expect(bytesToHex([256])).toBe('00')
      expect(bytesToHex([257, 258, 259])).toBe('010203')
    })
  })
})
