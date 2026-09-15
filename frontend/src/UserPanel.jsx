


export default function UserPanel({adminControl, setAdminControl,update}){
    return(
    <div className="flex flex-col bg-white rounded-2xl outline-black outline-1 w-100 p-4 items-center">
            <label htmlFor = "dateSelect" className="text-gray-400"> Selecione o mês </label>
            <input className="outline-black outline-1 rounded-2xl h-8 p-2" id = "dateSelect" type="month" value={adminControl.date} onChange={ (e) => {setAdminControl({...adminControl, date:e.target.value})}}></input>
            <button className="bg-green-500 rounded-2xl active:bg-green-800 p-2 mt-4" onClick={update}>Atualizar</button>
    </div>)
}