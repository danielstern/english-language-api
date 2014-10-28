english-language-api
====================

This is an API endpoint to query any string and get a sensified version of whatever can be found on the Internet.

Currently uses,
- Wikipedia
- Wiktionary
- Urban Dictionary

Deployment
---------
Run `node server.js` and got to `localhost:3000`

Usage
-----
Access the endpoint with the following GET paramaters,

###`word`
Specifices the word or phrase you wish to get defined.
Example: `https://english-language-api.herokuapp.com/?word=adventure time`

###`raw`
If true, returns the raw data that it has gathered from its various sources, and not the expected format. 
Example: `https://english-language-api.herokuapp.com/?word=adventure time&raw=true`

