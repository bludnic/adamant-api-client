import { Api } from '@/Api'

export class Repository {
  protected api: Api

  constructor (api: Api) {
    this.api = api
  }
}
