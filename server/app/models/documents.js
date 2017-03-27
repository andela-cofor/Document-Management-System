module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    ownerId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        }
      }
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      defaulValue: 'public',
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        },
        isIn: {
          args: [['public', 'private', 'role']],
          msg: 'public, private or role required'
        }
      }
    },
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
