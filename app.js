import CommissionUsecase from '@/src/usecases/commission.js'

const Init = async () => {
  const commissionUsecase = new CommissionUsecase()
  commissionUsecase.calculate()
}

Init()
