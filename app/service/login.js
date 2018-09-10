const Service = require('egg').Service;

class LoginService extends Service {
  async login({ username = '', password = '' }) {
    const result = await this.ctx.model.User.findOne({
      attributes: {
        exclude: ['created_at', 'updated_at', 'password', 'remark', 'status', 'createdBy', 'updatedBy']
      },
      where: { username, password }
    });
    return result;
  }
}

module.exports = LoginService;
