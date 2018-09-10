const Service = require('egg').Service;

class ProductService extends Service {
  async getData() {
    return await this.ctx.model.Product.findAll({
      attributes: {
        exclude: ['created_at', 'updated_at', 'password']
      }
    });
  }

  async addData(params) {
    let result = await this.ctx.model.Product.create({ ...params });
    return result.dataValues;
  }

  async updateData(id, params) {
    let result = await this.ctx.model.Product.update({ ...params }, { where: { id } });
    return result[0];
  }

  async delData(id) {
    const result = await this.ctx.model.Product.destroy({ where: { id } });
    return result;
  }
}

module.exports = ProductService;
