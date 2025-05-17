const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch'); // use node-fetch@2
require('dotenv').config(); // ✅ Load .env variables

const app = express();
const BACKEND_URL = process.env.BACKEND_URL;

if (!BACKEND_URL) {
  console.error("❌ BACKEND_URL is not defined in .env");
  process.exit(1);
}

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Serve config.js to frontend
app.get('/config.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.send(`window.BACKEND_URL = '${BACKEND_URL}';`);
});

// Protected route
app.get('/', async (req, res) => {
  try {
    const token = req.cookies.token;

    const authCheck = await fetch(`${BACKEND_URL}/auth-check`, {
      method: 'GET',
      headers: {
        Cookie: `token=${token}`
      }
    });

    if (authCheck.ok) {
      res.sendFile(path.join(__dirname, 'pages/index.html'));
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    console.error("Auth check error:", err.message);
    res.redirect('/login');
  }
});

// Public routes
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'pages/about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'pages/contact.html')));
app.get('/impact', (req, res) => res.sendFile(path.join(__dirname, 'pages/impact.html')));
app.get('/donate', (req, res) => res.sendFile(path.join(__dirname, 'pages/donate.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'pages/login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'pages/register.html')));
app.get('/forgot-password', (req, res) => res.sendFile(path.join(__dirname, 'pages/forgot_password.html')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Frontend running on http://localhost:${PORT}`));
