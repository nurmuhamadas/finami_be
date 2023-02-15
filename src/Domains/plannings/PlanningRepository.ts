import {
  RegisterPlanningType,
  PlanningFilter,
  UpdateDataPlanningType,
  PlanningDataType,
} from './entities/types'

class PlanningRepository {
  async addPlanning(
    registerPlanning: RegisterPlanningType,
  ): Promise<{ id: string }> {
    throw new Error('PLANNING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async updatePlanning(
    id: string,
    updateDataPlanning: UpdateDataPlanningType,
  ): Promise<{ id: string }> {
    throw new Error('PLANNING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async softDeletePlanningById(id: string): Promise<{ id: string }> {
    throw new Error('PLANNING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getPlanningsByUserId(
    userId: string,
    filter?: PlanningFilter,
  ): Promise<PlanningDataType[]> {
    throw new Error('PLANNING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }

  async getPlanningById(id: string): Promise<PlanningDataType> {
    throw new Error('PLANNING_REPOSITORY.METHOD_NOT_IMPLEMENTED')
  }
}

export default PlanningRepository
