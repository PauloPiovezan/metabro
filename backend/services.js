//IMPORTS
const fs = require('fs/promises');
const path = require('path');
const db = require('./db');


//FILE PATHS
const userPath = path.join(process.cwd(),'users.json');
const goalPath = path.join(process.cwd(),'goals.json');
const queryPath = path.join(__dirname,"query.sql");



async function handleLogin(req,res){

    const user = req.body.user;
    const password = req.body.password;
//Admin credentials, hardcoded
    if (user === 'admin' && password === 'master26'){
            res.status(200).json({type:'admin'});
    }
//User credentials, read from file
    else{

        try {
            const userData = await fs.readFile(userPath,'utf8');
            const users =  JSON.parse(userData);
            const match = users.find( u => u.usr === user && u.pass === password);

            if (match){
                res.status(200).json({type:'user'})
            }
            else{

                res.status(401).json({error : "Usuário ou Senha incorretos!"});

            }
        }
        catch(error) {
            error.code == 'ENOENT' ? await fs.writeFile(goalPath,'[{"usr" : "vendas","pass" : "2672*"}]','utf8') : console.log("ERROR LOGGING IN: " + error.message);
        } 
    }
}

async function getSales(req, res){

    try{
        const date = req.query.date;
        const queryText = await fs.readFile(queryPath,'utf8');
        const salesData = await db.query(queryText,[date]);
        const sales = salesData.rows[0];
        res.status(200).json({sales})
    }
    catch(error){
//No ENOENT check here since query.sql is bundled with the final app
    console.log("ERROR GETTING SALES: " + error.message);

    }


}

async function getGoal(req,res){

    try {
    const date = req.query.date;
    const goalText = await fs.readFile(goalPath,'utf8');
    const goalData = JSON.parse(goalText);
    if(date in goalData){

        res.status(200).json({goal : goalData[date]})

    }
    else { res.status(200).json({goal : 0})}
    }
    catch(error){
        error.code == 'ENOENT' ? await fs.writeFile(goalPath,"{}",'utf8') : console.log("ERROR READING GOALS:" + error.message)
    }
}
async function setGoal(req,res){

    try {
        const date = req.body.date;
        const newGoal = req.body.goal;
        const goalText = await fs.readFile(goalPath,'utf8');
        let goalData = JSON.parse(goalText);
        goalData[date] = newGoal;
        await fs.writeFile(goalPath,JSON.stringify(goalData),'utf8');
        res.status(200).send();
    }
    catch(error){
        error.code == 'ENOENT' ? await fs.writeFile(goalPath,JSON.stringify(goalData),'utf8') : console.log("ERROR SETTING GOALS:" + error.message)
    }

    
}

//EXPORTS
module.exports = {

    handleLogin,
    getSales,
    getGoal,
    setGoal

}