import {Router} from 'express'
//==================================
import itemRouter from './itemRouters'
import customerRouter from './CustomerRouters'
import OrderRouter from './OrderRouters'
import CategoryRouter from './CategoryRouters'
import TypeRouter from './TypeRouters.js'
import StoreRouter from './StoreRouters'
import BrandRouter from './BrandRouters'
import ModelRouter from './ModelRouters'


const router = new Router()

router.use('/items', itemRouter)
router.use('/customers', customerRouter)
router.use('/orders', OrderRouter)
router.use('/categories', CategoryRouter)
router.use('/types', TypeRouter)
router.use('/stores', StoreRouter)
router.use('/brands', BrandRouter)
router.use('/models', ModelRouter)







export default router;