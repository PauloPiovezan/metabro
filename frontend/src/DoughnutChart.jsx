import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

export default function DoughnutChart({ chartGoal, chartSales }) {
  // CORREÇÃO 1: Garante que os valores são números para evitar erros de comparação de string
  const goal = Number(chartGoal) || 0;
  const sales = Number(chartSales) || 0;

  const isOverflow = sales > goal;

  // Inicializa arrays vazios para construir a estrutura dinamicamente
  let labels = [];
  let dataValues = [];
  let bgColors = [];

  if (isOverflow) {
    // Caso de Excesso: Mostra o verde (Meta cheia) e o vermelho (Excesso)
    labels = ["Meta", "Excesso"];
    dataValues = [goal, sales - goal];
    bgColors = ['rgba(34, 197, 94, 1)', 'rgba(239, 68, 68, 1)'];
  } else {
    // Caso Normal: Mostra o que vendeu em verde
    labels = ["Vendido"];
    dataValues = [sales];
    bgColors = ['rgba(34, 197, 94, 1)'];

    // CORREÇÃO 2: Só adiciona a seção cinza na legenda se ainda faltar algo para bater a meta
    const missing = goal - sales;
    if (missing > 0) {
      labels.push("Restante");
      dataValues.push(missing);
      bgColors.push('rgba(156, 163, 175, 1)'); // Cinza
    }
  }

  const chartData = {
    labels: labels,
    datasets: [{
      label: "Vendas",
      data: dataValues,
      backgroundColor: bgColors,
      // Cria dinamicamente as bordas pretas baseadas na quantidade de itens visíveis
      borderColor: Array(dataValues.length).fill('rgba(0,0,0,1)')
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Porcentagem da meta',
      },
    },
  };

  return <Doughnut data={chartData} options={options} />;
}