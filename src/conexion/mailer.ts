const nodemailer = require("nodemailer");



exports.sendEmail = async function (_req, res,data) {
    // Definimos el transporter
    var transport = nodemailer.createTransport({
        host: process.env.correo_servicio,
        port: process.env.correo_port,
        auth: {
          user: process.env.user,
          pass: process.env.correo_contrasenia
        }
      });
 const datajson = [{
    host: process.env.correo_servicio,
    port: process.env.correo_port,
    auth: {
      user: process.env.user,
      pass: process.env.correo_contrasenia
    }
  }];
      console.log(datajson);

    
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
            console.log("eRROR DE ENVIO: " + error);
            return res.json({error: "Error de envio: " + error.message });
          
            //msj("Error de Envió",error.message,200,[],res);
        } else {
            console.log("ENVIO EXITOSO");
            return res.json({data: data.mensajeConfirmacion});
           // msj("Envió Exitoso",data.mensajeConfirmacion,200,[],res);
        }
    });
};
