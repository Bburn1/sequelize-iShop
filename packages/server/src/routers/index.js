import {Router} from 'express'
//==================================
import itemRouter from './itemRouters'

const router = new Router()

router.use('/items', itemRouter)

export default router;