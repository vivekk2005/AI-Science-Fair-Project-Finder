// Simple HTTP server to serve static files
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // If the request is for the root path, serve index.html
    let filePath = req.url === '/' ? 'index.html' : req.url;
    
    // Remove query string and hash
    filePath = filePath.split('?')[0].split('#')[0];
    
    // Get the full path
    filePath = path.join(__dirname, filePath);
    
    // Get the file extension
    const ext = path.extname(filePath);
    
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found
            res.writeHead(404);
            res.end('404 Not Found');
            return;
        }
        
        // Set the Content-Type header based on the file extension
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        
        // Read and serve the file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('500 Internal Server Error');
                return;
            }
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 