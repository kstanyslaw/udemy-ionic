"use strict";

var functions = require('firebase-functions');

var cors = require('cors')({
  origin: true
});

var Busboy = require('busboy');

var os = require('os');

var path = require('path');

var fs = require('fs');

var uuid = require('uuid/v4');

var _require = require('@google-cloud/storage'),
    Storage = _require.Storage;

var storage = new Storage({
  projectId: 'ionic-angular-course-14586'
});
exports.storeImage = functions.https.onRequest(function (req, res) {
  return cors(req, res, function () {
    if (req.method !== 'POST') {
      return res.status(500).json({
        message: 'Not allowed.'
      });
    }

    var busboy = new Busboy({
      headers: req.headers
    });
    var uploadData;
    var oldImagePath;
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
      var filePath = path.join(os.tmpdir(), filename);
      uploadData = {
        filePath: filePath,
        type: mimetype,
        name: filename
      };
      file.pipe(fs.createWriteStream(filePath));
    });
    busboy.on('field', function (fieldname, value) {
      oldImagePath = decodeURIComponent(value);
    });
    busboy.on('finish', function () {
      var id = uuid();
      var imagePath = 'images/' + id + '-' + uploadData.name;

      if (oldImagePath) {
        imagePath = oldImagePath;
      }

      console.log(uploadData.type);
      return storage.bucket('ionic-angular-course-14586.appspot.com').upload(uploadData.filePath, {
        uploadType: 'media',
        destination: imagePath,
        metadata: {
          metadata: {
            contentType: uploadData.type,
            firebaseStorageDownloadTokens: id
          }
        }
      }).then(function () {
        return res.status(201).json({
          imageUrl: 'https://firebasestorage.googleapis.com/v0/b/' + storage.bucket('ionic-angular-course-14586.appspot.com').name + '/o/' + encodeURIComponent(imagePath) + '?alt=media&token=' + id,
          imagePath: imagePath
        });
      })["catch"](function (error) {
        console.log(error);
        return res.status(401).json({
          error: 'Unauthorized!'
        });
      });
    });
    return busboy.end(req.rawBody);
  });
});