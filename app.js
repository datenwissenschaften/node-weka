/*
 Copyright (C) 2014 Martin Franke (martin@semiwa.org)

 This file is part of node-weka.

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
 */

var weka = require('./lib/weka-lib.js');
var arff = require('node-arff');
var _ = require('underscore');

//Filter Test
//child = exec('weka weka.filters.unsupervised.attribute.PrincipalComponents -i ./test/test.arff -o ./test/result.arff', function (error, stdout, stderr) {
//  sys.print('stdout: ' + stdout);
//  sys.print('stderr: ' + stderr);
//  if (error !== null) {
//    console.log('exec error: ' + error);
//  }
//});

//Sample classification with SVM
arff.load('./test/training.arff', function (err, data) {

  if (!_.isNull(err)) {
    console.log(err);
    return;
  }

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

});