const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuração do banco de dados **********************************************
const pool = new Pool({
  user: 'COLOCARUSUARIO',
  host: 'localhost',
  database: 'COLOCAR O BD PARA CONECTAR AO BANCO',
  password: 'COLOCAR A SENHA DO BD',
  port: 5432
});

// Rota para obter os dados do banco de dados ***********************************************
app.get('/dados', (req, res) => {
  // Consulta os dados na tabela desejada
  pool.query('SELECT * FROM COLOCAR O NOME DA TABELA', (err, result) => {
    if (err) {
      console.error('Erro ao consultar dados:', err);
      res.status(500).send('Erro ao consultar dados');
      return;
    }

    res.send(result.rows); // Envia os dados como resposta da requisição
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
