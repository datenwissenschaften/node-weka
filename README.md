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
  play       : 'no' // last is class attribute
};

weka.classify(data, testData, options, function (err, result) {
  
  console.log(result); //{ predicted: 'yes', prediction: '0.96' }
  
});

```

## License

Copyright (C) 2014 Martin Franke (martin@semiwa.org)

node-weka is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

node-weka is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with node-weka.  If not, see <http://www.gnu.org/licenses/>.