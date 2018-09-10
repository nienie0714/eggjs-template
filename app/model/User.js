'use strict';

var moment = require('moment');
var dbData = require('../../db');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE } = Sequelize;

  const User = app.model.define(
    'sys_user',
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
        comment: '姓名'
      },
      code: {
        type: STRING(20),
        comment: '员工编号'
      },
      username: {
        type: STRING(20),
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '账号'
      },
      password: {
        type: STRING,
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '密码'
      },
      phone: {
        type: STRING(20),
        validate: {
          isDecimal: true
        },
        comment: '手机号'
      },
      email: {
        type: STRING,
        validate: {
          isEmail: {
            msg: '邮箱格式不正确'
          }
        }
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
    User.belongsToMany(app.model.Role, { as: 'roles', through: 'sys_role_user', foreignKey: 'user_id' });
    app.model.Role.belongsToMany(User, { through: 'sys_role_user', foreignKey: 'role_id' });
    await app.model.sync();
  });

  User.sync().then(function(result) {
    console.log('同步User表成功');
    User.bulkCreate(dbData.user, { ignoreDuplicates: true });
  });

  return User;
};
