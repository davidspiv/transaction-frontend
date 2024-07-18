export default class {
  id: string
  date: string
  dateOffset: number
  amount: number
  memo: string
  accId: number
  isDebit: boolean
  fitid?: string

  constructor(
    dateInput: string,
    dateOffsetInput: string | number,
    amountInput: number,
    memoInput: string,
    accId: number,
    isDebit?: boolean,
    idInput?: string,
    fitidInput?: string
  ) {
    this.date = this.formatDate(dateInput)
    this.dateOffset = this.toNumber(dateOffsetInput)
    this.amount = amountInput
    this.memo = memoInput
    this.accId = accId
    this.isDebit = isDebit ? isDebit : false
    this.id =
      idInput || this.createId(this.accId, this.date, this.dateOffset)
    this.fitid = fitidInput
  }

  formatDate(inputDate: string) {
    return new Date(inputDate).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  formatAmount(inputAmount: number) {
    const USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })
    return USDollar.format(inputAmount / -10000)
  }

  toNumber(input: string | number) {
    if (typeof input === 'string') return Number.parseInt(input)
    return input
  }

  createId(srcId: number, isoDate: string, dateOffset: number) {
    const month = isoDate.slice(5, 7)
    const day = isoDate.slice(8, 10)
    const year = isoDate.slice(2, 4)
    const formattedDate = `${month}${day}${year}`

    return Number.parseInt(
      `${srcId}${formattedDate}${dateOffset}`
    ).toString(36)
  }
}
