const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 


// Configuração do banco de dados **********************************************
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dados_simstock',
  password: 'suasenha',
  port: 5432
});

// Rota para obter os dados do banco de dados ***********************************************
app.get('/dados', (req, res) => {
  var acao = req.query.acao;
  // Consulta os dados na tabela desejada
  pool.query("select * from stockdata where ticker = '" + acao + "' ORDER BY id DESC LIMIT 10;", (err, result) => {
    if (err) {
      console.error('Erro ao consultar dados:', err);
      res.status(500).send('Erro ao consultar dados');
      return;
    }

    res.send(result.rows); // Envia os dados como resposta da requisição
  });
});

// Rota para obter os dados do banco de dados ***********************************************
app.get('/acoes', (req, res) => {
  // Consulta os dados na tabela desejada
  pool.query("select  * from tblcompany", (err, result) => {
    if (err) {
      console.error('Erro ao consultar dados:', err);
      res.status(500).send('Erro ao consultar dados');
      return;
    }

    res.send(result.rows); // Envia os dados como resposta da requisição
  });
});

// Rota para obter os dados do banco de dados ***********************************************
app.post('/compraVenda', (req, res) => {
  var qtdcota = req.body.qtdcota;
  var preco = req.body.preco;
  var timestamp = req.body.timestamp;
  var tipooffer = req.body.tipooffer;

  var query = `INSERT INTO public.tblofferhist(qtdcota, preco, "timestamp", tipooffer) VALUES ( ${qtdcota}, ${preco}, '${timestamp}', ${tipooffer});`;
  // Consulta os dados na tabela desejada
  pool.query(query, (err, result) => {
    if (err) {
      console.error('Erro ao consultar dados:', err);
      res.status(500).send('Erro ao consultar dados');
      return;
    }

    res.sendStatus(200);
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
