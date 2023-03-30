# Imagem base
FROM ubuntu:latest

# Atualiza o sistema operacional
RUN apt-get update && apt-get upgrade -y

# Instala dependências do projeto
RUN apt-get install -y git python3 python3-pip firefox wget unzip curl

# Instala o gerenciador de pacotes Conda
RUN wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh -O miniconda.sh && \
    bash miniconda.sh -b -p /opt/conda && \
    rm miniconda.sh && \
    /opt/conda/bin/conda clean -ya

# Adiciona Conda ao PATH do sistema
ENV PATH /opt/conda/bin:$PATH

# Clona o repositório do projeto
RUN git clone https://github.com/MLRG-CEFET-RJ/MLTradingStocks.git /app

# Define o diretório de trabalho como o diretório do projeto
WORKDIR /app

# Copia o arquivo "environment.yml" para o diretório do projeto
COPY environment.yml /app/

# Instala as dependências do projeto com Conda
RUN conda env create -f environment.yml

# Inicializa o Conda no bash
RUN conda init bash

# Ativa o ambiente Conda criado
RUN echo "conda activate mltradingstocks" >> ~/.bashrc


# Ativa o ambiente virtual
SHELL ["conda", "run", "-n", "mltradingstocks", "/bin/bash", "-c"]
