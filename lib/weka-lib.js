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

var sys = require('sys');
var exec = require('child_process').exec;

var child;
var async = require('async');
var _ = require('underscore');

_.str = require('underscore.string');
_.mixin(_.str.exports());
_.str.include('Underscore.string', 'string');

var fs = require('fs');

/** JS Arff format back to weka arff format */
function parseArffFile(arffObj, cb) {

  var arffFile = '';
  arffFile += '@relation ';
  arffFile += arffObj.name;
  arffFile += '\n\n';

  async.waterfall([
    function (callback) {

      var i = 0;

      async.eachSeries(arffObj.data, function (obj, dataCb) {

        async.eachSeries(_.keys(obj), function (key, mapCb) {

          if (arffObj.types[key].type.indexOf('nominal') > -1 && !_.isString(arffObj.data[i][key])) {
            arffObj.data[i][key] = arffObj.types[key].oneof[arffObj.data[i][key]];
          }

          mapCb();

        }, function (err) {
          i++;
          dataCb(err);
        });

      }, function (err) {
        callback(err);
      });

    },
    function (callback) {

      async.eachSeries(arffObj.attributes, function (obj, attrCb) {

        arffFile += '@attribute ';
        arffFile += obj;
        arffFile += ' ';

        if (arffObj.types[obj].type.indexOf('nominal') > -1) {
          arffFile += '{' + arffObj.types[obj].oneof + '}';
        } else {
          arffFile += arffObj.types[obj].type;
        }

        arffFile += '\n';

        attrCb();

      }, function (err) {
        callback(err);
      });

    },
    function (callback) {

      arffFile += '\n';
      arffFile += '@data';
      arffFile += '\n';

      async.eachSeries(arffObj.data, function (obj, dataCb) {

        arffFile += _.values(obj);
        arffFile += '\n';

        dataCb();

      }, function (err) {
        callback(err);
      });
    }
  ], function (err, result) {

    var fileId = '/tmp/node-weka-' + _.random(0, 10000000) + '.arff';

    fs.writeFile(fileId, arffFile, function (err) {
      cb(err, fileId);
    });

  });

}

//TODO:
exports.filter = function (data, input, output) {

//  parseArffFile(input);
//
//  //Filter Test
//  child = exec('weka ' + data.filter + ' ' + data.params + ' -i ./parse.arff -o ./test/result.arff', function (error, stdout, stderr) {
//    sys.print('stdout: ' + stdout);
//    sys.print('stderr: ' + stderr);
//    if (error !== null) {
//      console.log('exec error: ' + error);
//    }
//  });

};

/**
 * Build tranings set and classify the test item.
 * @param data Data in ARFF js format (node-arff)
 * @param test One test item
 * @param options Parameter for the classifier
 * @param cb Callback function
 */
exports.classify = function (data, test, options, cb) {

  var fileIdTraining;

  async.waterfall([
    function (callback) {
      parseArffFile(data, callback);
    },
    function (fileId, callback) {
      fileIdTraining = fileId;

      var testFile = data;
      testFile.name = 'test';
      testFile.data = [];
      testFile.data.push(test);

      parseArffFile(testFile, callback);
    },

    function (fileIdTest, callback) {

      child = exec('weka ' + options.classifier + ' '
          + options.params +
          ' -t ' + fileIdTraining +
          ' -T ' + fileIdTest +
          ' -no-cv -v -p 0'
        , function (error, stdout, stderr) {

          var result = {};

          var splitted = _.clean(stdout.split('\n')[5]).split(' ');

          result.predicted = splitted[2].split(':')[1];
          result.prediction = splitted[splitted.length - 1];

          callback(error, result);

        });
    }
  ], function (err, result) {
    cb(err, result);
  });

};

//TODO:
exports.cluster = function (data) {

};