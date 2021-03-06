// Generated by CoffeeScript 1.9.1
var application, base;

if ((base = process.env).NODE_ENV == null) {
  base.NODE_ENV = "development";
}

process.on('uncaughtException', function(err) {
  console.error(err.message);
  return console.error(err.stack);
});

if (!process.env.DEFAULT_REDIRECT_PORT) {
  process.env.DEFAULT_REDIRECT_PORT = 9103;
}

application = module.exports = function(callback) {
  var americano, errorMiddleware, initialize, options;
  americano = require('americano');
  initialize = require('./server/initialize');
  errorMiddleware = require('./server/middlewares/errors');
  options = {
    name: 'proxy',
    port: process.env.PORT || 9104,
    host: process.env.HOST || "127.0.0.1",
    root: __dirname
  };
  return americano.start(options, function(app, server) {
    var CozyInstance, axon, socket;
    app.use(errorMiddleware);
    initialize(app, server, callback);
    axon = require('axon');
    socket = axon.socket('sub-emitter');
    socket.connect(9105);
    CozyInstance = require('./server/models/instance');
    return socket.on('cozyinstance.update', CozyInstance.updateDomainCache);
  });
};

if (!module.parent) {
  application();
}
