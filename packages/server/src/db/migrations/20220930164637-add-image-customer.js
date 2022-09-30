'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.addColumn('Customers', 'image' , Sequelize.STRING);
     
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.removeColumn('Customers', 'image')
     
  }
};
