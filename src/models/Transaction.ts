export default class Transaction {
  id: string
  date: string
  dateOffset: number
  amount: string
  memo: string
  userId: string
  accCode: number
  fitid?: string

  constructor(
    idInput: string,
    dateInput: string,
    dateOffsetInput: string,
    amountInput: string,
    memoInput: string,
    userIdInput: string,
    accCodeInput: string,
    fitidInput?: string
  ) {
    this.id = idInput
    this.date = this.formatDate(dateInput)
    this.dateOffset = this.toNumber(dateOffsetInput)
    this.amount = this.formatAmount(amountInput)
    this.memo = this.formatMemo(memoInput)
    this.userId = userIdInput
    this.accCode = this.toNumber(accCodeInput)
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
