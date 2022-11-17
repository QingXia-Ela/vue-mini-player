export function throwError(info: string) {
  throw new Error('[PlayerCore error]: ' + info)
}

export function logWarn(info: string) {
  console.warn('[PlayerCore warn]: ' + info)
}
