'use strict';

const express = require('express');
const cors = require('cors');
const multer = require('multer');


// set the path destination
const upload = multer({dest: __dirname + '/uploadedFiles'});

// creation of our express application
var app = express();

// enable cross origin
app.use(cors());

// set the static files
app.use('/public', express.static(process.cwd() + '/public'));

// define index as the first entry point
app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

// collect the file uploaded and return he correspondent json 
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  res.json(
    {
      fileName: req.file.originalname, 
      type: req.file.mimetype, 
      fileSize: req.file.size
  });
});

// listen for requests
let listener = app.listen(process.env.PORT || 3000, function() {
  console.log('The Node.js app is listening on ' + listener.address().port);
});