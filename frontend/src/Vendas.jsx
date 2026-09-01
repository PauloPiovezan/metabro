import { useEffect } from "react";
import { useState } from "react"
import DoughnutChart from "./DoughnutChart";
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png'
import AdminPanel from "./AdminPanel";
export default function Vendas(){

    
    const navigate = useNavigate();
    const [date,setDate] = useState('2026-01');
    const [goal,setGoal] = useState(0);
    const [newGoal,setNewGoal] = useState(0);
    const [sales,setSales] = useState(0);
    const [goalControl,setGoalControl] = useState(0);
    let API_URL = localStorage.getItem('API_URL');
    const numericSales = Number(sales);
    const numericGoal = Number(goal);
    const percent = numericGoal > 0 ? ((numericSales / numericGoal) * 100).toFixed(1) : "0.0";
    
    async function _setNewGoal(){


    const goalResponse = await fetch(`${API_URL}/goals`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({date: date, goal: newGoal})
        })

        if (goalResponse.ok){
            alert("Nova Meta cadastrada para o mês: " + date);
        }
        else{

            alert("Erro ao definir meta!");

        }

        setGoalControl(goalControl + 1);
    }

    function handleExit(){

        localStorage.setItem('logged','false');
        navigate('/login')

    }


    useEffect(() => {
        const fetchSales = async () => {
        const salesResponse = await fetch(`${API_URL}/sales?date=${date}`);
        const salesData = await salesResponse.json();
        const numericTotal = Number(salesData.sales?.total_vendas_liquida || 0);
        setSales(numericTotal);
    }
        
    fetchSales();

    },[date])

    useEffect(() => {
        const fetchGoal = async () => {
        const goalResponse = await fetch(`${API_URL}/goals?date=${date}`);
        const goalData = await goalResponse.json();
        console.log(goalData.goal);
        setGoal(goalData.goal);
    }
        
    fetchGoal();

    },[date,goalControl])

    


    const formatBRL = (num) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(num);
  };

    if (localStorage.getItem('type') === 'admin'){

        return(
    <div className="min-h-screen w-full bg-green-200 flex flex-col items-center gap-1">
        <header>
            <div className="flex flex-col items-center">
                
                <img src={logo} className="w-60 h-auto object-contain mt-2"/>
            </div>
            
        </header>
        
        <div className=" relative flex flex-col bg-white rounded-2xl outline-black w-100 h-80 items-center pt-5 outline-1">
            <p> Vendas : {formatBRL(sales)} </p>
            <p> Meta: {formatBRL(goal)} </p>
            <div className="w-50 h-50">
                <DoughnutChart chartGoal={goal} chartSales={sales}></DoughnutChart>
            </div>
                <p className="text-2xl">{percent}% da meta atingida!</p>
            
        </div>
        <div className="flex flex-col bg-white rounded-2xl outline-black outline-1 w-100 p-4 items-center">
                <label htmlFor = "dateSelect" className="text-gray-400"> Selecione o mês </label>
                <input className="outline-black outline-1 rounded-2xl h-8 p-2" id = "dateSelect" type="month" value={date} onChange={ (e) => {setDate(e.target.value)
                }}></input>
                <label htmlFor = "metaInput" className="text-gray-400">Meta</label>
                <input className="outline-black outline-1 rounded-2xl h-8 p-2" id = "metaInput" onChange={(e) => {setNewGoal(e.target.value)}}></input>
                <button className="bg-green-500 rounded-2xl active:bg-green-800 p-2 mt-4" onClick={() => {_setNewGoal()}}> Definir Meta</button>
            </div>
        <footer>

            <button className="w-30 bg-green-500 rounded-2xl active:bg-green-800 p-2 mt-4" onClick={handleExit}>Sair</button>

        </footer>
    </div>
    )

    }

    else if (localStorage.getItem('type') === 'usr'){

        return(
    <div className="min-h-screen w-full bg-green-200 flex flex-col items-center gap-1">
        <header>
            <div className="flex flex-col items-center">
                
                <img src={logo} className="w-60 h-auto object-contain mt-2"/>
            </div>
        

        </header>
        <div className="flex flex-col bg-white rounded-2xl outline-black w-100 h-80 items-center pt-5 outline-1">
            <p> Vendas : {formatBRL(sales)} </p>
            <p> Meta: {formatBRL(goal)} </p>
            <div className="w-50 h-50">
                <DoughnutChart chartGoal={goal} chartSales={sales}></DoughnutChart>
            </div>
            <p className="text-2xl">{percent}% da meta atingida!</p>
        </div>


        <div className="flex flex-col bg-white rounded-2xl outline-black outline-1 w-100 p-4 items-center">
            <label htmlFor = "dateSelect" className="text-gray-400"> Selecione o mês </label>
            <input className="outline-black outline-1 rounded-2xl h-8 p-2" id = "dateSelect" type="month" value={date} onChange={ (e) => {
                setDate(e.target.value)
            }}></input>
        </div>
        <footer>

            <button className="w-30 bg-green-500 rounded-2xl active:bg-green-800 p-2 mt-4" onClick={handleExit}>Sair</button>
        </footer>
    </div>
    )

    }
    else{

        navigate('/login');

    }
    



}