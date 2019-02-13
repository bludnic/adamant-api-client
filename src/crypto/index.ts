import nacl from 'tweetnacl/nacl-fast'
import ed2curve from 'ed2curve'
import { decode } from '@stablelib/utf8'

import { hexToBytes, bytesToHex } from './hex'
import { Message, KeyPair } from '@/types'

export type AssetType =
  'eth_transaction' |
  'bnb_transaction' |
  'bz_transaction' |
  'doge_transaction'

export type Asset = {
  message: string,
  own_message: string,
  type: number
}

export type AssetDecoded = {
  type?: AssetType,
  amount?: number,
  comments: string,
  i18n?: boolean
}

export function decodeAsset (
  asset: Asset,
  myPrivateKey: string,
  senderPublicKey: string,
  i18nKeys: string[]
): AssetDecoded {
  const message = hexToBytes(asset.message)
  const nonce = hexToBytes(asset.own_message)

  const DHPublicKey = ed2curve.convertPublicKey(
    hexToBytes(senderPublicKey)
  )
  const DHSecretKey = ed2curve.convertSecretKey(
    hexToBytes(myPrivateKey)
  )

  const decrypted: Uint8Array = nacl.box.open(message, nonce, DHPublicKey, DHSecretKey)
  const decryptedString: string = decrypted ? decode(decrypted) : ''

  let assetDecoded: AssetDecoded = {
    comments: ''
  }

  if (asset.type === 2) {
    // So-called rich-text messages of type 2 are actually JSON objects
    assetDecoded = JSON.parse(decryptedString)
  } else {
    // Text message may actually be an internationalizable auto-generated message (we used to have those
    // at the beginning)
    assetDecoded.comments = decryptedString
    assetDecoded.i18n = i18nKeys.includes(decryptedString)
  }

  return assetDecoded
}

export function signMessage (message: Message, keyPair: KeyPair) {
  return message
}

export * from './hex'
