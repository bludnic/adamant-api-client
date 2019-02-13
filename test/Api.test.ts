import { Api } from '@/Api'
import { Node } from '@/http/Node'

import NodesConfig from './__mocks__/nodes.config'

const keyPair = {
  publicKey: 'public key',
  privateKey: 'private key',
}

describe('Api', () => {
  let api: Api

  beforeEach(() => {
    api = new Api(NodesConfig)
  })

  describe('constructor()', () => {
    test('should set create Nodes', () => {
      expect((api as any).nodes.length).toBe(NodesConfig.server.adm.length)
    })
  })

  describe('node()', () => {
    test('should return random Node', () => {
      expect(api.node()).toBeInstanceOf(Node)
    })

    test('should return fastest Node', () => {
      (api as any).nodes[0].ping = 10;
      (api as any).nodes[1].ping = 20;
      (api as any).nodes[2].ping = 30;
      expect(api.node(true)).toEqual((api as any).nodes[0]);

      (api as any).nodes[0].ping = 200;
      (api as any).nodes[1].ping = 300;
      (api as any).nodes[2].ping = 100;
      expect(api.node(true)).toEqual((api as any).nodes[2]);
    })
  })

  describe('setKeyPair()', () => {
    it('should update `this.keyPair`', () => {
      api.setKeyPair(keyPair)

      expect((api as any).keyPair).toEqual(keyPair)
    })
  })
})
