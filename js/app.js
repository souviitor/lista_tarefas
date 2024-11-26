// Rota para atualizar uma tarefa
app.put('/api/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const { texto, status, dataConclusao } = req.body;

  db.run('UPDATE tarefas SET texto = ?, status = ?, data_conclusao = ? WHERE id = ?',
    [texto, status, dataConclusao, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Tarefa atualizada com sucesso' });
    });
});
