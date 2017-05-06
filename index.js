
//Core
const express=require('express');//libreria para construi api
const mongoose=require('mongoose');//libreria del dirve conectar con mongodb

//Modules application
	//Config
const database=require('./config/database');//

const app=express();//

mongoose.connect(database.MONGO_URL_LOCAL);//conexion con mongodb


//Endpoints

app.get('/api/:pagina',(req,res)=>{
	const pagina=req.params.pagina;// req=,params=
	res.status(200).send(pagina);//res=, status=
});

app.listen(3000);
