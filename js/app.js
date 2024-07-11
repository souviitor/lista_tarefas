// app.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware para processar JSON
app.use(express.json());

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite');
  }
});

// Criar tabela 'tarefas' se não existir
db.run(`CREATE TABLE IF NOT EXISTS tarefas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  texto TEXT NOT NULL,
  status TEXT NOT NULL,
  data_conclusao TEXT
)`);

// Rota para listar todas as tarefas
app.get('/api/tarefas', (req, res) => {
  db.all('SELECT * FROM tarefas', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Rota para criar uma nova tarefa
app.post('/api/tarefas', (req, res) => {
  const { texto, status, dataConclusao } = req.body;

  db.run('INSERT INTO tarefas (texto, status, data_conclusao) VALUES (?, ?, ?)',
    [texto, status, dataConclusao],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`);
});
