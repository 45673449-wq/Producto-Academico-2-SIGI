const express = require('express');
const bcrypt  = require('bcrypt');
const path    = require('path');
const db      = require('./database');

// Carga datos de prueba (usuarios y productos) cada vez que inicia
try { require('./seed'); } catch(e) { console.log("Aviso: Seed ya ejecutado"); }

const app  = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- RUTAS DE NAVEGACIÓN (Corrigen el error Cannot GET) ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/gestion', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gestion.html'));
});

app.get('/consultas', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'consultas.html'));
});

// --- API LOGIN ---
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const usuario = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email.trim().toLowerCase());

  if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
    return res.status(401).json({ ok: false, mensaje: 'Credenciales incorrectas.' });
  }
  return res.json({ ok: true, usuario });
});

// --- API PRODUCTOS ---
app.get('/api/productos', (req, res) => {
  const productos = db.prepare('SELECT * FROM productos').all();
  res.json(productos);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor SIGI listo en puerto ${PORT}`);
});
