module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'role already exist'
      },
      validate: {
        is: {
          args: /\w+/g,
          msg: 'Input a valid title'
        },
        notEmpty: {
          msg: 'This field cannot be empty'
        }
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Roles.hasMany(models.Users, { foreignKey: 'rolesId' });
      }
    }
  });
  return Roles;
};
