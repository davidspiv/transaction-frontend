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
    let apiUrl = 'http://localhost:5000/api/transactions/?'
    switch (this.time) {
      case 'year':
        apiUrl += '_time=year'
        break
      case 'year-to-date':
        apiUrl += '_time=year-to-date'
        break
      case 'month':
        apiUrl += '_time=month'
        break
      case 'week':
        apiUrl += '_time=week'
        break
      case 'day':
        apiUrl += '_time=day'
        break
      default:
        apiUrl += '_time=all'
    }

    switch (this.acc) {
      case 'asset':
        apiUrl += '_acc=asset'
        break
      case 'expense':
        apiUrl += '_acc=expense'
        break
      case 'revenue':
        apiUrl += '_acc=revenue'
        break
      case 'liability':
        apiUrl += '_acc=liability'
        break
      case 'equity':
        apiUrl += '_acc=equity'
        break
      default:
        apiUrl += '_acc=all'
    }

    if (this.limit && this.limit > 0) {
      apiUrl += `_limit=${this.limit}`
    }

    return apiUrl
  }
}
