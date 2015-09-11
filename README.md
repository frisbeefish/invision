# invision

The assignment is to build a simple Producer/Consumer system. In this system the Generator will send a series of random arithmetic expressions, while the Evaluator will accept these expressions, compute the result and then report the solution to the Generator. 

At a minimum, we would like to see the following implemented:

* The Producer and Consumer as separate NodeJS services.
* The Producer generating random addition expressions of two positive integers, e.g. "2+3="
* The Consumer computing and returning the correct mathematical result for the each expression it receives
* The Consumer successfully processing requests from two Producers concurrently at a rate of at least 1 req/sec from each Producer (2 req/sec in aggregate)
* The Consumer and Producer should log all messages they generate and receive.

*NOTE:* This implementation of the challenge supports these operators (not only "+"): +, -, /, *

### Installing and Running the consumer 

(Run this first. It will listen on port 3000)

```
cd consumer
npm install
node index.js

(Ctrl-C to terminate)
```

### Installing and Running the producer(s) 

(Only run these once you've got the consumer running.)

*NOTE:* You can open a number of terminals and run a number of instances of the producer. All of them will send requests to the single consumer app that is running and listening on port 3000.

```
cd producer
npm install
node index.js

(Ctrl-C to terminate)
```


## UML Sequence Diagram 

![](sequence.png?raw=true)

## UML "Consumer" Activity Diagram 

![](consumer.png?raw=true)

## UML "Producer" Activity Diagram 

![](producer.png?raw=true)

