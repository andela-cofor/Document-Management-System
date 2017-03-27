module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: (models) => {
        Roles.hasMany(models.Users, { foreignKey: 'rolesId' });
      }
    }
  });
  return Roles;
};
