export default class JournalEntry {
  date: string
  dateOffset: number
  amount: string
  memo: string
  srcId: string
  fitid?: string

  constructor(
    dateInput: string,
    dateOffsetInput: string,
    amountInput: string,
    memoInput: string,
    srcIdInput: string,
    fitidInput?: string
  ) {
    this.date = this.formatDate(dateInput)
    this.dateOffset = this.toNumber(dateOffsetInput)
    this.amount = this.formatAmount(amountInput)
    this.memo = this.formatMemo(memoInput)
    this.srcId = srcIdInput
    this.fitid = fitidInput
  }

  toNumber(dateOffsetData: string) {
    return Number.parseInt(dateOffsetData)
  }

  formatDate(inputDate: string) {
    return new Date(inputDate).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  formatAmount(inputAmount: string) {
    const USDollar = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })
    return USDollar.format(this.toNumber(inputAmount) / -10000)
  }

  formatMemo(inputMemo: string) {
    return inputMemo
  }
}
