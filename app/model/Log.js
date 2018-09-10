'use strict';

var moment = require('moment');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE } = Sequelize;

  const Log = app.model.define(
    'sys_log',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      target: {
        type: STRING(20),
        comment: '操作对象'
      },
      operateType: {
        field: 'operate_type',
        type: INTEGER,
        validate: {
          isIn: {
            args: [[0, 1, 2]],
            msg: '非法状态码'
          }
        },
        defaultValue: 1,
        comment: '操作类型：0新增|1修改|2删除'
      },
      ip: {
        type: STRING(20),
        comment: 'ip'
      },
      operateTime: {
        field: 'operate_time',
        type: DATE,
        comment: '操作时间'
      },
      operateContent: {
        field: 'operate_content',
        type: STRING,
        comment: '操作内容'
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

  Log.sync().then(function(result) {
    console.log('同步Log表成功');
  });

  return Log;
};
