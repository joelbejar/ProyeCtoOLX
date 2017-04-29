
//Core
const express=require('express');
const mongoose=require('mongoose');

//Modules application
	//Config
const database=require('./config/database');

const app=express();

mongoose.connect(database.MONGO_URL_LOCAL);


//Endpoints

app.get('/api/:pagina',(req,res)=>{
	const pagina=req.params.pagina;
	res.status(200).send(pagina);
});

app.listen(3000);
