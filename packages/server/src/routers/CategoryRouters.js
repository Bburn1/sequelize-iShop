import { Router } from 'express'
//================================
import categoryControllers from '../controllers/CategoryControllers'

const CategoryRouter = new Router()

CategoryRouter.route('/')
  .get(categoryControllers.getCategorys)
  .post(categoryControllers.createCategory)
  .put(categoryControllers.updateCategory)

CategoryRouter.route('/:id')
  .get(categoryControllers.getOneCategory)
  .patch(categoryControllers.changeCategory)
  .delete(categoryControllers.deleteCategory)

export default CategoryRouter
