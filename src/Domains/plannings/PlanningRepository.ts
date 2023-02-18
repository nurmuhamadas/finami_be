import FilterPlanning from './entities/FilterPlanning'
import RegisterPlanning from './entities/RegisterPlanning'
import UpdateDataPlanning from './entities/UpdateDataPlanning'
import { PlanningDataType } from './entities/types'
import { GetPlanningResult, GetPlanningsResult } from './types'

class PlanningRepository {
  async addPlanning(
    registerPlanning: RegisterPlanning,
  ): Promise<{ id: string }> {
    throw new Error('PLANNING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async updatePlanning(
    id: string,
    updateDataPlanning: UpdateDataPlanning,
  ): Promise<{ id: string }> {
    throw new Error('PLANNING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async softDeletePlanningById(id: string): Promise<{ id: string }> {
    throw new Error('PLANNING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async restorePlanningById(id: string): Promise<{ id: string }> {
    throw new Error('PLANNING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getPlanningsByUserId(
    userId: string,
    filter?: FilterPlanning,
  ): Promise<GetPlanningsResult> {
    throw new Error('PLANNING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getPlanningById(id: string): Promise<GetPlanningResult> {
    throw new Error('PLANNING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async verifyPlanningOwner(id: string, userId: string): Promise<boolean> {
    throw new Error('PLANNING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }
}

export default PlanningRepository
