// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = [];
var server = http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log('Request for ' + pathname + ' received.');
    if (pathname === '/') {
        fs.readFile('index.html', function(err, data) {
            if (err) {
                console.error(err);
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data.toString());
                res.end();
            }
        });
    } else if (pathname === '/comment') {
        var query = url.parse(req.url, true).query;
        comments.push(query.comment);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('success');
    } else if (pathname === '/getComments') {
        var data = '';
        for (var i = 0; i < comments.length; i++) {
            data += comments[i] + '\n';
        }
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(data);
    } else {
        fs.readFile(pathname.substr(1), function(err, data) {
            if (err) {
                console.error(err);
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data.toString());
                res.end();
            }
        });
    }
});
server.listen(3000, 'localhost', function() {
    console.log('Server running at http://localhost:3000/');
});