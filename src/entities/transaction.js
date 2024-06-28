import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek.js'

dayjs.extend(isoWeek)

export default class Transaction {
  constructor(date, userId, userType, type, amount, currency) {
    this.date = date
    this.userId = userId
    this.userType = userType
    this.type = type
    this.amount = amount
    this.currency = currency
  }

  get isCashIn() {
    return this.type === 'cash_in'
  }

  get isCashOut() {
    return this.type === 'cash_out'
  }

  get isUserTypeNatural() {
    return this.userType === 'natural'
  }

  get isUserTypeJuridical() {
    return this.userType === 'juridical'
  }

  get dateWeekStart() {
    const weekStart = dayjs(this.date).startOf('isoWeek')
    return weekStart.format('YYYY-MM-DD')
  }

  log(data) {
    console.log(data)
  }
}
