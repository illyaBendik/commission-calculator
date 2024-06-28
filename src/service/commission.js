export default class CommissionService {
  constructor(configService) {
    this.configService = configService
    this.userWeeklyCashOut = {}
  }

  cashIn(amount) {
    const { cashInConf } = this.configService
    if (!cashInConf) {
      throw new Error('Config cashIn is not set')
    }
    const commissionPercent = cashInConf.percents / 100

    return Math.min(amount * commissionPercent, cashInConf.max.amount)
  }

  cashOutNatural(amount, userId, dateWeekStart) {
    const { cashOutNaturalConf } = this.configService
    if (!cashOutNaturalConf) {
      throw new Error('Config cashOutNatural is not set')
    }

    if (!this.userWeeklyCashOut[userId]) {
      this.userWeeklyCashOut[userId] = {}
    }

    if (!this.userWeeklyCashOut[userId][dateWeekStart]) {
      this.userWeeklyCashOut[userId][dateWeekStart] = 0
    }

    let commissionableAmount = 0
    const weekLimit = cashOutNaturalConf.week_limit.amount
    const currentWeekTotal = this.userWeeklyCashOut[userId][dateWeekStart]

    if (currentWeekTotal + amount > weekLimit) {
      if (currentWeekTotal >= weekLimit) {
        commissionableAmount = amount
      } else {
        commissionableAmount = currentWeekTotal + amount - weekLimit
      }
    }

    this.userWeeklyCashOut[userId][dateWeekStart] += amount

    const commissionPercent = cashOutNaturalConf.percents / 100

    return commissionableAmount * commissionPercent
  }

  cashOutJuridical(amount) {
    const { cashOutJuridicalConf } = this.configService
    if (!cashOutJuridicalConf) {
      throw new Error('Config cashOutJuridicalConf is not set')
    }

    const commissionPercent = cashOutJuridicalConf.percents / 100

    return Math.max(amount * commissionPercent, cashOutJuridicalConf.min.amount)
  }

  rounding(commission) {
    return Math.ceil(commission * 100) / 100
  }

  format(commission) {
    return commission.toFixed(2)
  }
}
