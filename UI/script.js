const stockItemsElement = document.getElementById('stockItems');
const buyStockForm = document.getElementById('buyStockForm');
const sellStockForm = document.getElementById('sellStockForm');
let saldo = 1000.00; // Saldo inicial do usuário
let chartLoaded;

// Função para adicionar uma ação na lista
function addStockItem(symbol, quantity) {
    const li = document.createElement('li');
    li.textContent = `Ação: ${symbol}, Quantidade: ${quantity}`;
    stockItemsElement.appendChild(li);
}

// Função para comprar ações
function buyStock(event) {
    event.preventDefault();
    const stockSymbol = document.getElementById('stockSymbol').value;
    const stockQuantity = document.getElementById('stockQuantity').value;
    addStockItem(stockSymbol, stockQuantity);
    comprarAcao(stockSymbol * stockQuantity);  
    buyStockForm.reset();
}

// Função para vender ações
function sellStock(event) {
    event.preventDefault();
    const sellStockSymbol = document.getElementById;
}

//Função para consumir os dados do BD
function obterDados() {
    $.ajax({
      url: 'http://localhost:3000/dados',
      type: 'GET',
      success: function(data) {
        exibirDados(data); // Chama a função exibirDados para mostrar os dados recebidos
      },
      error: function(xhr, status, error) {
        console.error('Erro na requisição:', error);
      }
    });
  }

  function exibirDados(data) {
    // Limpa o conteúdo atual da div "dados"
    $('#dados').empty();

    // Itera sobre os dados recebidos e os exibe na div "dados"
    data.forEach(function(item) {
      var elemento = $('<p>').text(JSON.stringify(item));
      $('#dados').append(elemento);
    });
  }

  // Chama a função obterDados quando a página é carregada
//   $(document).ready(function() {
//     obterDados();
//   });

function renderStockChart(labels, data) {
    const ctx = document.getElementById('stockChart').getContext('2d');
    const stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Valor da Ação',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Função para obter os dados da API da Alpha Vantage
function getStockData(period) {
    const apiKey = 'sk_33071526cae24d11aa38d8fc0f74f5d0'; // Substitua pela sua chave de API da IEX Cloud
    const symbol = 'AAPL'; // Substitua pelo símbolo da ação desejada
    const baseUrl = 'https://cloud.iexapis.com/v1';
    const endpoint = `/stock/${symbol}/chart/${period}?token=${apiKey}`;
    const url = `${baseUrl}${endpoint}`;
    
    // Realize uma requisição AJAX para obter os dados da API
    // Exemplo usando o fetch:
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Processar os dados e extrair os valores das ações para o período desejado
            const labels = data.map(item => item.date); // Obter as datas para o período desejado
            const stockValues = data.map(item => item.close); // Obter os valores de fechamento das ações
            renderStockChart(labels.reverse(), stockValues.reverse()); // Renderizar o gráfico com os dados
        })
        .catch(error => console.error(error));
}

function handleSearchFormSubmit(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
    
    // Obter o valor digitado na barra de busca
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value;
    
    // Realizar a ação de busca com o valor digitado (por exemplo, buscar as ações correspondentes)
    // Aqui você pode implementar a lógica de busca de acordo com o seu sistema
    
    // Limpar o valor da barra de busca após o envio
    searchInput.value = '';
}

// Adicionar o evento de envio do formulário de busca ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', handleSearchFormSubmit);
});

// Função para comprar uma ação e deduzir o valor do saldo
function comprarAcao(valorAcao) {
    if (saldo >= valorAcao) {
        saldo -= valorAcao; // Deduzir o valor da ação do saldo
        alert(`Ação comprada! Saldo restante: R$ ${saldo.toFixed(2)}`);
        // Aqui você pode implementar a lógica de compra da ação, como atualizar o saldo do usuário no banco de dados, etc.
    } else {
        alert("Saldo insuficiente!");
        // Aqui você pode implementar a lógica de tratamento para saldo insuficiente, como exibir uma mensagem de erro, etc.
    }
}   

function venderAcao(valorAcao) {
        saldo += valorAcao; // Deduzir o valor da ação do saldo
        alert(`Ação vendida! Saldo restante: R$ ${saldo.toFixed(2)}`);
        // Aqui você pode implementar a lógica de compra da ação, como atualizar o saldo do usuário no banco de dados, etc.
    // } else {
    //     alert("Quantidade insuficiente!");
    //     // Aqui você pode implementar a lógica de tratamento para saldo insuficiente, como exibir uma mensagem de erro, etc.
    // }
}   

getStockData();



// Chamada da função para obter os dados do período desejado (1 dia, 1 semana ou 1 ano
