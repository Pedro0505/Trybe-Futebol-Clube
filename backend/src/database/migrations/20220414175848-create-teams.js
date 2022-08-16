'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      team_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('teams')
  }
};
