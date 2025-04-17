const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && url.parse(req.url).pathname === '/register') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const { name, college, username, password } = JSON.parse(body);

            if (existingUsernames.includes(username)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Username already exists!' }));
                return;
            }
            
            // No action is taken for adding the username to the existing list now.
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Successfully Registered!' }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});
