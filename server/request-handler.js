

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
var data = {results: [{username: 'han', message: 'hey guys'}]};

var requestHandler = function(request, response) {

  var statusCode = 200;

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/JSON';

  if (request.method === 'GET') {
    if (request.url === '/classes/messages') {
      response.writeHead(200, headers);
      // data = JSON.stringify(data);
      response.end(JSON.stringify(data));
    } else {
      response.writeHead(404, headers);
      console.log('request.url : ', request.url );
      response.end(JSON.stringify(data));
    }
    
  } else if (request.method === 'POST' && request.url === '/classes/messages') {
    response.writeHead(201, headers);

    request.on('data', function(dataItem) {
      data.results.push(JSON.parse(dataItem));
      console.log(data);
    });
    console.log('added data: ', data);
    
    response.end();
  } else if (request.method === 'OPTIONS') {
    response.writeHead(200, headers);
      // data = JSON.stringify(data);
    response.end(JSON.stringify(data));
  }

};
module.exports.requestHandler = requestHandler;