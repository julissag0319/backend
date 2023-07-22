const nodemailer = require("nodemailer");

exports.sendEmail = async function (_req, res,data) {
    // Definimos el transporter
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "319e92345f67a7",
          pass: "0a110133da1ab6"
        }
      });

    
    // Definimos el email
    var mailOptions = {
        from: process.env.correo_app,
        to: data.correo,
        subject: data.titulo,
        html: data.contenidoHtml
    };
    // Enviamos el email
    await transport.sendMail(mailOptions, function (error, _info) {
        if (error) {
            return res.json({error: "Error de envio: " + error.message });
            //msj("Error de Envió",error.message,200,[],res);
        } else {
            return res.json({data: data.mensajeConfirmacion});
           // msj("Envió Exitoso",data.mensajeConfirmacion,200,[],res);
        }
    });
};