export function timing (target: any, property: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value

  descriptor.value = function () {
    const startTime = Date.now()

    return method.apply(this, arguments)
      .then((data: any) => {
        (this as any).ping = Date.now() - startTime;
        (this as any).online = true;
        (this as any).version = data.version;

        return data
      })
  }
}
