const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch'); // using node-fetch@2
const app = express();

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Protected route
app.get('/', async (req, res) => {
  try {
    const token = req.cookies.token;

    const authCheck = await fetch('http://localhost:8000/auth-check', {
      method: 'GET',
      headers: {
        Cookie: `token=${token}` // ✅ manually forward token cookie
      }
    });

    if (authCheck.ok) {
      res.sendFile(path.join(__dirname, 'pages/index.html'));
    } else {
      res.redirect('/login');
    }
  } catch (err) {
    console.error("Auth check error:", err);
    res.redirect('/login');
  }
});

// Public pages
app.get('/about', (req, res) => res.sendFile(path.join(__dirname, 'pages/about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'pages/contact.html')));
app.get('/impact', (req, res) => res.sendFile(path.join(__dirname, 'pages/impact.html')));
app.get('/donate', (req, res) => res.sendFile(path.join(__dirname, 'pages/donate.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'pages/login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'pages/register.html')));
app.get('/forgot-password', (req, res) => res.sendFile(path.join(__dirname, 'pages/forgot_password.html')));

// Start server
app.listen(3000, () => console.log('Frontend running on http://localhost:3000'));
