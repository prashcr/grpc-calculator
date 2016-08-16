var PROTO_PATH = __dirname + '/protos/calculator.proto';

var grpc = require('grpc');
var calculator = grpc.load(PROTO_PATH).calculator;

function add(numberPair) {
  return {
    value: numberPair.num1.value + numberPair.num2.value
  }
}

function sub(numberPair) {
  return {
    value: numberPair.num1.value - numberPair.num2.value,
    yolo: 'hi'
  }
}

function mult(numberPair) {
  return {
    value: numberPair.num1.value * numberPair.num2.value
  }
}

function div(numberPair) {
  return {
    value: numberPair.num1.value / numberPair.num2.value
  }
}

function handle(method) {
  return function(call, callback) {
    callback(null, method(call.request));
  };
}

function getServer() {
  var server = new grpc.Server();
  server.addProtoService(calculator.Calculator.service, {
    add: handle(add),
    sub: handle(sub),
    mult: handle(mult),
    div: handle(div)
  });
  return server;
}

var routeServer = getServer();
routeServer.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
routeServer.start();
