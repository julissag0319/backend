import { authMiddleware } from "@src/middlewares/auth";
import { Usuario } from "@src/modelos/usuario";
import { Persona } from "@src/modelos/persona";
import { Router } from "express";
import { hash, compare } from "bcrypt";
import { generateToken } from "@src/utils/tokens";
import { generarCodigo, esContrasenaSegura } from "@src/utils/codigoRecuperacion";
const servicioCorreo = require("@src/conexion/mailer");
const router = Router();

router.get("/check-token", authMiddleware, (_req, res) => {
  return res.json(true);
});

router.post("/login", async (req, res) => {
  const usuario = await Usuario.findOne({
    where: { nombre_Usuario: req.body.nombre_Usuario },
  });

  if (!usuario) {
    console.log("usuario")
    res.status(401).json({ error: "Credenciales incorrectas" });
    return;
  }

  if (!(await compare(req.body.contrasena, usuario.contrasena_Usuario))) {
    console.log("contraseña", usuario.contrasena_Usuario);
    res.status(401).json({ error: "Credenciales incorrectas" });
    return;
  }
  return res.json({ token: generateToken(usuario), usuario });
});

router.post("/registro", async (req, res) => {
  const usuario = await Usuario.findOne({
    where: { nombre_Usuario: req.body.nombre_Usuario },
  });

  if (usuario) {
    res.status(401).json({ error: "nombre de usuario a existe" });
    return;
  }

  const contrasenaEncryptada = await hash(req.body.contrasena_Usuario, 10);
  const nuevoUsuario = await Usuario.create({
    id_Persona: req.body.id_Persona,
    nombre_Usuario: req.body.nombre_Usuario,
    contrasena_Usuario: contrasenaEncryptada,
    id_Tipo_Usuario: req.body.id_Tipo_Usuario,
    codigo_Recuperacion: generarCodigo(),

    id_Estado: 1,
  });
  return res.json({
    token: generateToken(nuevoUsuario),
    usuario: nuevoUsuario,
  });
});


router.post("/recuperar_contrasenia", async (req, res) => {
  const { email } = req.body;
  console.log(email);

  const persona = await Persona.findOne({
    where: { correo_Persona: email },
  });


  if (!persona) {
    res.json({ "error": "Error: no existe un usuario registrado con este correo." });
  } else {
    console.log(persona?.id_Persona);
    const usuario = await Usuario.findOne({
      where: { id_Persona: persona?.id_Persona },
    });

    console.log(usuario);
    const pin = generarCodigo();
    if (usuario) {
      await usuario.update({ codigo_Recuperacion: pin });

      const contenidoHtml = `     
      <div class="container">
      <h1>Recuperación de Contraseña</h1>
      <ul>
          <li>Nombre:  ${persona?.nombre_Persona} ${persona?.apellido_Persona} </li>
          <li>Correo: ${persona?.correo_Persona}</li>
          <li>Pin de Recuperación: ${pin}</li>
      </ul>
      <p>Nota: con este pin puede cambiar su contraseña solo una vez...</p>
      </div>`;
      
        const data = {
          nombre: persona?.nombre_Persona + " " + persona?.apellido_Persona,
          correo: persona?.correo_Persona,
          pin: pin,
          contenidoHtml: contenidoHtml,
          titulo: "Recuperación de Contraseña",
          mensajeConfirmacion: "Se envió el pin de recuperación a su Correo: " + persona?.correo_Persona
        };
        servicioCorreo.sendEmail(req, res, data);
    

    }





   

  }
});


router.post("/verificar_pin", async (req, res) => {
  const { pin } = req.body;
  console.log(pin);

  const usuario = await Usuario.findOne({
    where: { codigo_Recuperacion: pin },
  });

  if (!usuario) {
    res.json({
      message: "Pin Incorrecto",
      statusPin: false
    });
    return;
  }

  return res.status(200).json({
    message: "Pin Correcto",
    statusPin: true
  });
});


router.put("/restart_password/:pin", async (req, res) => {
  
  const {pin} = req.params
  const { password, confirmar_password } = req.body;

  const usuario = await Usuario.findOne({
    where: { codigo_Recuperacion: pin },
  });

  if(!usuario){
    return res.json("Ocurrio un Error");
  }

  if (password != confirmar_password) {
    return res.json("Las contraseñas deben coincidir");
  }
  if (esContrasenaSegura(password)) {
    const contrasenaEncryptada = await hash(password, 10);
    await usuario.update({ contrasena_Usuario: contrasenaEncryptada,codigo_Recuperacion: "null" });
    return res.json("Contraseña Actualizada con éxito")
  } else {
    console.log("Las contras no segura")
    return res.json("Ingrese una contraseña segura");
  }

});


export default router;
