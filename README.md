# Laundry Borcelle – Simple Node.js Web Server

This project implements a basic Node.js web server which operates a multi‑page laundry service website that includes home and about and contact pages through its basic `http` and `fs` and `path` modules. The system was developed as a school project to demonstrate routing capabilities and the ability to serve static content while managing 404 error conditions without utilizing Express framework.

-------------------------------------------------------------------------------
Project Structure
-------------------------------------------------------------------------------

project-root/
├─ server.js
├─ public/
│  ├─ index.html      # Home page (main laundry website)
│  ├─ about.html      # About page
│  ├─ contact.html    # Contact page
│  ├─ 404.html        # Custom 404 error page
│  ├─ style.css       # Shared CSS for all pages
│  ├─ script.js       # Client-side JS for UI behaviour
│  ├─ 1.png           # Image used in pages
│  └─ 2.png           # Image used in pages
└─ README.md

-------------------------------------------------------------------------------
How to Run the Server
-------------------------------------------------------------------------------

1. Install Node.js if it is not already installed on your system.
2. Open a terminal in the project root (where `server.js` is located).
3. Run:

   node server.js

4. Open your browser and visit:

   - http://localhost:3000/home    – Home page
   - http://localhost:3000/about   – About page
   - http://localhost:3000/contact – Contact page
   - Any invalid path, for example http://localhost:3000/random, will show the custom 404 page.
