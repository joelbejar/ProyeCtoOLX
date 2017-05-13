const mongoose=require('mongoose');//
const express=require('express');//
const app=express();//factoia es una funcion  , app maneja toda la aoplicacion
const route=express.Router();//metodo de la clase Router , router se puede concatenar las metodos
const route2=express.Router();//
const bodyParser=require('body-parser');
const methodOverride=require('method-override');
const path = require('path');


mongoose.connect('localhost:27017/test2');
const Schema=mongoose.Schema;
const userSchema=new Schema({//extiende la libreria de Mongo(Schema)
	userName:{type:String},
	password:{type:String},
	producto:[{type:Schema.Types.ObjectId,ref:"producto"}]// ref llaves foraneas
});
const productoSchema=new Schema({
	name:String,
	description:String
});

const User=mongoose.model('user',userSchema);
const Producto=mongoose.model('producto',productoSchema);

app.use(methodOverride());//use : implementar funciones que se ejecuta antes de  llegar a nuestra api , methodOverride :intersecta el put y delete
app.use(bodyParser.urlencoded({extended:true}));//el servidor debe ssaber que estoy llevando json , urlencoded (signo de interrogacion , comas ,etc)
app.use(bodyParser.json());

route.route('/user')
.get((req,res)=>{//req :consulta de los clientes ,res :servior va a enviar al usuario
	console.log("User get",req.query);
	if(req.query){
		console.log(req.query);
		User.find(req.query)
		.populate('producto')//reemplazar el id por el nombre corresponiente
		.exec()//
		.then((data)=>{
			res.status(200).send(data);
		});

	}
	else{
		User.find()
		.exec()
		.then((data)=>{
			res.status(200).send(data);
		});

	}


})
.post((req,res)=>{//recibe los datos
		console.log(req.body);//recibe los daots
	 const user=new User(req.body);
	 console.log(user);
	 user.save()
	 .then((data)=>{

	 	console.log("user guardado correctamente");
	 	res.status(200).send(data);//enviamos estado de la informacion 200 : ok

	 });
})

route.route('/producto')//api de producto
.get((req,res)=>{
	console.log("User get",req.query);
	if(req.query){
		console.log(req.query);
		Producto.find(req.query)
		.exec()
		.then((data)=>{
			res.status(200).send(data);
		});

	}
	else{
		Producto.find()
		.exec()
		.then((data)=>{
			res.status(200).send(data);
		});

	}


})
.post((req,res)=>{
		console.log(req.body);
	 const producto=new Producto(req.body);
	 console.log(producto);
	 producto.save()
	 .then((data)=>{

	 	console.log("producto guardado correctamente");
	 	res.status(200).send(data);

	 });
})



route.route('/user/:id')
.delete((req,res)=>{
	console.log("delete param",req.params.id);
	User.findByIdAndRemove(req.params.id)//findByIdAndRemove estamos utilizan o pasando id , lo busca y lo elimina
  //User.remover(_d:req.params.id) //eliminas de frente
	.exec()
	.then((data)=>{
		res.send("exito")

	})
	.catch((err)=>{
		console.log("err",err);
		res.status(400);
	});
})
.get((req,res)=>{
	User.findById(req.params.id)
	.populate('producto')
	.then(data=>{
		res.send(data);
	})
})
.put((req,res)=>{
	if(req.body.producto){//reciba un producto
		console.log("Find one and update")
		const pro=req.body.producto;
		console.log(pro);
		User.findOneAndUpdate(req.params.id,{'$push':{producto:pro}})
		.then((data)=>{
			res.status(200).send(data	);
		})
		.catch(err=>{
			res.status(400).send(err);
		})
	}
	else{
		User.findByIdAndUpdate(req.params.id,{'$set':req.body})
		.then((data)=>{
			res.status(200).send("Actualizado con exito");
		});
	}

})



app.use('/api',route);//cuando el usuario ingrese al api va a utilizar esa ruta /api/route en el router

app.get("/pagina",(req,res)=>{
	res.sendFile('plantilla.html',{root:__dirname});
});
app.listen(8000);
