'use strict';

var moment = require('moment');

module.exports = app => {
  const Sequelize = app.Sequelize;
  const { STRING, INTEGER, DATE, TEXT } = Sequelize;

  const ProductLog = app.model.define(
    'nova_product_log',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      productId: {
        field: 'product_id',
        type: INTEGER,
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '产品id'
      },
      deviceId: {
        field: 'device_id',
        type: STRING(20),
        validate: {
          notEmpty: true
        },
        allowNull: false,
        comment: '设备id'
      },
      ip: {
        type: STRING(20),
        comment: 'ip'
      },
      version: {
        type: STRING(20),
        comment: '最新版本'
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

  ProductLog.sync().then(function(result) {
    console.log('同步ProductLog表成功');
  });

  return ProductLog;
};
