var http = require('http'),
    dictionary = require('./data/dictionary.json'),
    sys = require("sys");
  
    wiky = require("wiky.js")



var port = Number(process.env.PORT || 3000);

http.createServer(function(request, response) {

    var   url = require("url");

    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;

    var urbanDictionaryResponse = '';
    var urbanComplete = false;
    var wikiComplete = false;
    var wikipediaResponse = '';
    var localResponse = '';

    if (!query.word) {
        response.write("<h1>Welcome to The English Language API!</h1>");
        response.write("<p>To look up any word, go to this url with the paramater word= and the word you want.</p>");
        response.write('<form action="/" autocomplete="on">  Word: <input name="word" autocomplete="on"><br> <input type="submit"></form>');
        // response.write()
        response.end();

    }




    if (query.word) {
        var _word = query.word;
        http.get("http://api.urbandictionary.com/v0/define?term=" + _word, function(urbanResponse) {
            // response.write(body);
            urbanResponse.on('data', function(chunk) {
                urbanDictionaryResponse += chunk;

                // response.write(chunk);
            });

            urbanResponse.on('error', function(err) {
                urbanComplete = true;
                // response.write(err);
            })

            urbanResponse.on('end', function(error, data, body) {
                urbanComplete = true;
                // response.write(body);

            })
        });

        http.get('http://en.wikipedia.org/w/api.php?format=json&action=query&titles=' + _word + '&prop=revisions&rvprop=content&contentModel=html', function(wikiResponse) {
            // response.write(body);
            wikiResponse.on('data', function(chunk) {
                wikipediaResponse += chunk;

                // response.write(chunk);
            });

            wikiResponse.on('error', function(err) {
                wikiComplete = true;
                // response.write(err);
            })

            wikiResponse.on('end', function(data) {
                wikiComplete = true;
                // wikipediaResponse = data;
            })
        });
        // var 
        var word = dictionary[_word] || dictionary[_word.toUpperCase()] || "";
        if (word) {
            // localResponse = JSON.stringify({
            //       definition:word
            // });
            localResponse = word;
            // response.write(word);
        }
    }

    setInterval(function() {
        if (urbanComplete && wikiComplete) {
            var data = {
                urbanDictionary: JSON.parse(urbanDictionaryResponse),
                wikipedia: JSON.parse(wikipediaResponse),
                local: localResponse
            };

            response.writeHead(200, {
                'Content-Type': 'text/json'
            });

            var wikiDefinitions = [];

            var wikiPages =  JSON.parse(wikipediaResponse).query.pages;
            for (var key in wikiPages) {
                  var content = wikiPages[key].revisions[0]['*'];
                  // wikiDefinitions.push(content);
                  wikiDefinitions.push(wiky.process(content,{}));
            }

            var standardResponse = data;
            var orderlyResponse = {
                definitions: JSON.parse(urbanDictionaryResponse).list.map(function(def) {
                        return def.definition;
                    }).concat(wikiDefinitions)
                    // }).concat(JSON.parse(wikipediaResponse))
            }



            response.write(JSON.stringify(orderlyResponse));
            response.end();
        }
    }, 25);

    setTimeout(function() {
        response.end();
    }, 5000);

}).listen(port);
