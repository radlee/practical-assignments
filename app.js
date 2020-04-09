const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if( url === '/' ) {
        res.write('<html>');
        res.write('<head><title>Assignment 1</title></head>');
        res.write('<body><form action="/users" method="POST"><input name="username" type="text"><button type="submit">send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/users' && method == 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        return req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const user = parseBody.split('=')[1];
            fs.writeFile('users.txt', user, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end()
            })
        })
    }

    
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Assignment 1 Test</title></head>');
    res.write('<body><h1>Hello dummy Text 2<h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000)