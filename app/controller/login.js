const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    const result = await this.ctx.service.login.login(this.ctx.request.body);
    if (result) {
      this.ctx.success({ userId: result });
    } else {
      this.ctx.fail('用户名或密码错误');
    }
  }
}

module.exports = LoginController;
