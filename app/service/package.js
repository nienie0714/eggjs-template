const Service = require('egg').Service;

class PackageService extends Service {
  async getData() {
    return await this.ctx.model.Package.findAll({
      attributes: {
        exclude: ['created_at', 'updated_at', 'password']
      }
    });
  }

  async addData(params) {
    let result = await this.ctx.model.Package.create({ ...params });
    return result.dataValues;
  }

  async updateData(id, params) {
    let result = await this.ctx.model.Package.update({ ...params }, { where: { id } });
    return result[0];
  }

  async delData(id) {
    const result = await this.ctx.model.Package.destroy({ where: { id } });
    return result;
  }
}

module.exports = PackageService;
