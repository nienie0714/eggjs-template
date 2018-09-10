const Service = require('egg').Service;

class SyslogService extends Service {
  async getData() {
    return await this.ctx.model.Syslog.findAll({
      attributes: {
        exclude: ['created_at', 'updated_at', 'password']
      }
    });
  }

  async addData(params) {
    let result = await this.ctx.model.Syslog.create({ ...params });
    return result.dataValues;
  }

  async updateData(id, params) {
    let result = await this.ctx.model.Syslog.update({ ...params }, { where: { id } });
    return result[0];
  }

  async delData(id) {
    const result = await this.ctx.model.Syslog.destroy({ where: { id } });
    return result;
  }
}

module.exports = SyslogService;
