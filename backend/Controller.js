const orden = require("./tacoModel");
const validToken = 'afb6757f-cd5b-4037-907b-46176ec73e13';


const guardarOrden = async(req,res) => {
    try{
        const pedidoData = req.body
        
        const pedido = new orden(pedidoData);

        await pedido.save();

        return res.status(200).json({
            status:"Succes",
            mensaje:"Se ha guardado el pedido de manera correcta",
            pedido
        });
    }catch(error){
        return res.status(500).json({
            status: "Failed",
            mensaje: error
        });
    }
}

const verificar = async(req,res) => {
    const token = req.query.token;

    // Verifica el token aquí (puede ser en una base de datos, en una lista de tokens válidos, etc.)
    if (token === 'afb6757f-cd5b-4037-907b-46176ec73e13') {
      res.json({ success: true, message: 'Access granted' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid token' });
    }
  };

module.exports = {guardarOrden,verificar}