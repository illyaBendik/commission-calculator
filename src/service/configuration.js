export default class ConfigurationService {
  constructor() {
    this.cashInConf = undefined
    this.cashOutNaturalConf = undefined
    this.cashOutJuridicalConf = undefined
  }

  async getConfiguration() {
    try {
      await Promise.all([
        this.getCashInConfiguration(),
        this.getCashOutNaturalConfiguration(),
        this.getCashOutJuridicalConfiguration(),
      ])
    } catch (error) {
      throw new Error('Error fetching configuration:', error)
    }
  }

  async getCashInConfiguration() {
    const res = await fetch('https://developers.paysera.com/tasks/api/cash-in')
    if (!res.ok) {
      throw new Error('Network response was not ok for config cash-in')
    }
    const data = await res.json()
    this.cashInConf = data
  }

  async getCashOutNaturalConfiguration() {
    const res = await fetch(
      'https://developers.paysera.com/tasks/api/cash-out-natural'
    )
    if (!res.ok) {
      throw new Error('Network response was not ok for config cash-out-natural')
    }
    const data = await res.json()
    this.cashOutNaturalConf = data
  }

  async getCashOutJuridicalConfiguration() {
    const res = await fetch(
      'https://developers.paysera.com/tasks/api/cash-out-juridical'
    )
    if (!res.ok) {
      throw new Error(
        'Network response was not ok for config cash-out-juridical'
      )
    }
    const data = await res.json()
    this.cashOutJuridicalConf = data
  }
}
