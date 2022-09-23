import {Router} from 'express'
//================================
import itemControllers from '../controllers/ItemControllers'

const itemRouter = new Router();

itemRouter.route('/')
.get(itemControllers.getItems)
.post(itemControllers.createItem)
.put(itemControllers.updateItem)

itemRouter.route('/:id')
.get(itemControllers.getOneItem)
.patch(itemControllers.changeItem)
.delete(itemControllers.deleteItem)




export default itemRouter;