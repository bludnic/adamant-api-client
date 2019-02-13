import random from 'lodash/random'

import { Node } from '@/http/Node'
import { KeyPair, NodesConfig } from '@/types'

export class Api {
  public keyPair: KeyPair | undefined

  private config: NodesConfig
  private nodes: Node[] = []

  constructor (config: NodesConfig) {
    this.config = config

    this.createNodes()
  }

  /**
   * Get a Node instance.
   */
  public node (fastest: boolean = false) {
    if (fastest) {
      return this.nodes.reduce((acc, curr) => {
        return acc && acc.ping < curr.ping ? acc : curr
      })
    } else {
      const randomKey = random(0, this.nodes.length - 1)

      return this.nodes[randomKey]
    }
  }

  public setKeyPair (keyPair: KeyPair) {
    this.keyPair = { ...keyPair }
  }

  public deleteKeyPair () {
    this.keyPair = undefined
  }

  private createNodes () {
    this.config.server.adm.forEach(({ url }) => {
      this.nodes.push(new Node(url))
    })
  }
}
