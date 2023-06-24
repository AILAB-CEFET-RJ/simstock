# Passos descontinuados, pois não funcinaram corretamente.

## Como subir todos os containers necessários:

Para subir os containers:
- Do banco de dados PostgreSQL.
- Do PgAdmin para acessar o banco de dados de forma mais simples.
- Do projeto MLTradingStocks.

basta executar o docker-compose com o comando abaixo. Ele irá configurar todo o ambiente já conectando estes containers via Rede.
```docker
docker-compose up
```

Os passos abaixos não serão necessário, pois o docker-compose se encarregará de todo o processo de construção dos containers. Entretanto no texto abaixo trás mais informações sobre cada um dos containers.

## Como executar o projeto [MLTradingStocks](https://github.com/MLRG-CEFET-RJ/MLTradingStocks) via Docker


#### 1. Após isso será necessário realizar o build do Dockerfile presente na pasta ``MLTradingStocks_Docker`` executando o seguinte comando no terminal: 
   
``` docker
docker build -t mltradingstocks:latest '.\MLTradingStocks_Docker\' 
```

#### 2. Para acessar o ambiente o ambiente Conda criado, basta executar o comando:
```docker 
docker run -it --rm mltradingstocks:latest
```

e em seguida será possível utilizar as funcionalidades conforme descrito na [biblioteca](https://github.com/MLRG-CEFET-RJ/MLTradingStocks#como-rodar-o-algoritmo-de-coleta-de-dados) do projeto MLTradingStocks.
