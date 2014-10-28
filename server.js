var http = require('http'),
    sys = require("sys");


var port = Number(process.env.PORT || 3000);

http.createServer(function(request, response) {

    var url = require("url");

    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;

    var urbanDictionaryResponse = '';
    var urbanComplete = false;
    var wikiComplete = false;
    var wikipediaResponse = '';

    var wiktionaryComplete = false;
    var wiktionaryResponse = '';

    if (!query.word) {
        response.write("<h1>Welcome to The English Language API!</h1>");
        response.write("<p>To look up any word, go to this url with the paramater word= and the word you want.</p>");
        response.write("<p>Set raw to true to return raw data gathered instead of transformed data</p>");
        response.write('<form action="/" autocomplete="on">  Word: <input name="word" autocomplete="on"><br> <input type="submit"></form>');
        response.end();
    }

    if (query.word) {
        var _word = query.word;

        http.get("http://en.wiktionary.org/w/index.php?title="+_word+"&action=raw&format=json", function(_response) {
            _response.on('data', function(chunk) {
                wiktionaryResponse += chunk;
            });

            _response.on('error', function(err) {
                wiktionaryComplete = true;
            })

            _response.on('end', function(error, data, body) {
                wiktionaryComplete = true;
            })
        });

        http.get("http://api.urbandictionary.com/v0/define?term=" + _word, function(urbanResponse) {
            urbanResponse.on('data', function(chunk) {
                urbanDictionaryResponse += chunk;
            });

            urbanResponse.on('error', function(err) {
                urbanComplete = true;
            })

            urbanResponse.on('end', function(error, data, body) {
                urbanComplete = true;
            })
        });

        http.get('http://en.wikipedia.org/wiki/'+_word+'?action=raw', function(wikiResponse) {
            wikiResponse.on('data', function(chunk) {
                wikipediaResponse += chunk;
            });

            wikiResponse.on('error', function(err) {
                wikiComplete = true;
            })

            wikiResponse.on('end', function(data) {
                wikiComplete = true;
            })
        });
    }

    setInterval(function() {
        if (urbanComplete && wikiComplete && wiktionaryComplete) {
            var data = {
                urbanDictionary: JSON.parse(urbanDictionaryResponse),
                wikipedia: wikipediaResponse,
                wiktionairy: wiktionaryResponse,
            };

            response.writeHead(200, {
                'Content-Type': 'text/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type"
            });

            var wikiDefinitions = [];

            var standardResponse = data;
            var orderlyResponse = {
                definitions: JSON.parse(urbanDictionaryResponse).list.map(function(def) {
                    return def.definition;
                }).push(wikipediaResponse),
                synonyms: JSON.parse(urbanDictionaryResponse).tags,
                examples: JSON.parse(urbanDictionaryResponse).list.map(function(entry) {
                    return entry.example
                })
            }

            try {
                if (query.raw) {

                    response.write(JSON.stringify(standardResponse));
                } else {
                    response.write(JSON.stringify(orderlyResponse));
                }
            } catch (e) {
                response.write("Error, Will Robinson...");

            }
            response.end();
        }
    }, 25);

    setTimeout(function() {
        response.end();
    }, 2500);

}).listen(port);
