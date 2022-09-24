import createError from 'http-errors'

import { Store, sequelize } from '../db/models'

class StoreController {
  async getStores(req, res, next) {
    try {
      const allStores = await Store.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      })
      if (allStores) {
        console.log('Result found' + JSON.stringify(allStores, null, 2))
        res.status(200).json(allStores)
      } else {
        next(createError(404, 'Store not found'))
      }
    } catch (error) {
      next(error)
      console.log(error.massage)
    }
  }

  async getOneStore(req, res, next) {
    try {
      const id = req.params.id
      const StoreByPk = await Store.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      })

      if (StoreByPk) {
        console.log('Result found' + JSON.stringify(StoreByPk, null, 2))
        res.status(200).json(StoreByPk)
      } else {
        next(createError(404, 'Store not found'))
      }
    } catch (error) {
      next(error)

      console.log(error.massage)
    }
  }

  async createStore(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const body = req.body
      const createdStore = await Store.create(body, { transaction: t })

      if (createdStore) {
        console.log(JSON.stringify(createdStore, null, 2))
        res.status(200).json(createdStore)
      } else {
        next(createError(404, 'Store not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()
      next(error)

      console.log(error.massage)
    }
  }

  async updateStore(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const body = req.body
      const updatedStore = await Store.update(body, {
        transaction: t,
        where: {
          id: body.id,
        },
        returning: true,
        raw: true,
      })
      if (updatedStore) {
        console.log(JSON.stringify(updatedStore, null, 2))
        res.status(200).json(updatedStore)
      } else {
        next(createError(404, 'Store not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }

  async changeStore(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const {
        params: { id },
        body,
      } = req
      const [rowsCount, [updatedStore]] = await Store.update(body, {
        raw: true,
        transaction: t,
        returning: true,
        where: { id },
      })

      if (rowsCount > 0) {
        console.log(updatedStore)
        res.status(200).json(updatedStore)
      } else {
        next(createError(404, 'Store not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }

  async deleteStore(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const id = req.params.id

      const deleteStore = await Store.destroy({ where: { id } })

      if (deleteStore) {
        res.status(200).json(deleteStore)
      } else {
        next(createError(404, 'Store not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }
}

export default new StoreController()
