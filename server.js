var http = require('http'),
dictionary = require('./data/dictionary.json'),
sys = require("sys");
url = require("url");

var port = Number(process.env.PORT || 3000);

http.createServer(function(request,response){

      var url_parts = url.parse(request.url, true);
	var query = url_parts.query;

      response.writeHead(200, {'Content-Type': 'text/plain'});

      if (query.word) {
      	var _word = query.word;
      	http.get("http://api.urbandictionary.com/v0/define?term=" + _word,function(urbanResponse){
      		// response.write(body);
                  urbanResponse.on('data',function(chunk){
                        response.write(chunk);
                  });

                  urbanResponse.on('error',function(err){
                     response.write(err);   
                  })
      	});
      	// var wikipediaApi = 'http://en.wikipedia.org/w/api.php?format=json&action=query&titles='+_word+'&prop=revisions&rvprop=content'
      	var word = dictionary[query.word] || dictionary[query.word.toUpperCase()] || "";
      	response.write(word);
      } else {
      	response.write(JSON.stringify(dictionary));
      }

      setTimeout(function(){
      response.end();
      },1000);

}).listen(port);