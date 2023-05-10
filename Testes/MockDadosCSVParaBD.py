import psycopg2
import csv
from datetime import datetime

folder = './csvs/'

files_training = ['consolidado_treinamento (01.12 a 06.12).csv', 'consolidado_treinamento (10.01 a 14.01).csv', \
    'consolidado_treinamento (18.01 a 26.01).csv', 'consolidado_treinamento (21.02 a 11.03).csv', \
    'consolidado_treinamento (23.03 a 28.03).csv', 'consolidado_treinamento (07.04 a 15.04).csv',
    'consolidado_treinamento (18.04 a 29.04).csv', 'consolidado_teste (02.05 a 13.05).csv', \
    'consolidado_treinamento (16.05 a 27.05).csv', 'consolidado_treinamento (04.07 a 15.07).csv', \
    'consolidado_treinamento (16.05 a 27.05).csv', 'consolidado_treinamento (04.07 a 15.07).csv', \
    'consolidado_treinamento (18.07 a 29.07).csv']

files_testing = ['consolidado_treinamento (01.08 a 12.08).csv']


# define a consulta SQL para inserir os dados
sql = "INSERT INTO stockData (file_date, ticker, day, shares, prices, time_hour, time_minute, time_second, last_10_prices, last_10_shares, is_test) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"


# função que realiza o salvamento dos dados dos arquivos no banco
def SalvarDadosCSVNoBD(files_training, is_test):

    # Loop para ler os arquivos CSV e inserir os dados no banco de dados
    for file in files_training:
        with open((folder + file), 'r') as f:
            reader = csv.reader(f)            
            print("Iniciando a leitura do arquivo:",file)
            next(reader)  # pula a primeira linha que contém o cabeçalho

            print("Iniciou conexão com o Banco de Dados")
            # estabelece a conexão com o banco de dados
            conn = psycopg2.connect(
                host="172.19.208.1", # para descobrir o IP do Windows no Ubuntu via WSL2 execute no Ubuntu: cat /etc/resolv.conf | grep nameserver | awk '{print $2}'
                database="dados_simstock",
                user="postgres",
                password="suasenha",
                port='5432'
            )
            
            # cria um cursor para executar comandos SQL
            cur = conn.cursor()

            for row in reader:
                # extrai os valores do CSV
                file_date, ticker, day, shares, prices, time_hour, time_minute, time_second, last_10_prices, last_10_shares = row

                # adiciona os valores na lista de dados
                data = [file_date, ticker, day, shares, prices, time_hour, time_minute, time_second, last_10_prices, last_10_shares, is_test]

                # executa a consulta SQL para cada linha de dados
                cur.execute(sql, data)
            
            # confirma as alterações no banco de dados quando todo o arquivo for processado.
            conn.commit()

            print("Os dados do arquivo", file, "foi salvo no banco com sucesso!")

            # fecha a conexão com o banco de dados
            cur.close()
            conn.close()
            print("Fechou conexão com o Banco de Dados.")

print("Você deseja salvar no banco: \n1 - Um arquivo específico. \n2 - Todos os arquivos")
opt = input()

if opt == "1":
    print("Qual o nome do arquivo completo? (O arquivo deve estar dentro da pasta \".\\csvs\")")
    file_name = input()
    print("É teste? \n 1 = Sim \n 2 = Não")
    is_test = input()
    
    SalvarDadosCSVNoBD([file_name], (is_test == 1))
else:
    SalvarDadosCSVNoBD(files_testing, True)
    SalvarDadosCSVNoBD(files_training,False)


