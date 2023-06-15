const stockItemsElement = document.getElementById('stockItems');
const buyStockForm = document.getElementById('buyStockForm');
const sellStockForm = document.getElementById('sellStockForm');
let saldo = 10000.00; // Saldo inicial do usuário
let chartLoaded;
let grafico;

const TipoOperacao = {
  Compra: 0,
  Venda: 1
};

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
    debugger;
    comprarAcao(stockSymbol, stockQuantity);  
    buyStockForm.reset();
}

// Função para vender ações
function sellStock(event) {
    event.preventDefault();
    const sellStockSymbol = document.getElementById;
}

function obterDadosEAtualizarGrafico(acao) {
    $.ajax({
      url: 'http://localhost:3000/dados?acao=' + acao,
      type: 'GET',
      success: function(data) {
        criarGrafico(data); // Chama a função criarGrafico com os dados recebidos
      },
      error: function(xhr, status, error) {
        console.error('Erro na requisição:', error);
      }
    });
  }


  function obterDadosAcoes() {
    $.ajax({
      url: 'http://localhost:3000/acoes',
      type: 'GET',
      success: function(data) {
        var dropdownOptions = $('#dropdownOptions'); // Seleciona o elemento do dropdown
        dropdownOptions.empty();
        data.forEach(function(item) {
          var option = $('<a>').addClass('dropdown-item').attr('href', '#').text(item.name);
          dropdownOptions.append(option);
        });
        $('.dropdown-item').click(function() {
          var selectedOption = $(this).text();
          $('#dropdownMenuButton').text(selectedOption); // Atualiza o texto do botão dropdown
          $('#acao').text(selectedOption); // Atualiza o texto do botão dropdown
          obterDadosEAtualizarGrafico(selectedOption);
        });
      },
      error: function(xhr, status, error) {
        console.error('Erro na requisição:', error);
      }
    });
  }


  function criarGrafico(data) {
    var labels = []; // Array para armazenar os rótulos no eixo x (tempo)
    var valores = []; // Array para armazenar os valores no eixo y (preço)

    // Itera sobre os dados recebidos e preenche os arrays de rótulos e valores
    data.forEach(function(item) {
      labels.push(item.time_minute); // Substitua "tempo" pelo nome da propriedade do objeto JSON que contém o valor do tempo
      valores.push(item.prices); // Substitua "preco" pelo nome da propriedade do objeto JSON que contém o valor do preço
    });

    // Obtém o contexto do canvas
    var ctx = document.getElementById('grafico').getContext('2d');
    
    if(grafico)
      grafico.destroy();

    // Cria o gráfico
    grafico = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Preço',
          data: valores,
          borderColor: 'blue',
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Tempo' // Rótulo do eixo x
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Preço' // Rótulo do eixo y
            }
          }
        }
      }
    });
  }

// Função para comprar uma ação e deduzir o valor do saldo
function comprarAcao(valorAcao, qtdAcoes) {
    valorTotal = valorAcao * qtdAcoes;

    if (saldo >= valorTotal) {
        saldo -= valorTotal; // Deduzir o valor da ação do saldo

        const data = {
          qtdcota: qtdAcoes,
          preco: valorAcao,
          timestamp: new Date().toISOString(),
          tipooffer: TipoOperacao.Compra
        };

        $.ajax({
          url: 'http://localhost:3000/compraVenda',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(data),
          success: function(result) {
            console.log('Valores salvos com sucesso:', result);
            alert(`Ação comprada! Saldo restante: R$ ${saldo.toFixed(2)}`);
            atualizarSaldo();
          },
          error: function(error) {
            console.error('Erro ao salvar valores:', error);
          }
        });

    } else {
        alert("Saldo insuficiente!");
       
    }
}   

function venderAcao(valorAcao, qtdAcoes) {
        valorTotal = valorAcao * qtdAcoes;
        saldo += valorTotal; // Deduzir o valor da ação do saldo

        const data = {
          qtdcota: qtdAcoes,
          preco: valorAcao,
          timestamp: new Date().toISOString(),
          tipooffer: TipoOperacao.Venda
        };

        $.ajax({
          url: 'http://localhost:3000/compraVenda',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(data),
          success: function(result) {
            console.log('Valores salvos com sucesso:', result);
            alert(`Ação vendida! Saldo restante: R$ ${saldo.toFixed(2)}`);
            atualizarSaldo();
          },
          error: function(error) {
            console.error('Erro ao salvar valores:', error);
          }
        });


}   

function atualizarSaldo() {
  $('#saldo').text(`R$${saldo.toFixed(2)}`);
}

atualizarSaldo();
obterDadosAcoes();

