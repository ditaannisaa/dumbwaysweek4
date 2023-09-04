'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  project.init({
    projectname: DataTypes.STRING,
    startdate: DataTypes.STRING,
    enddate: DataTypes.STRING,
    content: DataTypes.TEXT,
    has_nodejd: DataTypes.BOOLEAN,
    has_nextjs: DataTypes.BOOLEAN,
    has_reactjs: DataTypes.BOOLEAN,
    has_typescript: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    dateduration: DataTypes.STRING,
    author: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'project',
  });
  return project;
};