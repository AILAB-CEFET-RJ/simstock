# simstock

A simulation system of stock market built for educational purposes.


# Requisitos mínimos:

1. Para que seja possível exercutar tudo que possui nesta documentação é necessário ter instalado em seu sistema operacional o [Docker](https://docs.docker.com/desktop/install/windows-install/).

2. Todos os códigos disponibilizado nesta documentação foi executado no [PowerShell 7](https://learn.microsoft.com/pt-br/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.3) e no Sistema Operacional Windows, a execução em outros terminais de comando podem necessitar de alterações.

3. Crie o seguinte diretório em seu computador:
    - Crie um diretório chamado `"postgresql_data"` em `C:\docker` -> `C:\docker\postgresql_data`. Será necessário para armazenar os dados do Banco de Dados PostgreSQL.

# Como subir todos os containers necessários:

Para subir os containers:
- Do banco de dados PostgreSQL.
- Do PgAdmin para acessar o banco de dados de forma mais simples.
- Do projeto MLTradingStocks.

basta executar o docker-compose com o comando abaixo. Ele irá configurar todo o ambiente já conectando estes containers via Rede.
```docker
docker-compose up
```

Os passos abaixos não serão necessário, pois o docker-compose se encarregará de todo o processo de construção dos containers. Entretanto no texto abaixo trás mais informações sobre cada um dos containers.

# Como executar o projeto [MLTradingStocks](https://github.com/MLRG-CEFET-RJ/MLTradingStocks) via Docker


### 1. Após isso será necessário realizar o build do Dockerfile presente na pasta ``MLTradingStocks_Docker`` executando o seguinte comando no terminal: 
   
``` docker
docker build -t mltradingstocks:latest '.\MLTradingStocks_Docker\' 
```

### 2. Para acessar o ambiente o ambiente Conda criado, basta executar o comando:
```docker 
docker run -it --rm mltradingstocks:latest
```

e em seguida será possível utilizar as funcionalidades conforme descrito na [biblioteca](https://github.com/MLRG-CEFET-RJ/MLTradingStocks#como-rodar-o-algoritmo-de-coleta-de-dados) do projeto MLTradingStocks.


# Como executar o PostgreSQL via Docker.

### 1. Crie um diretório em seu computador para armazenar os dados do banco de dados Postgres. Por exemplo, crie um diretório chamado `"postgresql_data"` em `C:\docker`.

### 2. Em seguida execute o seguinte comando para baixar e iniciar um container Postgres:

```docker
docker network create simstock

docker run -d -p 5432:5432 --network simstock -v C:\docker\postgresql_data:/var/lib/postgresql --name meu-postgresql -e POSTGRES_PASSWORD=suasenha postgres
```

Este comando irá:

- Iniciar um novo container Postgres a partir da imagem oficial do PostgreSQL.

- Atribuir um nome para o container (meu-postgresql).

- Mapear a porta `5432` do container para a porta `5432` do host.

- Definir a senha do usuário root do Postgres para "suasenha".

- Montar o diretório `C:\docker\postgresql_data` do host para o diretório `/var/lib/postgresql` postgres do container.

- Isso permitirá que o container acesse e armazene os dados do banco de dados postgres no diretório `C:\docker\postgresql_data` do host.


### 3. Verifique se o container está em execução com o comando:
```docker
docker ps
```

### 4. Como consultar o PostgreSQL pelo PgAdmin:

Para instalar e rodar o pgadin pelo docker execute o código abaixo:

```docker
docker run -p 5050:80 --name meu-pgadmin --network simstock -e PGADMIN_DEFAULT_EMAIL=user@domain.com -e PGADMIN_DEFAULT_PASSWORD=SuperSecret -d dpage/pgadmin4
```

1. Abra o PgAdmin em seu navegador em http://localhost:5050/.
2. Faça login usando o endereço de e-mail e a senha padrão que você definiu ao iniciar o container do PgAdmin.
3. Na barra lateral, selecione "Add New Server" (Adicionar novo servidor).
4. Na janela "Create - Server", preencha as seguintes informações:
    - Name (Nome): um nome para o servidor que você está adicionando.
    - Host name/address (Nome do host/endereço): o nome ou o endereço IP do container PostgreSQL em que o banco de dados está sendo executado.  Neste exemplo, é "meu-postgresql".
    - Port (Porta): 5432.
    - Username (Nome de usuário): o nome de usuário que você definiu ao iniciar o container do PostgreSQL. Por padrão, é "postgres".
    - Password (Senha): a senha que você definiu ao iniciar o container do PostgreSQL. Neste exemplo, é "suasenha".
5. Clique em "Save" (Salvar) para salvar a nova conexão com o servidor.


### 5. Quando quiser desligar os containers, execute os comandos:

```docker
docker stop meu-postgresql

docker stop meu-pgadmin
```

### 6. Verificar ip do Windows dentro do Ubuntu WSL:
```bash
cat /etc/resolv.conf | grep nameserver | awk '{print $2}'
```

### UI
É necessário executar o comando npm i chart.js para instalação da dependência

### Backend
É necessário executar o comando npm i express para instalação da dependência
É necessário executar o comando npm i pg para instalação da dependência
Para executar o Backend: va até a pasta UI e execute - node server.js

Isso irá parar o container sem removê-lo. Os dados do banco de dados PostgreSQL serão mantidos no diretório C:\docker\postgresql_data e estarão disponíveis novamente quando o container for iniciado novamente com o comando docker start.
