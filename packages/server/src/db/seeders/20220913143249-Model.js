'use strict'

const models = []
for (let i = 0; i < 10; i++) {
  models.push({
    title: `Model #${i}`,
    brand_id: Math.trunc((Math.random() * 9)+1),
    created_at: new Date(),
    updated_at: new Date(),
  })
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Models', models, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Models', null, {})
  },
}
