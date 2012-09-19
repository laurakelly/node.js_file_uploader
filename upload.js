var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

// Function to count words in a string
function count_words(file_contents, callback) {
	var words = file_contents.split(/[\s,]+/);
	callback(words.length);
}

// Function that reads in "text.txt" and either prints an error or renders the text of the file and wordcount
exports.read_file = function(req, res, next){
	fs.readFile(__dirname + "/uploads/test.txt", "UTF-8", function(error, file){
		if(error) {
			console.log('error');
		} else {
			var text = file.toString('ascii');
			count_words(text, function(word_count){
		        console.log('about to render');
    			res.render('file', {
    				title: 'File Uploader',
    				contentType: 'text/html',
    				content: text,
    				word_count: word_count
    			});	
			});

		}
	});
}

exports.upload = function(req, res, next){
	if (req.method.toLowerCase() == 'post') {
		// If method is POST, parse the upload form
		console.log('upload function called');

		// Code adapted from Nodebeginner tutorial
		var form = new formidable.IncomingForm();
	 	console.log("about to parse");
	  	form.parse(req, function(error, fields, files) {
	    	console.log("parsing done");

		    /* Possible error on Windows systems:
		       tried to rename to an already existing file */
		    fs.rename(files.upload.path, __dirname + "/uploads/test.txt", function(err) {
		      if (err) {
		        fs.unlink(__dirname + "/uploads/test.txt");
		        fs.rename(files.upload.path, __dirname + "/uploads/test.txt");
		      }
		      else{
		          next();
		      }
	    	});
	  	});

	  	// This function reads the file and renders a view of the file and word count
	  	//read_file(res);
	}
    else{
    	// If the method of the request isn't POST, render the upload form
    	console.log('upload.start function called');
    	res.render('upload.jade', {
    		title: 'File Uploader',
    		contentType: 'text/html'
    	});
    }

};