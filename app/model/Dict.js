'use strict';

var moment = require('moment');
var dbData = require('../../db');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE } = Sequelize;

  const Dict = app.model.define(
    'sys_dict',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      type: {
        type: STRING(20),
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '字典类型'
      },
      name: {
        type: STRING(20),
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '字典名称'
      },
      code: {
        type: STRING(20),
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '字典编码'
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  Dict.sync().then(function(result) {
    console.log('同步Dict表成功', result);
    Dict.bulkCreate(dbData.dict, { ignoreDuplicates: true });
  });

  return Dict;
};
