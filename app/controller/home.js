'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const result = await this.app.mysql.select('user');
    this.ctx.body = result;
  }
}

module.exports = HomeController;
