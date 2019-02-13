import axios from 'axios'
import AxiosAdapter from 'axios-mock-adapter'

import { Api } from '@/Api'
import { ChatRepository } from '@/repositories/ChatRepository'
import NodesConfig from '../__mocks__/nodes.config'

const baseUrl: string = 'https://clown.adamant.im/api/'
const user1: string = 'U9203183357885757380'

const keyPair = {
  publicKey: 'public key',
  privateKey: 'private key',
}

describe('ChatRepository', () => {
  let axiosAdapter: AxiosAdapter
  let api: Api
  let chat: ChatRepository

  beforeEach(() => {
    axiosAdapter = new AxiosAdapter(axios)
    api = new Api(NodesConfig)
    chat = new ChatRepository(api)
  })

  describe('getChatRooms()', () => {
    test('should return chatrooms', async () => {
      axiosAdapter
        .onGet(/^(.*)\/chatrooms\/U\d{6,}$/)
        .reply(200, [])

      const chatRooms = await chat.getChatRooms(user1)

      expect(chatRooms).toEqual([])
    })
  })

  describe('sendMessage()', () => {
    const payload = {
      recipientId: 'U123456',
      message: 'hello world'
    }

    beforeEach(() => {
      axiosAdapter
        .onPost(/^(.*)\/chats\/process$/)
        .reply(200, { success: true })
    })

    it('should throw error when no `keyPair`', async () => {
      await expect(chat.sendMessage(payload)).rejects.toEqual(
        new Error('No `keyPair`. Please call `api.setKeyPair() first.`')
      )
    })

    it('should send message', async () => {
      api.setKeyPair(keyPair)

      await expect(chat.sendMessage(payload)).resolves.toEqual({ success: true })
    })
  })
})
