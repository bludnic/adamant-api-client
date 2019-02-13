export function hasKeyPair (target: any, property: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value

  descriptor.value = function () {
    if (!(this as any).api.keyPair) {
      return Promise.reject(new Error('No `keyPair`. Please call `api.setKeyPair() first.`'))
    }

    return method.apply(this, arguments)
  }
}
