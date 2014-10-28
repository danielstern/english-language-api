var http = require('http'),
dictionary = require('./data/dictionary.json'),
// fs = require('fs'),
sys = require("sys"),
url = require("url");

var port = Number(process.env.PORT || 3000);

http.createServer(function(request,response){
	sys.puts("I got kicked");
	   //var _get = url.parse(request.url, true).query;
   // fs.readFile('./data/dictionary.json.txt', 'utf-8', function (error, data) {
      // Write headers.
      response.writeHead(200, {'Content-Type': 'text/plain'});
      // Increment the number obtained from file.
      // data = parseInt(data) + 1;
      // var words
      // resoi
      // Write incremented number to file.
      // fs.writeFile('test.txt', data);
      // End response with some nice message.
      for (var k in dictionary) {
      	response.write(k);	
      	response.write('\n');
      }
      // var words = JSON.parse(data);
      
      response.end("OK?");
      // response.end(dictionary);
      // response.end('This page was refreshed ' + data + ' times!');
   // });

}).listen(port);