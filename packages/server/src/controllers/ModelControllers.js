import createError from 'http-errors'

import { IModel, Brand, sequelize } from '../db/models'

class ModelController {
  async getModels(req, res, next) {
    try {
      const allModels = await IModel.findAll({
        include: [
          {
            model: Brand,
            attributes: ['id', 'title'],
            required: true,
          },
        ],
        attributes: ['id', 'title', 'description'],
      })

      if (allModels) {
        console.log('Result found' + JSON.stringify(allModels, null, 2))
        res.status(200).json(allModels)
      } else {
        next(createError(404, 'IModel not found'))
      }
    } catch (error) {
      next(error)
      console.log(error.massage)
    }
  }

  async getOneModel(req, res, next) {
    try {
      const id = req.params.id
      const ModelByPk = await IModel.findByPk(id, {
        include: [
          {
            model: Brand,
            attributes: ['id', 'title'],
            required: true,
          },
        ],
        attributes: ['id', 'title', 'description'],
      })

      if (ModelByPk) {
        console.log('Result found' + JSON.stringify(ModelByPk, null, 2))
        res.status(200).json(ModelByPk)
      } else {
        next(createError(404, 'IModel not found'))
      }
    } catch (error) {
      next(error)

      console.log(error.massage)
    }
  }

  async createModel(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const body = req.body
      const createdModel = await IModel.create(body, { transaction: t })

      if (createdModel) {
        console.log(JSON.stringify(createdModel, null, 2))
        res.status(200).json(createdModel)
      } else {
        next(createError(404, 'IModel not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()
      next(error)

      console.log(error.massage)
    }
  }

  async updateModel(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const body = req.body
      const updatedModel = await IModel.update(body, {
        transaction: t,
        where: {
          id: body.id,
        },
        returning: true,
        raw: true,
      })
      if (updatedModel) {
        console.log(JSON.stringify(updatedModel, null, 2))
        res.status(200).json(updatedModel)
      } else {
        next(createError(404, 'IModel not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }

  async changeModel(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const {
        params: { id },
        body,
      } = req
      const [rowsCount, [updatedModel]] = await IModel.update(body, {
        raw: true,
        transaction: t,
        returning: true,
        where: { id },
      })

      if (rowsCount > 0) {
        console.log(updatedModel)
        res.status(200).json(updatedModel)
      } else {
        next(createError(404, 'IModel not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }

  async deleteModel(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const id = req.params.id

      const deleteModel = await IModel.destroy({ where: { id } })

      if (deleteModel) {
        res.status(200).json(deleteModel)
      } else {
        next(createError(404, 'IModel not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }
}

export default new ModelController()
