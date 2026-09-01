import DoughnutChart from "./DoughnutChart";

function formatBRL(num){
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(num);
};


export default function ({sales, adminControl}){

    const percent = Number(adminControl.uiGoal) > 0 ? ((Number(sales) / Number(adminControl.uiGoal)) * 100).toFixed(1) : "0.0";

    return (
        <div className=" relative flex flex-col bg-white rounded-2xl outline-black w-100 h-80 items-center pt-5 outline-1">
            <p> Vendas : {formatBRL(sales)} </p>
            <p> Meta: {formatBRL(adminControl.uiGoal)} </p>
            <div className="w-56 h-48 flex items-center justify-center relative ">
                <DoughnutChart goal={adminControl.uiGoal} sales={sales}></DoughnutChart>
            </div>
            <p className="text-2xl">{percent}% da meta atingida!</p>
        </div>)

}