import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

export default function DoughnutChart({ goal, sales }) {

const overflow = sales > goal;

const chartData = {

    labels: overflow ? ["Meta", "Excesso"] : ["Vendas","Restante"],

    datasets : [{

    

    data : overflow ? [goal, sales - goal] : [sales, goal - sales],

    backgroundColor : overflow ? ["rgba(34, 197, 94, 1)","rgba(239, 68, 68, 1)"] : ["rgba(34, 197, 94, 1)","rgba(209, 213, 219, 1)"],

    borderColor : overflow ? ["rgba(34, 197, 94, 1)","rgba(239, 68, 68, 1)"] : ["rgba(34, 197, 94, 1)","rgba(209, 213, 219, 1)"],

    borderWidth : 1
    }]
}





const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom'
        },
        title: {
            display: true,
            text: 'Porcentagem da meta',
        },
    },
    cutout: '50%',

}; 

return <Doughnut data={chartData} options={options} />;
}