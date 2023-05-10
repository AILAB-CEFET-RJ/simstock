import psycopg2

# estabelece a conexão com o banco de dados
conn = psycopg2.connect(
    host="172.26.48.1",
    database="dados_simstock",
    user="postgres",
    password="minhasenha",
    port='5432'
)

# cria um cursor para executar comandos SQL
cur = conn.cursor()

# define a consulta SQL para selecionar todos os dados da tabela stockData
sql = "SELECT * FROM stockData"

# executa a consulta SQL
cur.execute(sql)

# exibe os dados na saída padrão
for row in cur:
    print(row)

# fecha o cursor e a conexão com o banco de dados
cur.close()
conn.close()
