'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    Post.belongsTo(models.User, {foreignKey:"userId", as: "users"})
    }
  }
  Post.init({
    id: {
  type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  allowNull: false,
  primaryKey: true
},
    title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
   userId: {
  type: DataTypes.UUID,
  allowNull: false,
  references: {
    model: 'Users',
    key: 'id'
  },
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE'
}
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};