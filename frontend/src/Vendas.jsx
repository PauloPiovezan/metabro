//IMPORTS
import { useEffect } from "react";
import { useState } from "react"
import DoughnutChart from "./DoughnutChart";
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png'
import AdminPanel from "./AdminPanel";
import UserPanel from "./UserPanel";
import SalesPanel from "./SalesPanel";
import Popup from "./Popup";

export default function Vendas(){
//Get Current date, so the view is set to the current month instead of january.
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); 
const currentDate = `${year}-${month}`;



    const loginType = localStorage.getItem('type');
    const navigate = useNavigate();
// There are two "goal" values, goalFlag serves strictly to update the UI whenever a new goal is set, and the UI goal is the value fetched from the API that should be displayed
    const [adminControl,setAdminControl] = useState({ date: currentDate,goalFlag : 0,uiGoal : "0"});
    const [sales,setSales] = useState(0);
    const [popup, setPopup] = useState({show : false, title : "" , message: ""});
    let API_URL = localStorage.getItem('API_URL');
    
    function handleExit(){
        localStorage.setItem('logged','false');
        navigate('/login')
    }

    useEffect(() => {
        const fetchGoal = async () => {
        const goalResponse = await fetch(`${API_URL}/goals?date=${adminControl.date}`);
        const goalData = await goalResponse.json();
        console.log("FETCHED GOAL");
        setAdminControl(prevControl => ({...prevControl, uiGoal: goalData.goal}));
    }
    fetchGoal();
    },[adminControl.goalFlag,adminControl.date])


    
    useEffect(() => {
        const fetchSales = async () => {
            const salesResponse = await fetch(`${API_URL}/sales?date=${adminControl.date}`);
            const salesData = await salesResponse.json();
            const numericTotal = Number(salesData.sales?.total_vendas_liquida || 0);
            setSales(numericTotal);
        }
        fetchSales();
    },[adminControl.date])

    

    return(
        
    <div className="min-h-screen w-screen bg-green-200 flex flex-col items-center gap-1">
        {popup.show ? <Popup title={popup.title} message={popup.message} onClick={()=>{setPopup({ ...popup, show: false})}}/> : null}
        <header>
            <div className="flex flex-col items-center">
                <img src={logo} className="w-60 h-auto object-contain mt-2"/>
            </div>  
        </header>
        
        <SalesPanel sales = {sales} adminControl={adminControl}/>
        
        {loginType == 'admin' ? <AdminPanel adminControl = {adminControl} setAdminControl = {setAdminControl} popup = {popup} setPopup = {setPopup}/>
        : loginType == 'usr' ? <UserPanel adminControl = {adminControl} setAdminControl = {setAdminControl} />
        : navigate('/login')}

        <footer>
            <button className="w-30 bg-green-500 rounded-2xl active:bg-green-800 p-2 mt-4" onClick={handleExit}>Sair</button>
        </footer>
    </div>
    )
}