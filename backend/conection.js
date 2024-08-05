const mongoose = require("mongoose");

async function connection(){
    try{
        await mongoose.connect("mongodb://localhost:27017/tacos");
        console.log("Conexion exitosa a la base de datos");
    }catch(error){
        console.log("Error al conectar a la base de datos");
    }
}

module.exports = connection;