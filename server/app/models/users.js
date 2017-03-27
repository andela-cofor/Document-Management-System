module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Users.hasMany(models.Documents, { foreignKey: 'ownerId' });
        Users.belongsTo(models.Roles, {
          foreignKey: 'rolesId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Users;
};
