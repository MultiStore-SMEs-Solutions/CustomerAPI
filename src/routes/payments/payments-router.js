const { Router } = require('express');
const router = Router();
const { paymentsSuccessProcess } = require("../../controllers/Payments/payments-success-controler")
const { paymentsMiddleware } = require("../../middleware/payments-middleware")
const { paymentsFailureProcess } = require("../../controllers/Payments/payments-failure-controler")


router.post("/create", paymentsMiddleware );

router.get("/success", async(req, res)=>{
    const successResponse = req.query;
    //! Probar Modificar
    let redirectUrl = await paymentsSuccessProcess(successResponse) //!AQUI SE INVOCA EL CONTROLADOR DE LA LOGICA CON DB PASANDOLE VARIABLEE PRODUCT
    //! Console.log
    //console.log(redirectUrl);
    res.status(200).redirect(redirectUrl)
        
    }
 );
router.get("/fail", async(req, res)=>{

    let redirectUrl = await paymentsFailureProcess()
    res.status(400).redirect(redirectUrl)
    }
 );



module.exports = router;