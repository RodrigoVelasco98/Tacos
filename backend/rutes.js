const express = require("express");
const tacos = require("./Controller");

const router = express.Router();

router.post("/guardarOrden",tacos.guardarOrden);
router.get("/verify",tacos.verificar);


module.exports = router;
