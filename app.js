// app.js
module.exports = app => {
  app.beforeStart(async () => {
    // 应用会等待这个函数执行完成才启动
    // app.cities = await app.curl('http://example.com/city.json', {
    //   method: 'GET',
    //   dataType: 'json'
    // });
    // 也可以通过以下方式来调用 Service
    // const ctx = app.createAnonymousContext();
    // app.cities = await ctx.service.cities.load();
  });

  app.on('error', (err, ctx) => {
    console.log('error111----------', err);
  });
  app.on('request', ctx => {
    console.log(`--------------${ctx.request.method}请求${ctx.request.url}--------------`);
    // ctx.body = '系统错误';
    // ctx.status = 500;
  });
  app.on('response', ctx => {
    if (ctx.response.status === 500) {
      ctx.body = '系统错误';
      ctx.status = 500;
    }
  });
};
