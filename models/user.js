'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    userid: DataTypes.STRING,
    username: DataTypes.STRING,
    twitteravi: DataTypes.STRING,
    token: DataTypes.STRING,
    tokensecret: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};