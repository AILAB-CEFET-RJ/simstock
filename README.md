# simstock

A simulation system of stock market built for educational purposes.

## Como executar o projeto [MLTradingStocks](https://github.com/MLRG-CEFET-RJ/MLTradingStocks) via Docker

1. Primeiramente é necessário possuir o Docker instalado no seu sistema operacional.
2. Após isso será necessário realizar o build do Dockerfile presente na pasta ``MLTradingStocks Docker`` executando o seguinte comando no terminal: 
   
``` bash
docker build -t mltradingstocks:latest '.\MLTradingStocks Docker\' 
```

3. Para acessar o ambiente o ambiente Conda criado, basta executar o comando:
```bash 
docker run -it --rm mltradingstocks:latest
```

e em seguida será possível utilizar as funcionalidades conforme descrito na [biblioteca](https://github.com/MLRG-CEFET-RJ/MLTradingStocks#como-rodar-o-algoritmo-de-coleta-de-dados) do projeto MLTradingStocks.