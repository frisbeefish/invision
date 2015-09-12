

"use strict";

var http = require('http');



var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
 
var suite = lab.suite;
var test = lab.test;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;
 
suite('speed', function () {
    test('returns true if processing time is below one second', function (done) {

        var options = {
          host: 'localhost',
          port: "3000",
          path: '/'
        };

        var start = new Date().getTime();

        options.path = "/?eq=" + encodeURIComponent("2+3=");

        //
        // This is called once the HTTP GET has returned.
        //
        function callback(response) {
          var str = '';

          response.on('data', function (chunk) {
            str += chunk;
          });

          response.on('end', function () {
            var end = new Date().getTime();
            var time = end - start;
            
            expect(time).to.below(1000);
            done();
          });
        }

        //
        // Send the GET request to the consumer.
        //
        http.request(options, callback).end();
    });
});

suite('math', function () {

    test('returns true if addition works', function (done) {

        var options = {
          host: 'localhost',
          port: "3000",
          path: '/'
        };

        options.path = "/?eq=" + encodeURIComponent("2+3=");

        //
        // This is called once the HTTP GET has returned.
        //
        function callback(response) {
          var str = '';

          response.on('data', function (chunk) {
            str += chunk;
          });

          response.on('end', function () {
            expect(parseInt(str)).to.equal(5);
            done();
          });
        }

        //
        // Send the GET request to the consumer.
        //
        http.request(options, callback).end();
    });

    test('returns true if multiplication works', function (done) {
        var options = {
          host: 'localhost',
          port: "3000",
          path: '/'
        };

        options.path = "/?eq=" + encodeURIComponent("2*3=");

        //
        // This is called once the HTTP GET has returned.
        //
        function callback(response) {
          var str = '';

          response.on('data', function (chunk) {
            str += chunk;
          });

          response.on('end', function () {
            expect(parseInt(str)).to.equal(6);
            done();
          });
        }

        //
        // Send the GET request to the consumer.
        //
        http.request(options, callback).end();
    });

    test('returns true if division works', function (done) {
        var options = {
          host: 'localhost',
          port: "3000",
          path: '/'
        };

        options.path = "/?eq=" + encodeURIComponent("10/5=");

        //
        // This is called once the HTTP GET has returned.
        //
        function callback(response) {
          var str = '';

          response.on('data', function (chunk) {
            str += chunk;
          });

          response.on('end', function () {
            expect(parseInt(str)).to.equal(2);
            done();
          });
        }

        //
        // Send the GET request to the consumer.
        //
        http.request(options, callback).end();
    });

    test('returns true if subtraction works', function (done) {
        var options = {
          host: 'localhost',
          port: "3000",
          path: '/'
        };

        options.path = "/?eq=" + encodeURIComponent("10-5=");

        //
        // This is called once the HTTP GET has returned.
        //
        function callback(response) {
          var str = '';

          response.on('data', function (chunk) {
            str += chunk;
          });

          response.on('end', function () {
            expect(parseInt(str)).to.equal(5);
            done();
          });
        }

        //
        // Send the GET request to the consumer.
        //
        http.request(options, callback).end();
    });

});