# node-weka

Proxy for nodejs and Weka Machine Learning

## Prerequisites

* nodejs
* npm

## Install

* Put the os/weka script in your $PATH

## Usage

```javascript
var weka = require('./lib/weka-lib.js');

//See Weka Documentation
var options = {
  //'classifier': 'weka.classifiers.bayes.NaiveBayes',
  'classifier': 'weka.classifiers.functions.SMO',
  'params'    : ''
};

var testData = {
  outlook    : 'sunny',
  windy      : 'TRUE',
  temperature: 30,
  humidity   : 2,
  play       : 'no'
};

weka.classify(data, testData, options, function (err, result) {
  console.log(result);
});

```