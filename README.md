## Usage

`src/lib/adamant-api.js`
```js
import { Api, ChatRepository, AuthRepository } from '@adamant/api'
import nodesConfig from './nodes.config'

const api = new Api(nodesConfig)

// Create repositories
const chat = new ChatRepository(api)
const auth = new AuthRepository(api)

export {
  api,
  chat,
  auth
}
```

`src/store/plugins/adamant-api-plugin.js`
```js
import { api, chat, auth } from '@/lib/adamant-api'

export default store => {
  store.subscribe((mutation, state) => {
    const { type, payload } = mutation
    
    if (type === 'setKeyPair') {
      api.setKeyPair(payload)
    }
    
    if (type === 'reset') {
      api.deleteKeyPair()
    }
  })
}
```

`src/store/index.js`
```js
const store = {
  state: () => ({
    address: '',
    balance: 0,
    keyPair: undefined,
    chats: {}
  }),
  mutations: {
    setKeyPair (state, keyPair) {
      state.keyPair = { ...keyPair }
    },
    setAccount (state, account) {
      state.address = account.address
      state.balance = account.balance
    },
    setChats (state, chats) {
      state.chats = chats
    },
    reset () {
      state.address = ''
      state.balance = 0
      state.keyPair = undefined
    }
  },
  actions: {
    login ({ commit }) {
      const keyPair = makeKeyPair()
      
      commit('setKeyPair', keyPair)
      
      return auth.getAccount(keyPair.publicKey)
        .then(account => {
          commit('setAccount', account)
        })
    },
    logout ({ commit }) {
      commit('reset')
    },
    getChatRooms ({ commit, state }) {
      return chat.getChatRooms(state.address)
        .then(chats => {
          commit('setChats', chats)
          
          return chats
        })
    }
  }
}
```
