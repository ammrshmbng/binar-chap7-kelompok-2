'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_game_room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_game_room.belongsTo(models.user_game, { foreignKey: 'id_user', sourceKey: 'id' });
    }
  }
  user_game_room.init({
    id_user: DataTypes.STRING,
    nama_room: DataTypes.STRING,
    player1: DataTypes.STRING,
    player2: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_game_room',
  });
  return user_game_room;
};