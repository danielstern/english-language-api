var http = require('http'),
fs = require('fs'),
sys = require("sys"),
url = require("url");

var port = Number(process.env.PORT || 3000);

http.createServer(function(request,response){
	sys.puts("I got kicked");
	   //var _get = url.parse(request.url, true).query;
   fs.readFile('./data/dict.txt', 'utf-8', function (error, data) {
      // Write headers.
      response.writeHead(200, {'Content-Type': 'text/plain'});
      // Increment the number obtained from file.
      // data = parseInt(data) + 1;
      // Write incremented number to file.
      // fs.writeFile('test.txt', data);
      // End response with some nice message.
      response.end(data);
      // response.end('This page was refreshed ' + data + ' times!');
   });

}).listen(port);

// fs.readFile('./data/dict.txt', function (err, html) {
//     if (err) {
//         throw err; 
//     }       
//     // http.createServer(function(request, response) {  
//     //     response.writeHeader(200, {"Content-Type": "text/html"});  
//     //     response.write(html);  
//     //     response.end();  
//     // }).listen(8000);


// 		var server = http.createServer(function(req,res){
// 			res.writeHead(200, {'Content-Type':'text/html'});
// 			res.write(html);
// 			// res.end("Hello world?");



// 			server.listen(port);
// 		})
// });


// var server2 = http.createServer(function(req,res){
// 	res.writeHead(200, {'Content-Type':'text/html'});
// 	res.end("Hello world?");
// })

// server2.listen(666);