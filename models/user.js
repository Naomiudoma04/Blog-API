'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        User.hasMany(models.Post, {foreignKey:"userId", as: "posts"})
    }
  }
  User.init({
    id: {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  allowNull: false,
  primaryKey: true
},
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false
    }
    }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};