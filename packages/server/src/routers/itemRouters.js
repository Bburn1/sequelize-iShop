import {Router} from 'express'
//================================
import itemControllers from '../controllers/ItemControllers'
import { validate, pagination } from '../middleware'

const itemRouter = new Router();

itemRouter
  .route('/')
  .get(pagination.paginationItems,itemControllers.getItems)
  .post(validate.validateNewItem, itemControllers.createItem)
  .put(validate.validateNewItem, itemControllers.updateItem)

itemRouter
  .route('/:id')
  .get(itemControllers.getOneItem)
  .patch(validate.validateChangeItem,itemControllers.changeItem)
  .delete(itemControllers.deleteItem)


 




export default itemRouter;