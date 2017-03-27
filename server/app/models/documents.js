module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    complete: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: (models) => {
        Documents.belongsTo(models.Users, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Documents;
};
