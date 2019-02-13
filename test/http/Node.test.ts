import axios, { AxiosInstance } from 'axios'
import MockAdapter from 'axios-mock-adapter'

import { Node } from '@/http/Node'

const baseUrl: string = 'https://clown.adamant.im/api/'

describe('ApiNode', () => {
  let mockAdapter: MockAdapter

  beforeEach(() => {
    mockAdapter = new MockAdapter(axios)
  })

  describe('constructor', () => {
    test('should set `this.baseUrl`', () => {
      const apiNode = new Node(baseUrl)

      expect((apiNode as any).baseUrl).toBe(baseUrl)
    })
  })

  test('should update `online`, `version`, `ping` when request', async () => {
    mockAdapter
      .onGet(`${baseUrl}peers/version`)
      .reply(200, {
        "success": true,
        "nodeTimestamp": 45539048,
        "build": "",
        "commit": "ad4cccb2e692927c7f9fa055edf1b3c40ea8e93c",
        "version": "0.5.0"
      })

    const apiNode = new Node(baseUrl)

    // default values
    expect(apiNode.online).toBe(false)
    expect(apiNode.version).toBe('')
    expect(apiNode.ping).toBe(0)

    const peers = await apiNode.get('peers/version')

    // after request
    expect(apiNode.online).toBe(true)
    expect(apiNode.version).toBe('0.5.0')
    expect(apiNode.ping > 0).toBe(true)
  })
})
