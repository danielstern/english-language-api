var http = require('http'),
dictionary = require('./data/dictionary.json'),
sys = require("sys"),
url = require("url");

var port = Number(process.env.PORT || 3000);

http.createServer(function(request,response){
	// sys.puts("I got kicked");

	   //var _get = url.parse(request.url, true).query;
			var url_parts = url.parse(request.url, true);
			var query = url_parts.query;
   // fs.readFile('./data/dictionary.json.txt', 'utf-8', function (error, data) {
      // Write headers.
      response.writeHead(200, {'Content-Type': 'text/plain'});
      // response.write(query.toString())

      if (query.word) {
      	var _word = query.word;
      	var urbanDictionaryUrl = 'http://api.urbandictionary.com/v0/define?term=' + _word;
      	var wikipediaApi = 'http://en.wikipedia.org/w/api.php?format=json&action=query&titles='+_word+'&prop=revisions&rvprop=content'
      	var word = dictionary[query.word] || dictionary[query.word.toUpperCase()] || "???";
      	response.write(word);
      } else {
      	response.write(JSON.stringify(dictionary));
      }
      // Increment the number obtained from file.
      // data = parseInt(data) + 1;
      // var words
      // resoi
      // Write incremented number to file.
      // fs.writeFile('test.txt', data);
      // End response with some nice message.
      // for (var k in dictionary) {
      // 	response.write(k);	
      // 	response.write('\n');
      // }
      // var words = JSON.parse(data);
      
      response.end();
      // response.end(dictionary);
      // response.end('This page was refreshed ' + data + ' times!');
   // });

}).listen(port);