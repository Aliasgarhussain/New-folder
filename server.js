const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  let filePath;
  
  if (req.url === '/' || req.url === '/home') {
    filePath = 'index.html';
  } else if (req.url === '/about') {
    filePath = 'about.html';
  } else if (req.url === '/contact') {
    filePath = 'contact.html';
  } else if (req.url === '/style.css') {
    filePath = 'style.css';
  } else if (req.url === '/script.js') {
    filePath = 'script.js';
  } else {
    filePath = '404.html';
  }

  const fullPath = path.join(__dirname, 'public', filePath);

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
      return;
    }

    if (filePath.endsWith('.html')) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
    } else if (filePath.endsWith('.css')) {
      res.writeHead(200, { 'Content-Type': 'text/css' });
    } else if (filePath.endsWith('.js')) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
    }

    res.end(data);
  });
});

server.listen(PORT);
