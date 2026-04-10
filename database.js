const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');
const path = require('path');

const DB_PATH = path.join(__dirname, 'sigi.db');

const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre    TEXT    NOT NULL,
    email     TEXT    NOT NULL UNIQUE,
    password  TEXT    NOT NULL,
    rol       TEXT    NOT NULL DEFAULT 'estudiante',
    creado_en TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

function seedUsuarios() {
  const count = db.prepare('SELECT COUNT(*) as c FROM usuarios').get();
  if (count.c === 0) {
    const insert = db.prepare(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)'
    );
    const usuarios = [
      { nombre: 'Administrador', email: 'admin@sigi.edu.pe',    password: 'admin123',    rol: 'admin'       },
      { nombre: 'Juan Pérez',    email: 'juan@continental.edu.pe', password: 'juan123', rol: 'estudiante'  },
      { nombre: 'María López',   email: 'maria@continental.edu.pe', password: 'maria123', rol: 'docente'   },
    ];
    for (const u of usuarios) {
      const hash = bcrypt.hashSync(u.password, 10);
      insert.run(u.nombre, u.email, hash, u.rol);
    }
    console.log('Usuarios de prueba creados.');
  }
}

seedUsuarios();

module.exports = db;
