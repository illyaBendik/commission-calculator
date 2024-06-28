import CommissionService from './commission'

describe('CommissionService', () => {
  let commissionService
  let mockConfigService

  beforeEach(() => {
    mockConfigService = {
      cashInConf: {
        percents: 0.03,
        max: { amount: 5 },
      },
      cashOutNaturalConf: {
        percents: 0.3,
        week_limit: { amount: 1000 },
      },
      cashOutJuridicalConf: {
        percents: 0.5,
        min: { amount: 0.5 },
      },
    }
    commissionService = new CommissionService(mockConfigService)
  })

  it('should calculate cash-in commission correctly', () => {
    const commission = commissionService.cashIn(100)
    expect(commission).toEqual(0.03)
  })

  it('should throw error for cash-in when config is not set', () => {
    mockConfigService.cashInConf = undefined
    expect(() => commissionService.cashIn(100)).toThrow(
      'Config cashIn is not set'
    )
  })

  it('should calculate cash-out natural commission correctly', () => {
    const userId = 'user1'
    const dateWeekStart = '2024-06-01'

    let commission = commissionService.cashOutNatural(
      300.0,
      userId,
      dateWeekStart
    )
    expect(commission).toEqual(0)

    commission = commissionService.cashOutNatural(800.0, userId, dateWeekStart)
    expect(commission).toEqual(0.3)

    expect(commissionService.userWeeklyCashOut[userId][dateWeekStart]).toEqual(
      1100
    )
  })

  it('should throw error for cash-out natural when config is not set', () => {
    mockConfigService.cashOutNaturalConf = undefined
    expect(() =>
      commissionService.cashOutNatural(100, 'user1', '2024-06-01')
    ).toThrow('Config cashOutNatural is not set')
  })

  it('should calculate cash-out juridical commission correctly', () => {
    const commission = commissionService.cashOutJuridical(100)
    expect(commission).toEqual(0.5)
  })

  it('should throw error for cash-out juridical when config is not set', () => {
    mockConfigService.cashOutJuridicalConf = undefined
    expect(() => commissionService.cashOutJuridical(100)).toThrow(
      'Config cashOutJuridicalConf is not set'
    )
  })

  it('should round commission correctly', () => {
    const roundedValue = commissionService.rounding(1.234)
    expect(roundedValue).toEqual(1.24)
  })

  it('should format commission correctly', () => {
    const formattedValue = commissionService.format(1.2)
    expect(formattedValue).toEqual('1.20')
  })
})
