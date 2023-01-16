const { DataTypes, Sequelize } = require("@rumsan/core").SequelizeDB;

const { AbstractModel } = require("@rumsan/core/abstract");
const  { PROJECT_VENDORS } = require("../../constants/dbTables");
const schema = {
  projectId: {
    type: DataTypes.INTEGER,
    allowNull : false,
  },
  vendorId: {
    type: DataTypes.INTEGER,
    allowNull : false,
  },
 
};
module.exports = class ProjectVendors extends AbstractModel {
  schema = schema;
  constructor() {
    super({ tableName: PROJECT_VENDORS });
  }
};
