'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_game_histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },id_user: {
        type: Sequelize.STRING,
        references: {
          model: {
            tableName: 'user_games',
            schema: 'public'
          },
          key: 'id'
        },
        allowNull: false
      },
      id_player1: {
        type: Sequelize.STRING
      },
      id_player_2: {
        type: Sequelize.STRING
      },
      pilihan_p1: {
        type: Sequelize.STRING
      },
      pilihan_p2: {
        type: Sequelize.STRING
      },
      hasil: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_game_histories');
  }
};