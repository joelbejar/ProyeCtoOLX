
const mongoose=requiere('mongoose');
const express=requiere('express');
const app=express();
const router=express.router();
const bodyParser=require('body-parser');
const methodOverride=require('method-override');

mongoose.connect('localhost:27017/prueba1');

const Schema = mongoose.Schema;
const BlogSchema=new  Schema({
  publicacion :{type:String},
  comentario :{type:Schema.Types.ObejctId , ref :"Comentario"}
});

const ComentarioSchema = new Schema({
  comentario :{type:String}
);
