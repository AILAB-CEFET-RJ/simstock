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
    var dataAux;
    
    // Itera sobre os dados recebidos e preenche os arrays de rótulos e valores
    for (let i = (data.length - 1); i > 0; i--) {
      
      const item = data[i];
      const dataHora = moment(item.file_date).locale('pt-br');
      const dataHoraFormatada = dataHora.format('DD/MM/YYYY HH:mm:ss');
      
      if (dataHoraFormatada !== dataAux || i == 1) {
        dataAux = dataHoraFormatada;
        labels.push(dataHoraFormatada);
      }
      else{
        labels.push("");
      }
      
      valores.push(item.prices);
    }

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
        
        idOffer = $("#dropdownMenuButton").text();
        const data = {
          qtdcota: qtdAcoes,
          idoffer: idOffer,
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
            buscarHistoricoDeCompraVenda();
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
        idOffer = $("#dropdownMenuButton").text();

        const data = {
          qtdcota: qtdAcoes,
          preco: valorAcao,
          idoffer: idOffer,
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
            buscarHistoricoDeCompraVenda();
          },
          error: function(error) {
            console.error('Erro ao salvar valores:', error);
          }
        });
}   

function buscarHistoricoDeCompraVenda(){
  $.ajax({
    url: 'http://localhost:3000/historicoCompraVenda',
    type: 'GET',
    success: function(data) {
      preencherTabela(data);
    },
    error: function(xhr, status, error) {
      console.error('Erro na requisição:', error);
    }
  });
}

// Function to fill the table with data
function preencherTabela(dados) {

  const tableBody = $('#historico-table tbody');

  // Clear the current content of the table
  tableBody.empty();

  // Fill the table with the retrieved data
  dados.forEach(item => {
    // Create a new row in the table
    const row = $('<tr>');

    const dataHora = moment(item.timestamp).locale('pt-br');
    const dataHoraFormatada = dataHora.format('DD/MM/YYYY HH:mm:ss');

    // Create the cells and set the content
    const nomeCell = $('<td>').text(item.idoffer);
    const valorCell = $('<td>').text(item.preco);
    const tipoCell = $('<td>').text(item.tipoffer);
    const horaCell = $('<td>').text(dataHoraFormatada);
    const quantidadeCell = $('<td>').text(item.qtdcota);


    if (item.tipooffer === TipoOperacao.Compra) {
      tipoCell.addClass("compra");
    } else {
      tipoCell.addClass("venda");
    }

    // Append the cells to the row
    row.append(nomeCell, valorCell, tipoCell, horaCell, quantidadeCell);

    // Append the row to the table body
    tableBody.append(row);
  });
}

function atualizarSaldo() {
  $('#saldo').text(`R$${saldo.toFixed(2)}`);
}

atualizarSaldo();
obterDadosAcoes();
buscarHistoricoDeCompraVenda();

