import Transaction from './Transaction'

describe('Transaction', () => {
  let transaction

  beforeEach(() => {
    transaction = new Transaction(
      '2024-06-28', // Friday
      1,
      'natural',
      'cash_in',
      1000,
      'USD'
    )
  })

  test('should correctly initialize properties', () => {
    expect(transaction.date).toBe('2024-06-28')
    expect(transaction.userId).toBe(1)
    expect(transaction.userType).toBe('natural')
    expect(transaction.type).toBe('cash_in')
    expect(transaction.amount).toBe(1000)
    expect(transaction.currency).toBe('USD')
  })

  test('should correctly identify cash_in transactions', () => {
    expect(transaction.isCashIn).toBe(true)
    expect(transaction.isCashOut).toBe(false)
  })

  test('should correctly identify cash_out transactions', () => {
    transaction.type = 'cash_out'
    expect(transaction.isCashIn).toBe(false)
    expect(transaction.isCashOut).toBe(true)
  })

  test('should correctly identify natural users', () => {
    expect(transaction.isUserTypeNatural).toBe(true)
    expect(transaction.isUserTypeJuridical).toBe(false)
  })

  test('should correctly identify juridical users', () => {
    transaction.userType = 'juridical'
    expect(transaction.isUserTypeNatural).toBe(false)
    expect(transaction.isUserTypeJuridical).toBe(true)
  })

  test('should correctly calculate the start of the week for the date', () => {
    expect(transaction.dateWeekStart).toBe('2024-06-24')
  })

  test('should log data', () => {
    console.log = jest.fn()
    const data = 'test log data'
    transaction.log(data)
    expect(console.log).toHaveBeenCalledWith(data)
  })
})
