// Structure of modules based on structure of this express example:
// https://github.com/visionmedia/express/blob/master/examples/route-separation

/**
* Module dependencies
*/

var express = require('express'),
    app = express(),
    site = require('./site'),
    upload = require('./upload'),
    file = require('./file')

// Config -- some code taken from Node Tuts tutorial #9

app.configure(function () {
    // app.use(express.logger());
    // If there is an error the stack will show up in the browser
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout:false});

// '/uploads' is where uploaded files are stored
app.use(express.static(__dirname + '/uploads'));

// Home

app.get('/', site.index);

// Upload

app.all('/upload', upload.upload, upload.read_file);

// File

app.get('/files', file.list);
app.get('/files/:id', file.view);

app.listen(5000);
console.log('File Uploader started on port 5000');
