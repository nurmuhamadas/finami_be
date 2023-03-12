import FilterPlanning from './entities/FilterPlanning'
import RegisterPlanning from './entities/RegisterPlanning'
import UpdateDataPlanning from './entities/UpdateDataPlanning'
import { PlanningDataRepoType } from './types'

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
    filter: FilterPlanning,
  ): Promise<PlanningDataRepoType[]> {
    throw new Error('PLANNING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getAllPlannings(
    userId: string,
    filter: FilterPlanning,
  ): Promise<PlanningDataRepoType[]> {
    throw new Error('PLANNING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getPlanningById(id: string): Promise<PlanningDataRepoType> {
    throw new Error('PLANNING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async verifyPlanningWriteAccess(
    id: string,
    userId: string,
  ): Promise<boolean> {
    throw new Error('PLANNING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async verifyPlanningReadAccess(id: string, userId: string): Promise<boolean> {
    throw new Error('PLANNING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async verifyAvailableNameThisMonth(
    userId: string,
    planName: string,
    month: Date,
  ): Promise<boolean> {
    throw new Error('PLANNING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }
}

export default PlanningRepository
