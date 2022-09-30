import createError from 'http-errors'

import {Customer, sequelize} from '../db/models'
import ItemControllers from './ItemControllers'

class CustomerController {
  async getCustomers(req, res, next) {
    try {
      const allCustomers = await Customer.findAll({
        attributes: ['id', 'name', 'email', 'password'],
      })

      if (allCustomers) {
        console.log('Result found' + JSON.stringify(allCustomers, null, 2))
        res.status(200).json(allCustomers)
      } else {
        next(createError(404, 'Customer not found'))
      }
    } catch (error) {
      next(error)
      console.log(error.massage)
    }
  }

  async getCustomerByPk(req, res, next) {
    try {
      const id = req.params.id

      const customerByPk = await Customer.findByPk(id, {
        attributes: ['id', 'name', 'email', 'password'],
      })

      if (customerByPk) {
        console.log('Customer by Pk: ' + JSON.stringify(customerByPk, null, 2))
        res.status(200).json(customerByPk)
      } else {
        next(createError(404, 'Customer not found'))
      }
    } catch (error) {
      next(error)
      console.log(error.massage)
    }
  }

  async createCustomer(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const body = req.body

      const createCustomer = await Customer.create(body, { transaction: t })

      if (createCustomer) {
        console.log(JSON.stringify(createCustomer, null, 2))
        res.status(200).json(createCustomer)
      } else {
        next(createError(404, 'Customer not created'))
      }

      t.commit()
    } catch (error) {
      next(error)
      console.log(error.massage)
      t.rollback()
    }
  }
  async updateCustomer(req, res, next) {
    const t = await sequelize.transaction()

    try {
      const body = req.body
      const updatedCustomer = await Customer.update(body, {
        transaction: t,
        where: {
          id: body.id,
        },
        returning: true,
        raw: true,
      })
      if (updatedCustomer) {
        console.log(JSON.stringify(updatedCustomer, null, 2))
        res.status(200).json(updatedCustomer)
      } else {
        // res.status(404).send(`Customer not found`)
        next(createError(404, 'Customer not found'))
      }
      t.commit()
    } catch (error) {
      t.rollback()

      next(error)

      console.log(error.massage)
    }
  }

  async changeCustomer(req,res,next) {

    const t = await sequelize.transaction()


    try {
      const {
        params :{id},
        body
      } = req


      const [rowsCount,[updatedCustomer] ] = await Customer.update(body, {
        raw : true,
        transaction : t,
        returning : true,
        where : {id}
      })
      if ( rowsCount > 0){
        console.log(updatedCustomer);
        res.status(200).json(updatedCustomer)
      }else{
        next(createError(404, 'Customer not found'))

      }
      t.commit()
    } catch (error) {
      t.rollback()
      next(error)
    }

  }




  async deleteCustomer(req,res,next) {

    const t = await sequelize.transaction()

    try {
      const id = req.params.id

      const deleteCustomer = await Customer.destroy({where: {id} })

      if(deleteCustomer){
       res.status(200).json(deleteCustomer)

      }else{
        next(createError(404, 'Customer not found'))

      }
      t.commit()
    } catch (error) {
      t.rollback()
      next(error)
    }

  }



  async addImage(req,res,next) {
    const t = await sequelize.transaction()

    try {
      const {
        file:{filename},
        params:{id}
      } = req 

      const [rowsCount,[updatedCustomer]] = await Customer.update({image:filename},{
        where: {id},
        transaction: t,
        raw: true,
        returning: true,
      })

      if(rowsCount >0 ){
        console.log(updatedCustomer);
        res.status(200).json(updatedCustomer)
      }else{
        next(createError(404, 'Customer not found'))
      }

      t.commit()
    } catch (error) {
      console.log(error.massage);
      t.rollback()
      next(error)
    }


  }
}

export default new CustomerController