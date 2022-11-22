const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("type", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
    },
  });
};
