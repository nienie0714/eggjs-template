const Service = require('egg').Service;

class UserService extends Service {
  async getData({ pageSize = this.app.config.pageSize, pageNum = 1, username = '', roleId, status = 1 } = {}) {
    pageSize = Number.parseInt(pageSize);
    pageNum = Number.parseInt(pageNum);
    status = Number.parseInt(status || 1);
    let usernameFilter = {};
    let roleIdFilter = {};

    if (username) {
      usernameFilter = {
        username: {
          $like: `%${username}%`
        }
      };
    }

    if (roleId) {
      roleIdFilter = {
        where: {
          id: roleId
        }
      };
    }

    return await this.ctx.model.User.findAndCountAll({
      where: {
        status,
        ...usernameFilter
      },
      offset: pageSize * (pageNum - 1),
      limit: pageSize,
      attributes: {
        exclude: ['created_at', 'updated_at', 'password']
      },
      include: [
        {
          model: this.ctx.app.model.Role,
          attributes: {
            exclude: ['created_at', 'updated_at', 'remark', 'status', 'createdBy', 'updatedBy']
          },
          as: 'roles',
          through: {
            attributes: []
          },
          ...roleIdFilter
        }
      ],
      distinct: true
    });
  }

  async addData({ username, roles = [], phone, email, password, remark }) {
    if (!(roles instanceof Array)) {
      return {};
    }

    if (!roles.length) {
      return { msg: '请分配角色！' };
    }

    let role = await this.ctx.model.Role.findAll({ where: { id: { $in: roles }, status: 1 } });

    if (roles.length !== role.length) {
      return { msg: '部分角色无效！' };
    }

    let user = await this.ctx.model.User.create({ username, phone, email, password, remark });
    user.setRoles(role);
    return { result: user };
  }

  async updateData(id, params) {
    if (params.status === 2) {
      return { msg: '非法操作!' };
    }

    let result = await this.ctx.model.User.update(
      { ...params },
      {
        where: {
          id
        }
      }
    );
    return { length: result[0] };
  }

  async delData(id) {
    const result = await this.ctx.model.User.findById(id);
    if (result.status === 1) {
      return { msg: '有效用户不能删除！' };
    }

    let result = await this.ctx.model.User.update({ status: 2 }, { where: { id, status: 0 } });
    return { length: result[0] };
  }
}

module.exports = UserService;
