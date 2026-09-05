export default function Popup({title,message,onClick}){


    return(
        <div className="fixed inset-0 z-50 w-screen h-screen bg-black/65 flex justify-center items-center">
            <div className="bg-white outline-2 outline-black w-96 h-64 flex flex-col gap-5 absolute items-center justify-center">
                <h1 className="w-full text-center text-2xl">{title}</h1>
                <p className="w-full text-center" >{message}</p>
                <button className="bg-red-500 w-25 h-8 p-1 rounded-2xl mt-25" onClick={onClick}>OK</button>
            </div>
        </div>
    )


}