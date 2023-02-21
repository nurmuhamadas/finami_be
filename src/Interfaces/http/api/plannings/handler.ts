import { Request } from '@hapi/hapi'
import autoBind from 'auto-bind'
import containerInstance from '../../../../Infrastructures/container'
import WalletsUseCase from '../../../../Applications/use_case/WalletsUseCase'
import PlanningsUseCase from '../../../../Applications/use_case/PlanningsUseCase'

class PlanningsHandlers {
  _container: typeof containerInstance

  constructor(container: typeof containerInstance) {
    this._container = container

    autoBind(this)
  }

  async getPlanningsHandler(request: Request, h: any) {
    const planningUseCase: PlanningsUseCase = this._container.getInstance(
      PlanningsUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { child_id, start_month, end_month, wallet_id } = request.query as any
    const data = await planningUseCase.getPlannings({
      user_id: userId as string,
      child_id,
      month: [start_month, end_month],
      wallet_id,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(200)
    return response
  }

  async getPlanningByIdHandler(request: Request, h: any) {
    const planningUseCase: PlanningsUseCase = this._container.getInstance(
      PlanningsUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { id } = request.params as any

    const data = await planningUseCase.getPlanningById({
      id,
      user_id: userId as string,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(200)
    return response
  }

  async postPlanningHandler(request: Request, h: any) {
    const planningUseCase: PlanningsUseCase = this._container.getInstance(
      PlanningsUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { name, amount, month, category_id, wallet_id } =
      request.payload as any

    const data = await planningUseCase.addPlanning({
      user_id: userId as string,
      name,
      amount,
      month,
      category_id,
      wallet_id,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(201)
    return response
  }

  async putPlanningHandler(request: Request, h: any) {
    const planningUseCase: PlanningsUseCase = this._container.getInstance(
      PlanningsUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { id } = request.params
    const { name, amount, category_id, wallet_id } = request.payload as any

    const data = await planningUseCase.updatePlanning({
      id,
      user_id: userId as string,
      name,
      amount,
      category_id,
      wallet_id,
    })

    const response = h.response({
      status: 'success',
      data,
    })
    response.code(200)
    return response
  }

  async deletePlanningHandler(request: Request, h: any) {
    const planningUseCase: PlanningsUseCase = this._container.getInstance(
      PlanningsUseCase.name,
    )

    const { id: userId } = request.auth.credentials
    const { id } = request.params

    const data = await planningUseCase.deletePlanning({
      id,
      user_id: userId as string,
    })

    return {
      status: 'success',
      data,
    }
  }
}

export default PlanningsHandlers
