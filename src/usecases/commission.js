import Transaction from '@/src/entities/transaction.js'
import FileRepository from '@/src/repositories/file.js'
import CommissionService from '@/src/service/commission.js'
import ConfigurationService from '@/src/service/configuration.js'

export default class CommissionUsecase {
  async calculate() {
    const fileRepository = new FileRepository()
    let transactions = fileRepository.readJSONFile()

    transactions = transactions.map(
      (op) =>
        new Transaction(
          op.date,
          op.user_id,
          op.user_type,
          op.type,
          op.operation.amount,
          op.operation.currency
        )
    )

    const configService = new ConfigurationService()
    await configService.getConfiguration()
    const commissionService = new CommissionService(configService)

    transactions.forEach((transaction) => {
      let commission = 0

      if (transaction.isCashIn) {
        commission = commissionService.cashIn(transaction.amount)
      } else if (transaction.isCashOut && transaction.isUserTypeNatural) {
        commission = commissionService.cashOutNatural(
          transaction.amount,
          transaction.userId,
          transaction.dateWeekStart
        )
      } else if (transaction.isCashOut && transaction.isUserTypeJuridical) {
        commission = commissionService.cashOutJuridical(transaction.amount)
      }

      transaction.log(
        commissionService.format(commissionService.rounding(commission))
      )
    })
  }
}
