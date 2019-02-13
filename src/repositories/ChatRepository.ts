import { Repository } from '@/repositories/Repository'
import { hasKeyPair } from '@/repositories/Repository.decorators'
import { signMessage } from '@/crypto'
import { Message } from '@/types'


export class ChatRepository extends Repository {
  getChatRooms (adamantAddress: string) {
    return this.api.node().get(`chatrooms/${adamantAddress}`)
  }

  @hasKeyPair
  sendMessage (unsignedMessage: Message) {
    const message = signMessage(unsignedMessage, (this.api as any).keyPair)

    return this.api.node().post(`chats/process`, { message })
  }
}
