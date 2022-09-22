const { Sequelize } = require('./models');
const db = require('./models');
const { Op } = require('sequelize');

(async function () {
  try {
    await db.sequelize.authenticate()
    console.log('connection has been established successfully')
  } catch (error) {
    console.error('unable to authenticate:', error.message)
  }

  // //1. На получение всех данных из таблиц

  // try {
  //   const brandsAll = await db.Brand.findAll({ raw: true })
  //   console.log(JSON.stringify(brandsAll, null, 2))
  // } catch (error) {
  //   console.error('Bad request:', error.message)
  // }

  // //////////////////////

  // //2. Получение данных для id больше

  // try {
  //   const items = await db.Item.findAll({
  //     where: {
  //       id: { [Op.gt]: 10 },
  //     },
  //   })
  //     console.log(JSON.stringify(items, null, 2))
  // } catch (error) {
  //   console.error('Bad request:', error.message)
  // }

  // //3. Получение набора данных для нескольких значений одного атрибута.

  // try {
  //   const models = await db.Model.findAll({
  //     where: {
  //       brand_id: [2, 0],
  //     },
  //   })
  //   console.log(JSON.stringify(models, null, 2))

  // } catch (error) {
  // console.error('Bad request:', error.message)

  // }

  // //4.Прописать запрос на удаление данных по массиву значений атрибута.

  // try {
  //   const deleteItems = await db.Item.destroy({
  //     where: {
  //       brand_id: [2, 0],
  //     },
  //   })
  

  // } catch (error) {
  //   console.error('Bad request:', error.message)
  // }

  // //5.Прописать запрос на изменение данных.

  // const updatedStore = {
  //   title: 'UpdatedStore',
  // }

  // try {
  //   const updateStore = await db.Store.update(updatedStore, {
  //     where: {
  //       title: 'Store #0',
  //     },
  //   })
     

  // } catch (error) {
  //   console.error('Bad request:', error.message)
  // }

  //////////////
})()
