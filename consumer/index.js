"use strict";

var connect = require('connect')
var http = require('http')

var app = connect()

var Qs = require('qs');

//
// This maps from an operator to a function that calculates a result.
//
var calculator = {
    "+":function(a,b) { return a + b; },
    "-":function(a,b) { return a - b; },
    "*":function(a,b) { return a * b; },
    "/":function(a,b) { return a / b; },
}


//
// Tell connect what to do when someone accesses "http://localhost:3000"
//
app.use("/",function(req, res){

    //
    // Start timing how long it takes to process this request.
    //
    var start = new Date().getTime();

    console.log ("RECEIVED (via URL parameters) <<< " + req.url + " decoded => " + decodeURIComponent(req.url) );

    //
    // Grab the equation. It will be tagged onto the end of the URL like this: http://localhost:3000/?eq=2+3=
    //
    // "input" will look like one of these:
    //     2+3=
    //     2/3=
    //     2*3=
    //     2-3=
    //
    var input = Qs.parse(req.url)['/?eq'];

    //
    // Regex with capturing groups to grab numbers and the operator.
    //
    var myRegexp = /^([0-9]+)([-\+\/*])([0-9]+)=$/;

    //
    // Grab the number + operator + number
    //
    var match = myRegexp.exec(input);
    var a = parseInt(match[1]);
    var operator = match[2];
    var b = parseInt(match[3]);

    //
    // Calculate.
    //
    var result = calculator[operator](a,b);

    var resultString = result.toString();

    console.log ("SENDING >>> " + resultString);
    
    // 
    // Respond.
    //
    res.end(resultString);

    var end = new Date().getTime();
    var time = end - start;
    console.log("processsed equation [" + input + "] in " + time + "ms");

})


http.createServer(app).listen(3000)