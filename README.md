# node-weka

Proxy for nodejs and Weka Machine Learning

## Prerequisites

* nodejs
* npm
* [weka](http://www.cs.waikato.ac.nz/~ml/weka/downloading.html)

## Install

Adjust the os/weka script to the weka directory and put it in your $PATH variable (resp. /usr/local/bin/weka) 

## Usage

```javascript
var weka = require('./lib/weka-lib.js');

var data = ... //ARFF json format (see [node-arff](https://github.com/chesles/node-arff))

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
  
  console.log(result); //{ predicted: 'yes', prediction: '0.96' }
  
});

```