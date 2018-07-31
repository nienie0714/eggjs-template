'use strict';

module.exports = appInfo => {
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1533007139610_3534';

  // add your config here
  config.middleware = [];

  config.security = {
    csrf: false
  };

  config.mysql = {
    // 单数据库配置信息
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'vuesql'
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  };
  return config;
};
