export default class JournalEntry {
  date: string
  dateOffset: number
  amount: string
  memo: string
  srcId: string
  fitid?: string

  constructor(
    dateInput: string,
    dateOffsetInput: number,
    amountInput: number,
    memoInput: string,
    srcIdInput: number,
    fitidInput?: string
  ) {
    this.date = this.formatDate(dateInput)
    this.dateOffset = dateOffsetInput
    this.amount = String(amountInput)
    this.memo = memoInput
    this.srcId = String(srcIdInput)
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
