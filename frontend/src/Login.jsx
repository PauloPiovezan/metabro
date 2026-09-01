import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
export default function Login(){
    const [API,setAPI] = useState(localStorage.getItem('API_URL'));
    localStorage.setItem('API_URL',API);
    let API_URL = localStorage.getItem('API_URL');
    const navigate = useNavigate();
    const [user,setUser] = useState('');
    const [password,setPassword] = useState('');
    const [config,setConfig] = useState(false);

    useEffect(()=>{
        
        if(localStorage.getItem('logged') === 'true'){

            navigate("/vendas")

        }
        
    },[])


    async function handleLogin(){


        const response = await fetch(`${API_URL}/login`,
            {method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user:user, password: password})

        })

        const responseData = await response.json();

        if (response.status == 401){

            console.log(responseData.error);


        }
        else if (responseData.type == 'admin' && response.ok){
            localStorage.setItem('logged','true');
            localStorage.setItem('type','admin');
            navigate("/vendas");

        }
        else if (responseData.type == 'user' && response.ok){
            localStorage.setItem('logged','true');
            localStorage.setItem('type','usr');
            navigate("/vendas");

        }
        else{

            alert("Falha no Login!");


        }
    }



    return(

    <div className="h-screen w-screen flex flex-col justify-center items-center bg-green-200 gap-15">
        <div className=" flex flex-col w-60 outline-2 outline-black p-5 gap-1 bg-white items-center">
            <h6>Usuário</h6>
            <input onChange={(e)=>setUser(e.target.value)} className="bg-white outline-black outline-2"></input>
            <h6>Senha</h6>
            <input type="password" onChange={(e)=>setPassword(e.target.value)} className="bg-white outline-black outline-2"></input>
            <button className="w-30 bg-green-500 mt-5 active:bg-green-800 rounded-2xl p-2" onClick={handleLogin}> Entrar </button>
            <button className="w-30 bg-green-500 rounded-2xl active:bg-green-800 p-2 mt-4" onClick={() => {setConfig(!config)}}>IP</button>
        </div>

        {config ? <div className=" absolute top-5 left-30 flex flex-col bg-white rounded-2xl outline-black items-center p-5 outline-1">
                    <label htmlFor="ip" className="text-gray-400">API</label>
                    <input className="outline-black outline-1 rounded-2xl h-8 p-2" id = "ip" onChange={(e) => {setAPI(e.target.value)}} defaultValue={localStorage.getItem('API_URL')}></input>
                    <button className="bg-green-500 rounded-2xl active:bg-green-800 p-2 mt-4" onClick={() => {localStorage.setItem('API_URL',API); API_URL = localStorage.getItem('API_URL');}} >Definir IP</button>
        
        
                </div> : null}
        

    </div>


    )


}