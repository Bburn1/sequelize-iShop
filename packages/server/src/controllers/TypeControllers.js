import createError from 'http-errors'

import { Type, sequelize } from '../db/models'

class TypeController {
  async getTypes(req, res, next) {
    try {
      const allTypes = await Type.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      })
      if (allTypes) {
        console.log('Result found' + JSON.stringify(allTypes, null, 2))
        res.status(200).json(allTypes)
      } else {
        
        next(createError(404, 'Type not found'))
      }
    } catch (error) {
      next(error)
      console.log(error.massage)
    }
  }

  async getOneType(req, res, next) {
    try {
      const id = req.params.id
      const TypeByPk = await Type.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      })

      if (TypeByPk) {
        console.log('Result found' + JSON.stringify(TypeByPk, null, 2))
        res.status(200).json(TypeByPk)
      } else {
       
        next(createError(404, 'Type not found'))
      }
    } catch (error) {
      next(error)

      console.log(error.massage)
    }
  }

  async createType(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const body = req.body
      const createdType = await Type.create(body, { transaction: t })

      if (createdType) {
        console.log(JSON.stringify(createdType, null, 2))
        res.status(200).json(createdType)
      } else {
        
        next(createError(404, 'Type not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()
      next(error)

      console.log(error.massage)
    }
  }

  async updateType(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const body = req.body
      const updatedType = await Type.update(body, {
        transaction: t,
        where: {
          id: body.id,
        },
        returning: true,
        raw: true,
      })
      if (updatedType) {
        console.log(JSON.stringify(updatedType, null, 2))
        res.status(200).json(updatedType)
      } else {
       
        next(createError(404, 'Type not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }

  async changeType(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const {
        params: { id },
        body,
      } = req
      const [rowsCount, [updatedType]] = await Type.update(body, {
        raw: true,
        transaction: t,
        returning: true,
        where: { id },
      })

      if (rowsCount > 0) {
        console.log(updatedType)
        res.status(200).json(updatedType)
      } else {
        
        next(createError(404, 'Type not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }

  async deleteType(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const id = req.params.id

      const deleteType = await Type.destroy({ where: { id } })

      if (deleteType) {
        res.status(200).json(deleteType)
      } else {
       
        next(createError(404, 'Type not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }
}

export default new TypeController()
