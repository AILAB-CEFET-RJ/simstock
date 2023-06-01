const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Configuração do banco de dados **********************************************
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'simstock_database',
  password: 'suasenha',
  port: 5432
});

// Rota para obter os dados do banco de dados ***********************************************
app.get('/dados', (req, res) => {
  // Consulta os dados na tabela desejada
  pool.query("select  * from stockdata where ticker = 'AAPL' and id between 591 and 650", (err, result) => {
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
