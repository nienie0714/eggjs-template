'use strict';

var moment = require('moment');
var dbData = require('../../db');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE } = Sequelize;

  const Acl = app.model.define(
    'sys_acl',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      parentId: {
        field: 'parent_id',
        type: INTEGER,
        comment: '父权限id'
      },
      code: {
        type: STRING(20),
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '权限码'
      },
      name: {
        type: STRING(20),
        comment: '权限名称'
      },
      remark: {
        type: STRING
      },
      status: {
        type: INTEGER,
        validate: {
          isIn: {
            args: [[0, 1, 2]],
            msg: '非法状态码'
          }
        },
        defaultValue: 1,
        comment: '状态：1有效|0无效|2删除'
      },
      createdBy: {
        field: 'created_by',
        type: STRING(20)
      },
      updatedBy: {
        field: 'udpated_by',
        type: STRING(20)
      },
      createdAt: {
        field: 'created_at',
        type: DATE,
        get(val) {
          let time = this.getDataValue(val);
          if (time) {
            time = moment(time).format('YYYY-MM-DD HH:mm:ss');
          }
          return time || '';
        },
        set(val) {
          return this.setDataValue(val, Sequelize.NOW);
        }
      },
      updatedAt: {
        field: 'updated_at',
        type: DATE,
        get(val) {
          let time = this.getDataValue(val);
          if (time) {
            time = moment(time).format('YYYY-MM-DD HH:mm:ss');
          }
          return time || '';
        },
        set(val) {
          return this.setDataValue(val, Sequelize.NOW);
        }
      }
    },
    {
      freezeTableName: true
    }
  );

  Acl.sync().then(function(result) {
    console.log('同步Acl表成功');
    Acl.bulkCreate(dbData.acl, { ignoreDuplicates: true });
  });

  return Acl;
};
