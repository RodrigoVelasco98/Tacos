const express = require("express");
const connection = require("./conection")
const cors = require("cors");
const rutas = require("./rutes");

const app = express();
const puerto = 3000;

//Conexion a la base de datos
connection();




//ULRS de conexion
const urlPc = `http://10.0.0.6:${puerto}`
const localhost = `http://localhost:${puerto}`

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(rutas)


//Arranque de aplicacion en express
app.listen(puerto,'0.0.0.0',()=>{
    console.log(`Aplicacion corriendo en ${urlPc}`);
})