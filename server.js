require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./db');

const authRoutes = require('./routes/auth');
const registrationRoutes = require('./routes/registrations');
const foodRoutes = require('./routes/food');

if (!process.env.JWT_SECRET) {
  console.error('Missing JWT_SECRET. Copy .env.example to .env and set a secret.');
  process.exit(1);
}

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => res.json({ ok: true, service: 'FoodShare API' }));
app.use('/api/auth', authRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/food', foodRoutes);

// Serve the existing website as-is, now with API connectivity.
app.use(express.static(path.join(__dirname, 'public')));
app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

// Create the configured admin account on first startup.
(async () => {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (!existing) {
      const hash = await bcrypt.hash(password, 12);
      db.prepare('INSERT INTO users (name,email,password_hash,role) VALUES (?,?,?,?)')
        .run('FoodShare Admin', email, hash, 'admin');
      console.log(`Admin account created: ${email}`);
    }
  }

  app.listen(PORT, () => {
    console.log(`FoodShare running at http://localhost:${PORT}`);
  });
})();
