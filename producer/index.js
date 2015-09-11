"use strict";

var http = require('http');

var options = {
  host: 'localhost',
  port: "3000",
  path: '/'
};

var operators = ["*","/","+","-"];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var numberOfCallsMade = 0;
//var runningAverageTimeMs = 0;
var totalMs = 0;

//
// This runs forever. It goes out, asks the consumer to calculate the results of an equation, outputs the results,
// and then calls the consumer again.
// 
function performTask() {

    //
    // Start timing how long it takes for the round trip to/from the consumer.
    //
    var start = new Date().getTime();

    //
    // Get a random operator.
    //
    var operator = operators[Math.floor(Math.random() * operators.length)];

    //
    // Generate a random equation.
    //
    var equation = getRandomInt(1,1000000) + operator + getRandomInt(1,1000000) + "=";

    //
    // Attach the equation to the end of the URL.
    //
    // NOTE: We do GET rather than POST because it is faster. And on the "consumer" site, we could cache
    // queries for the same equation and return the results faster.
    //
    options.path = "/?eq=" + encodeURIComponent(equation);

    //
    // This is called once the HTTP GET has returned.
    //
    function callback(response) {
      var str = '';

      response.on('data', function (chunk) {
        str += chunk;
      });

      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {

        console.log ("RECEIVED <<< " + str);

        var end = new Date().getTime();
        var time = end - start;
        totalMs += time; 
        numberOfCallsMade += 1;
        var averageProcessingTimeMs = (totalMs/numberOfCallsMade).toFixed(2);
        console.log("equation [" + equation + "] answer [" + str + "] in " + time + "ms, average ms is " + averageProcessingTimeMs + "ms");
        performTask();
      });
    }

    console.log("SENDING (via URL parameters) >>> " + options.path + " unencoded => " + equation );

    //
    // Send the GET request to the consumer.
    //
    http.request(options, callback).end();

}

performTask();


