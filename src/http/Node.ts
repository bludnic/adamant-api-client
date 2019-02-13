import axios, { AxiosRequestConfig } from 'axios'

import { timing } from './Node.decorators'

class NetworkError extends Error {
  public code: number = 499

  constructor () {
    super('Network error')
  }
}

export class Node {
  private baseUrl: string

  public online: boolean = false
  public version: string = ''
  public ping: number = 0

  constructor (baseUrl: string) {
    this.baseUrl = baseUrl
  }

  @timing
  get (url: string, config?: AxiosRequestConfig) {
    return axios.get(`${this.baseUrl}${url}`, config)
      .then(res => res.data)
  }

  @timing
  post (url: string, data?: any, config?: AxiosRequestConfig) {
    return axios.post(`${this.baseUrl}${url}`, data, config)
      .then(res => res.data)
  }

  /**
   * Intitates node status update: version, ping, online/offline.
   * @returns {Promise}
   */
  public async updateStatus () {
    try {
      const res = await axios.get(`peers/version`)
    } catch (err) {
      this.online = false

      if (!err.status) { // No network error
        throw new NetworkError()
      }

      throw err
    }
  }
}
