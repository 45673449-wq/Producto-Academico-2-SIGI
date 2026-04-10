const express = require('express');
const bcrypt  = require('bcrypt');
const path    = require('path');
const db      = require('./database');

const app  = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ ok: false, mensaje: 'Email y contraseña son obligatorios.' });
  }

  const usuario = db.prepare('SELECT * FROM usuarios WHERE email = ?').get(email.trim().toLowerCase());

  if (!usuario) {
    return res.status(401).json({ ok: false, mensaje: 'Credenciales incorrectas.' });
  }

  const coincide = bcrypt.compareSync(password, usuario.password);
  if (!coincide) {
    return res.status(401).json({ ok: false, mensaje: 'Credenciales incorrectas.' });
  }

  return res.json({
    ok: true,
    usuario: {
      id:     usuario.id,
      nombre: usuario.nombre,
      email:  usuario.email,
      rol:    usuario.rol,
    },
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor SIGI corriendo en http://0.0.0.0:${PORT}`);
});
