const Controller = require('egg').Controller;

class RoleController extends Controller {
  //查询所有数据 get
  async index() {
    const list = await this.ctx.service.role.getData();
    this.ctx.success(list);
  }

  //新增数据 post
  async create() {
    const result = await this.ctx.service.role.addData(this.ctx.request.body);
    this.ctx.success({ id: result.id });
  }

  //更新数据 put
  async update() {
    const len = await this.ctx.service.role.updateData(this.ctx.params.id, this.ctx.request.body);
    if (len) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail('角色不存在！');
    }
  }

  //删除数据 delete
  async destroy() {
    const len = await this.ctx.service.role.delData(this.ctx.params.id);
    if (len) {
      this.ctx.success({ status: 1 });
    } else {
      this.ctx.fail('角色不存在！');
    }
  }
}

module.exports = RoleController;
