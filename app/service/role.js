const Service = require('egg').Service;

class RoleService extends Service {
  async getData() {
    return await this.ctx.model.Role.findAll({
      attributes: {
        exclude: ['created_at', 'updated_at']
      }
    });
  }

  async addData(params) {
    let result = await this.ctx.model.Role.create({ ...params });
    return result.dataValues;
  }

  async updateData(id, params) {
    let result = await this.ctx.model.Role.update({ ...params }, { where: { id } });
    return result[0];
  }

  async delData(id) {
    const result = await this.ctx.model.Role.destroy({ where: { id } });
    return result;
  }
}

module.exports = RoleService;
