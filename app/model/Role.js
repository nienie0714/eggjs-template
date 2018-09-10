'use strict';

var moment = require('moment');
var dbData = require('../../db');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE } = Sequelize;

  const Role = app.model.define(
    'sys_role',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: STRING(20),
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '角色名称'
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

  app.beforeStart(async () => {
    Role.belongsToMany(app.model.Acl, { as: 'roles', through: 'sys_role_acl', foreignKey: 'acl_id' });
    app.model.Acl.belongsToMany(Role, { through: 'sys_role_acl', foreignKey: 'role_id' });
    await app.model.sync();
  });

  Role.sync().then(function(result) {
    console.log('同步Role表成功');
    Role.bulkCreate(dbData.role, { ignoreDuplicates: true });
  });

  return Role;
};
