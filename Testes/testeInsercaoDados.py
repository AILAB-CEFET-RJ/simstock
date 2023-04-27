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

# define as 3 linhas de dados a serem inseridas
data = [
     ('2023-04-27 00:00:00', 'GOOGL', '2023-04-27', 50, 2300.25, 9, 0, 0, 2300.25, 50),
    ('2023-04-27 00:00:00', 'GOOGL', '2023-04-27', 75, 2300.50, 9, 1, 0, 2300.35, 125),
    ('2023-04-27 00:00:00', 'GOOGL', '2023-04-27', 100, 2300.75, 9, 2, 0, 2300.50, 200)
]

# define a consulta SQL para inserir os dados
sql = "INSERT INTO stockData (file_date, ticker, day, shares, prices, time_hour, time_minute, time_second, last_10_prices, last_10_shares) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"

# executa a consulta SQL para cada linha de dados
for d in data:
    cur.execute(sql, d)

# confirma as alterações no banco de dados
conn.commit()

# fecha a conexão com o banco de dados
cur.close()
conn.close()
