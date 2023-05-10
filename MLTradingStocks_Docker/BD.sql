CREATE DATABASE "dados_simstock";

CREATE TABLE stockData (
    id SERIAL PRIMARY KEY,
    file_date TIMESTAMP,
    ticker VARCHAR(10),
    day DATE,
    shares INTEGER,
    prices NUMERIC(10, 2),
    time_hour INTEGER,
    time_minute INTEGER,
    time_second INTEGER,
    last_10_prices NUMERIC(10, 2),
    last_10_shares INTEGER,
    is_test BOOLEAN
);

CREATE TABLE tbClient (
  idUser SERIAL PRIMARY KEY,
  login VARCHAR(255),
  hashSenha VARCHAR(255),
  email VARCHAR(255)
);

CREATE TABLE tblCompany (
  idCompany SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE tblOffer (
  idOffer SERIAL PRIMARY KEY,
  idCompany INT,
  qtdCota INT,
  preco VARCHAR(255),
  timeStamp TIMESTAMP,
  tipoOffer SMALLINT,
  FOREIGN KEY (idCompany) REFERENCES tblCompany(idCompany)
);

CREATE TABLE tblOfferHist (
  idHist SERIAL PRIMARY KEY,
  idOffer INT,
  qtdCota INT,
  preco VARCHAR(255),
  timeStamp TIMESTAMP,
  tipoOffer SMALLINT,
  FOREIGN KEY (idOffer) REFERENCES tblOffer(idOffer)
);