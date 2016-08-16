var PROTO_PATH = __dirname + '/protos/calculator.proto';

var grpc = require('grpc');
var calculator = grpc.load(PROTO_PATH).calculator;
var client = new calculator.Calculator('localhost:50051',
                                      grpc.credentials.createInsecure());

var number1 = {
  value: 35
};
var number2 = {
  value: 4
};
var numberPair = {
  num1: number1,
  num2: number2
};

client.sub(numberPair, function(error, number) {
  if (error) {
    console.log('it errored!')
    console.log(error)
  }
  console.log(number1.value + ' - ' + number2.value + ' is ' + number.value);
  console.log(Date.now());
});

//client.add(numberPair, function(error, number) {
//  console.log(number1.value + ' + ' + number2.value + ' is ' + number.value);
//})
