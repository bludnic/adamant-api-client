export type KeyPair = {
  publicKey: string,
  privateKey: string
}

export type NodesConfig = {
  minApiVersion: string,
  server: {
    [key: string]: Array<{ url: string }>
  },
  env?: string
}

export type Message = {
  recipientId: string,
  message: string
}
