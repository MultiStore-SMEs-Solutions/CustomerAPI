const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const htmlPath = path.join(__dirname, "message.html");
const html = fs.readFileSync(htmlPath, "utf8");

const sendEmail = (email, orderCode, orderId, status = "Sin Pagar") => {
  //CODIGO QUE ENVIA CORREO AL CLIENTE PARA LA ACTIVACION DE LA CUENTA

  //let rediect = `http://localhost:3000`;
  let redirect = `https://spacefood.up.railway.app`;
  const mailExpress =
    "smtps://expressfoodhenry@gmail.com:hdogizvqpmgovqni@smtp.gmail.com";
  const mailSpace =
    "smtps://spacefoodhenry@gmail.com:ukyergzinkarzzpy@smtp.gmail.com";
  const transporter = nodemailer.createTransport(mailSpace);
let mailOptions ={
  from: "Spacefood",
  to: email,
  subject: "Registro Existoso",
  html: html,
};
  const mailRegistration = {
    from: "Spacefood",
    to: email,
    subject: "Registro Existoso",
    html: html,
  };
  const mailSuccessPayment = {
    from: "Spacefood",
    to: email,
    subject: `Numero de orden ${orderCode}`,
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Message</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
        />
      </head>
      <body>
        <table
          style="
            max-width: 500px;
            padding: 10px;
            margin: 0 auto;
            border-collapse: collapse;
          "
        >
          <tr>
            <td
              style="
                background-color: #e7e7e7;
                padding: 0;
                border-radius: 5px 5px 0px 0px;
                position: relative;
                display: block;
              "
            >
              <img
                width="100%"
                style="display: block; margin: 0px; border-radius: 5px 5px 0px 0px"
                src="https://i.ibb.co/wyJGWdP/AAAAAAAAAAAAAAAA.png"
                alt="mande1"
              />
            </td>
          </tr>
          <tr>
            <td style="background-color: #ffff; padding: 0px">
              <div
                style="
                  width: 100%;
                  margin: 0px;
                  padding: 10px 0px 20px 0px;
                  display: inline-block;
                  text-align: center;
                  background-color: #e7e7e79f;
                  border-radius: 0px 0px 5px 5px;
                "
              >
                <h3
                  style="
                    text-align: center;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont,
                      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
                      'Helvetica Neue', sans-serif;
                    font-weight: bold;
                    color: #101010;
                    font-size: 25px;
                    margin: 0px;
                    padding-bottom: 10px;
                  "
                >
                  SPACE FOOD
                </h3>
                <img
                  width="15%"
                  style="margin: 0px"
                  src="https://i.ibb.co/pbnK9gw/logoPng.png"
                  alt="logo"
                />
                <p
                  style="
                    font-size: 15px;
                    font-family: sans-serif;
                    text-align: center;
                    margin: 0px;
                    padding: 20px 35px;
                  "
                >
                  Gracias por tu compra
                  ¡valora nuestros productos!
                </p>
                <a href=${redirect}/reviews/${orderId}>
                  <button style="padding: 5px 17px; border-radius: 5px; border: 0px; background-color: #8f1414; color: #f5f5f5; ">Valorar</button>
                </a>
                <p style="font-family: sans-serif; font-size: 13px; color: #7a7a7a">
                  &#169; Space Food company
                </p>
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `,
  };
  const mailOrderReady = {
    from: "SpaceFood",
    to: email,
    subject: `Orden ${orderCode} lista para retirar`,
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Message</title>
      </head>
      <body>
        <table
          style="
            max-width: 500px;
            padding: 10px;
            margin: 0 auto;
            border-collapse: collapse;
          "
        >
          <tr>
            <td
              style="
                background-color: #e7e7e7;
                padding: 0;
                border-radius: 5px 5px 0px 0px;
                position: relative;
                display: block;
              "
            >
              <img
                width="100%"
                style="display: block; margin: 0px; border-radius: 5px 5px 0px 0px"
                src="https://i.ibb.co/wyJGWdP/AAAAAAAAAAAAAAAA.png"
                alt="mande1"
              />
            </td>
          </tr>
          <tr>
            <td style="background-color: #ffff; padding: 0px">
              <div
                style="
                  width: 100%;
                  margin: 0px;
                  padding: 10px 0px 20px 0px;
                  display: inline-block;
                  text-align: center;
                  background-color: #e7e7e79f;
                  border-radius: 0px 0px 5px 5px;
                "
              >
                <h3
                  style="
                    text-align: center;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont,
                      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
                      'Helvetica Neue', sans-serif;
                    font-weight: bold;
                    color: #101010;
                    font-size: 25px;
                    margin: 0px;
                    padding-bottom: 10px;
                  "
                >
                  SPACE FOOD
                </h3>
                <img
                  width="15%"
                  style="margin: 0px"
                  src="https://i.ibb.co/pbnK9gw/logoPng.png"
                  alt="logo"
                />
                <p
                  style="
                    font-size: 15px;
                    font-family: sans-serif;
                    text-align: center;
                    margin: 0px;
                    padding: 20px 35px;
                  "
                >
                 Tu orden ${orderCode}.<br/>
                 Esta lista! Buen provecho!
                </p>
    
               
                </a>
                </p>
                <a href=${redirect}/pedidos>
                  <button style="padding: 5px 17px; border-radius: 5px; border: 0px; background-color: #8f1414; color: #f5f5f5; ">Ver pedidos</button>
                </a>
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `,
  };
  if (status === "Sin pagar") {mailOptions = mailRegistration;}

  if (status === "Entregada"){ mailOptions = mailSuccessPayment;}
  if (status === "Lista"){ mailOptions = mailOrderReady;
}
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err.message);
  });
};

module.exports = { sendEmail };
