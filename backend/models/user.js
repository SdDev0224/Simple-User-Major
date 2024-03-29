'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    birthday: DataTypes.STRING
  });

  User.associate = function(models) {
    models.User.hasMany(models.Task);
  };

  return User;
};
