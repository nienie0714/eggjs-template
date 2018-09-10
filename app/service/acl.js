const Service = require('egg').Service;

class AclService extends Service {
  async getData() {
    return await this.ctx.model.Acl.findAll({
      attributes: {
        exclude: ['created_at', 'updated_at']
      }
    });
  }

  async addData(params) {
    let result = await this.ctx.model.Acl.create({ ...params });
    return result.dataValues;
  }

  async updateData(id, params) {
    let result = await this.ctx.model.Acl.update({ ...params }, { where: { id } });
    return result[0];
  }

  async delData(id) {
    const result = await this.ctx.model.Acl.destroy({ where: { id } });
    return result;
  }
}

module.exports = AclService;
