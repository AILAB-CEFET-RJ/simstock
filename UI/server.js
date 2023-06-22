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
  var sql = `SELECT id, file_date, ticker, day, shares, prices, time_hour, time_minute, time_second, last_10_prices, last_10_shares, is_test
              FROM public.stockdata
              WHERE ticker = '${acao}' AND
                file_date >= current_timestamp - interval '10 minutes' 
                OR id IN (
                  SELECT DISTINCT ON (file_date) id
                  FROM public.stockdata
                WHERE ticker = '${acao}'
                  ORDER BY file_date DESC
                  LIMIT 10
                ) 
              ORDER BY file_date DESC
              LIMIT 50;`
              
  pool.query(sql, (err, result) => {
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

app.get('/historicoCompraVenda', (req, res) => {
  sql = `SELECT idhist, qtdcota, preco, "timestamp", tipooffer, idoffer
          FROM public.tblofferhist
          ORDER BY Timestamp DESC
          LIMIT 15;`;
  // Consulta os dados na tabela desejada
  pool.query(sql, (err, result) => {
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
  var idoffer = req.body.idoffer;
  var timestamp = req.body.timestamp;
  var tipooffer = req.body.tipooffer;

  var query = `INSERT INTO public.tblofferhist(qtdcota, idoffer, preco, "timestamp", tipooffer) VALUES ( ${qtdcota}, '${idoffer}', ${preco}, '${timestamp}', ${tipooffer});`;
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
