// server.js
// Simple Node.js web server using the built‑in http and fs modules

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

function serveFile(res, filePath, contentType, statusCode = 200) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading file:', err.message);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('500 - Internal Server Error');
    }

    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.end(data);
  });
}

// resolve path inside /public
function publicPath(...segments) {
  return path.join(__dirname, 'public', ...segments);
}

// Create HTTP server
const server = http.createServer((req, res) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  const url = req.url;

  // Basic routing
  if (url === '/' || url === '/home') {
    // Home page -> your main Laundry page (index.html)
    serveFile(res, publicPath('index.html'), 'text/html');
  } else if (url === '/about') {
    // About page
    serveFile(res, publicPath('about.html'), 'text/html');
  } else if (url === '/contact') {
    // Contact page
    serveFile(res, publicPath('contact.html'), 'text/html');
  } else if (url.startsWith('/style.css')) {
    // CSS file
    serveFile(res, publicPath('style.css'), 'text/css');
  } else if (url.startsWith('/script.js')) {
    // Client-side JS file
    serveFile(res, publicPath('script.js'), 'text/javascript');
  } else if (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.svg')) {
    // Basic static image handling
    const ext = path.extname(url).toLowerCase();
    const mime =
      ext === '.png' ? 'image/png' :
      ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
      ext === '.svg' ? 'image/svg+xml' : 'application/octet-stream';

    serveFile(res, publicPath(url), mime);
  } else {
    // Any other route -> custom 404 page
    serveFile(res, publicPath('404.html'), 'text/html', 404);
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
