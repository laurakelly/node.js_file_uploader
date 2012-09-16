exports.index = function(req, res){
	console.log('index function called');
	res.render('root', {
		title: 'File Uploader',
		contentType: 'text/html'
	});
};