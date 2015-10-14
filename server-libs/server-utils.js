module.exports = {
	log: function log(message, ip, callback){
		callback = callback || function(){};
		console.log(' ');
		console.log('---- ' + message + ' Request ----');
		console.log('Request from IP: ' + ip);
		callback();
		console.log('---- ' + message + ' Request finished ----');
	}
};
