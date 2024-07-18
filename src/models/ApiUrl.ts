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

  build() {
    let address = 'http://localhost:5000/api/transactions/?'
    switch (this.time) {
      case 'year':
        address += '_time=year'
        break
      case 'year-to-date':
        address += '_time=year-to-date'
        break
      case 'month':
        address += '_time=month'
        break
      case 'week':
        address += '_time=week'
        break
      case 'day':
        address += '_time=day'
        break
      default:
        address += '_time=all'
    }

    switch (this.acc) {
      case 'asset':
        address += '_acc=asset'
        break
      case 'expense':
        address += '_acc=expense'
        break
      case 'revenue':
        address += '_acc=revenue'
        break
      case 'liability':
        address += '_acc=liability'
        break
      case 'equity':
        address += '_acc=equity'
        break
      default:
        address += '_acc=all'
    }

    if (this.limit && this.limit > 0) {
      address += `_limit=${this.limit}`
    }

    return address
  }
}
