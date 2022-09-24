import { Router } from 'express'
//================================
import modelControllers from '../controllers/ModelControllers'

const ModelRouter = new Router()

ModelRouter.route('/')
  .get(modelControllers.getModels)
  .post(modelControllers.createModel)
  .put(modelControllers.updateModel)

ModelRouter.route('/:id')
  .get(modelControllers.getOneModel)
  .patch(modelControllers.changeModel)
  .delete(modelControllers.deleteModel)

export default ModelRouter
