import { useEffect, useRef } from "react";





export default function AdminPanel({adminControl, setAdminControl}) {
    const goalRef = useRef(null);
    const API_URL = localStorage.getItem('API_URL');

    async function setGoal(){    
    const API_URL = localStorage.getItem('API_URL');
    const goalResponse = await fetch(`${API_URL}/goals`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({date: adminControl.date, goal: goalRef.current.value})
        })

        if (goalResponse.ok){
            console.log("Nova Meta cadastrada para o mês: " + adminControl.date);
            setAdminControl(prevControl => ({...prevControl, goalFlag : prevControl.goalFlag + 1}))
        }
        else{

            console.log("Erro ao definir meta!");
        }
        console.log("SET NEW GOAL");
    }
    
    
    return(
        <div className="flex flex-col bg-white rounded-2xl outline-black outline-1 w-100 p-4 items-center">
            <label htmlFor = "dateSelect" className="text-gray-400"> Selecione o mês </label>
            <input className="outline-black outline-1 rounded-2xl h-8 p-2" id = "dateSelect" type="month" value={adminControl.date} onChange={ (e) => {setAdminControl({ ...adminControl, date: e.target.value})}}></input>
            <label htmlFor = "metaInput" className="text-gray-400">Meta</label>
            <input ref = {goalRef} className="outline-black outline-1 rounded-2xl h-8 p-2" id = "metaInput"></input>
            <button className="bg-green-500 rounded-2xl active:bg-green-800 p-2 mt-4" onClick={setGoal}> Definir Meta</button>
        </div>)

}