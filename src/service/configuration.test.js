import ConfigurationService from './configuration'

describe('ConfigurationService', () => {
  let configurationService

  beforeEach(() => {
    configurationService = new ConfigurationService()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  const mockFetch = (url, responseData) =>
    jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(responseData),
      })
    )

  const mockFetchError = () =>
    jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: false,
      })
    )

  it('should fetch all configurations successfully', async () => {
    global.fetch = mockFetch(
      'https://developers.paysera.com/tasks/api/cash-in',
      { some: 'cashInData' }
    )
    await configurationService.getConfiguration()
    expect(configurationService.cashInConf).toEqual({ some: 'cashInData' })

    global.fetch = mockFetch(
      'https://developers.paysera.com/tasks/api/cash-out-natural',
      { some: 'cashOutNaturalData' }
    )
    await configurationService.getConfiguration()
    expect(configurationService.cashOutNaturalConf).toEqual({
      some: 'cashOutNaturalData',
    })

    global.fetch = mockFetch(
      'https://developers.paysera.com/tasks/api/cash-out-juridical',
      { some: 'cashOutJuridicalData' }
    )
    await configurationService.getConfiguration()
    expect(configurationService.cashOutJuridicalConf).toEqual({
      some: 'cashOutJuridicalData',
    })
  })

  it('should handle network errors', async () => {
    global.fetch = mockFetchError()

    await expect(configurationService.getConfiguration()).rejects.toThrow(
      'Error fetching configuration:'
    )
  })

  it('should fetch cash in configuration successfully', async () => {
    global.fetch = mockFetch(
      'https://developers.paysera.com/tasks/api/cash-in',
      { some: 'cashInData' }
    )
    await configurationService.getCashInConfiguration()
    expect(configurationService.cashInConf).toEqual({ some: 'cashInData' })
  })

  it('should fetch cash out natural configuration successfully', async () => {
    global.fetch = mockFetch(
      'https://developers.paysera.com/tasks/api/cash-out-natural',
      { some: 'cashOutNaturalData' }
    )
    await configurationService.getCashOutNaturalConfiguration()
    expect(configurationService.cashOutNaturalConf).toEqual({
      some: 'cashOutNaturalData',
    })
  })

  it('should fetch cash out juridical configuration successfully', async () => {
    global.fetch = mockFetch(
      'https://developers.paysera.com/tasks/api/cash-out-juridical',
      { some: 'cashOutJuridicalData' }
    )
    await configurationService.getCashOutJuridicalConfiguration()
    expect(configurationService.cashOutJuridicalConf).toEqual({
      some: 'cashOutJuridicalData',
    })
  })
})
