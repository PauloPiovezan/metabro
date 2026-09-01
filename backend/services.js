//IMPORTS
const fs = require('fs/promises');
const path = require('path');
const db = require('./db');


//FILE PATHS
const userPath = path.join(process.cwd(),'users.json');
const goalPath = path.join(process.cwd(),'goals.json');
const queryPath = path.join(__dirname,"query.sql");



async function handleLogin(req,res){
//Get data from request.
    const user = req.body.user;
    const password = req.body.password;
//ADMIN LOGIN, HARDCODED.
    if (user === 'admin' && password === 'master26'){
            res.status(200).json({type:'admin'});
    }
//USER LOGIN, READ FROM FILE.
    else{
//Read users.json and parse it.
        const userData = await fs.readFile(userPath,'utf8');
        const users =  JSON.parse(userData)

        console.log("Input received:", { user, password });
        console.log("Parsed JSON users:", users);

        const match = users.find( u => u.usr === user && u.pass === password);

            if (match){
                res.status(200).json({type:'user'})
            }
            else{

                res.status(401).json({error : "Usuário ou Senha incorretos!"});

            }
    }
}

async function getSales(req, res){
    const date = req.query.date;
    const queryText = await fs.readFile(queryPath,'utf8');

    const salesData = await db.query(queryText,[date]);
    const sales = salesData.rows[0];
    res.status(200).json({sales})


}

async function getGoal(req,res){

    const date = req.query.date;
    const goalText = await fs.readFile(goalPath,'utf8');
    const goalData = JSON.parse(goalText);
    if(date in goalData){

        res.status(200).json({goal : goalData[date]})

    }
    else { res.status(200).json({goal : 0})}

}
async function setGoal(req,res){

    const date = req.body.date;
    const newGoal = req.body.goal;
    const goalText = await fs.readFile(goalPath,'utf8');
    let goalData = JSON.parse(goalText);
    goalData[date] = newGoal;
    await fs.writeFile(goalPath,JSON.stringify(goalData),'utf8');
    res.status(200).send();


    
}


module.exports = {

    handleLogin,
    getSales,
    getGoal,
    setGoal

}