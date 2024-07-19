export default class Url {
  time: string
  acc: string
  limit?: number

  constructor(time: string, acc: string, limit?: string) {
    this.time = time
    this.acc = acc
    this.limit = this.toNumber(limit || '-1')
  }

  toNumber(dateOffsetData: string) {
    try {
      return Number.parseInt(dateOffsetData)
    } catch (error) {
      return -1
    }
  }
}
