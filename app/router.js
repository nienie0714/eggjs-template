'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

// app/router.js
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.post('/upload', controller.upload.create);
  router.get('/download-center', controller.download.index);
  router.get('/download', controller.download.download);
  router.get('/download-image', controller.download.downloadImage);
  router.resources('user', '/users', controller.user);
  router.resources('role', '/roles', controller.role);
  router.resources('acl', '/acls', controller.acl);
  router.resources('product', '/products', controller.product);
  router.resources('package', '/package', controller.package);
  router.resources('syslog', '/syslog', controller.syslog);
  router.post('/login', controller.login.login);
};
