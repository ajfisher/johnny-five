var five = require("../lib/johnny-five.js");
var board = new five.Board({ port: process.argv[2] });

board.on("ready", function() {
  var collection = new five.Proximity.Collection({
    pins: [8, 9, 10, 11],
    controller: "HCSR04I2CBACKPACK",
    freq: 1000,
  });

  collection.on("change", (sensorThatChanged) => {
      console.log("A change occurred on some sensor");
      console.log(sensorThatChanged.pin, sensorThatChanged.cm);
    //console.log(sensorThatChanged.pin, sensorThatChanged.cm);
  });

  collection.on("data", function() {
      console.log("New data should be available across all the sensors");
  });

  collection[0].on("data", function() {
    console.log("specific data events from one item only");
    console.log(this.cm);
  });
});
