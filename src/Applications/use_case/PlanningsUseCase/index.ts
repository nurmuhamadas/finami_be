import IdGenerator from '../../../Applications/common/IdGenerator'
import {
  AddPlanningPayload,
  DeletePlanningPayload,
  GetPlanningByIdPayload,
  GetPlanningsPayload,
  PlanningsUseCaseType,
  UpdatePlanningPayload,
} from './types'
import CategoryRepository from '../../../Domains/categories/CategoryRepository'
import PlanningRepository from '../../../Domains/plannings/PlanningRepository'
import FilterPlanning from '../../../Domains/plannings/entities/FilterPlanning'
import RegisterPlanning from '../../../Domains/plannings/entities/RegisterPlanning'
import UpdateDataPlanning from '../../../Domains/plannings/entities/UpdateDataPlanning'
import WalletRepository from '../../../Domains/wallets/WalletRepository'
import { PlanningDataRespType } from '../../../Domains/plannings/entities/types'
import PlanningData from '../../../Domains/plannings/entities/PlanningData'

class PlanningsUseCase {
  _walletRepository: WalletRepository
  _categoryRepository: CategoryRepository
  _planningRepository: PlanningRepository
  _idGenerator: IdGenerator

  constructor({
    walletRepository,
    categoryRepository,
    planningRepository,
    idGenerator,
  }: PlanningsUseCaseType) {
    this._walletRepository = walletRepository
    this._categoryRepository = categoryRepository
    this._planningRepository = planningRepository
    this._idGenerator = idGenerator
  }

  async getPlannings({
    user_id,
    user_query_id,
    wallet_id,
    month,
    category_id,
    search_key,
  }: GetPlanningsPayload): Promise<PlanningDataRespType[]> {
    const filter = new FilterPlanning({
      month: month,
      wallet_id: wallet_id,
      user_query_id,
      category_id,
      search_key,
    })

    let result
    if (user_query_id) {
      result = await this._planningRepository.getPlanningsByUserId(
        user_id,
        filter,
      )
    } else {
      result = await this._planningRepository.getAllPlannings(user_id, filter)
    }

    const data = new PlanningData(result, user_id)

    return data.values
  }

  async getPlanningById({
    id,
    user_id,
  }: GetPlanningByIdPayload): Promise<PlanningDataRespType> {
    //  verify access
    await this._planningRepository.verifyPlanningReadAccess(id, user_id)

    const result = await this._planningRepository.getPlanningById(id)
    const data = new PlanningData([result], user_id)

    return data.values?.[0]
  }

  async addPlanning({
    name,
    amount,
    category_id,
    user_id,
    wallet_id,
    month,
  }: AddPlanningPayload): Promise<{ id: string }> {
    const registerPlanning = new RegisterPlanning({
      id: this._idGenerator.generate('plan'),
      name,
      amount,
      category_id,
      user_id,
      wallet_id,
      month,
    })

    //  verify access
    await this._walletRepository.verifyWalletWriteAccess(wallet_id, user_id)
    await this._categoryRepository.verifyCategoryOwner(category_id, user_id)
    await this._walletRepository.verifyWalletWriteAccess(wallet_id, user_id)

    const result = await this._planningRepository.addPlanning(registerPlanning)
    return result
  }

  async updatePlanning({
    id,
    name,
    amount,
    category_id,
    user_id,
    wallet_id,
  }: UpdatePlanningPayload): Promise<{ id: string }> {
    const updateDataPlanning = new UpdateDataPlanning({
      name,
      amount,
      category_id,
      user_id,
      wallet_id,
    })

    //  verify access
    await this._planningRepository.verifyPlanningWriteAccess(id, user_id)
    await this._walletRepository.verifyWalletWriteAccess(wallet_id, user_id)
    await this._categoryRepository.verifyCategoryOwner(category_id, user_id)

    const result = await this._planningRepository.updatePlanning(
      id,
      updateDataPlanning,
    )
    return result
  }

  async deletePlanning({
    id,
    user_id,
  }: DeletePlanningPayload): Promise<{ id: string }> {
    // verify access
    await this._planningRepository.verifyPlanningWriteAccess(id, user_id)

    const result = await this._planningRepository.softDeletePlanningById(id)

    return result
  }

  async restorePlanning({
    id,
    user_id,
  }: DeletePlanningPayload): Promise<{ id: string }> {
    // verify access
    await this._planningRepository.verifyPlanningWriteAccess(id, user_id)

    const result = await this._planningRepository.restorePlanningById(id)

    return result
  }
}

export default PlanningsUseCase
