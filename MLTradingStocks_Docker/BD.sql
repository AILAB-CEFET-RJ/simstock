CREATE DATABASE "MLTradingStocks";

CREATE TABLE MLTradingStocks.tbClient (
  idUser SERIAL PRIMARY KEY,
  login VARCHAR(255),
  hashSenha VARCHAR(255),
  email VARCHAR(255)
);

CREATE TABLE MLTradingStocks.tblCompany (
  idCompany SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE MLTradingStocks.tblOffer (
  idOffer SERIAL PRIMARY KEY,
  idCompany INT,
  qtdCota INT,
  preco VARCHAR(255),
  timeStamp TIMESTAMP,
  tipoOffer SMALLINT,
  FOREIGN KEY (idCompany) REFERENCES tblCompany(idCompany)
);

CREATE TABLE MLTradingStocks.tblOfferHist (
  idHist SERIAL PRIMARY KEY,
  idOffer INT,
  qtdCota INT,
  preco VARCHAR(255),
  timeStamp TIMESTAMP,
  tipoOffer SMALLINT,
  FOREIGN KEY (idOffer) REFERENCES tblOffer(idOffer)
);
