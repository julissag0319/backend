import { authMiddleware } from "@src/middlewares/auth";
import { Usuario } from "@src/modelos/usuario";
import { Router } from "express";
import { hash, compare } from "bcrypt";
import { generateToken } from "@src/utils/tokens";
import { generarCodigo } from "@src/utils/codigoRecuperacion";
const router = Router();

router.get("/check-token", authMiddleware, (_req, res) => {
  return res.json(true);
});

router.post("/login", async (req, res) => {
  const usuario = await Usuario.findOne({
    where: { nombre_Usuario: req.body.nombre_Usuario },
  });

  if (!usuario) {
    console.log ("usuario")
        res.status(401).json({ error: "Credenciales incorrectas" });
    return;
  }
  
  if (!(await compare(req.body.contrasena, usuario.contrasena_Usuario))) {
    console.log ("contraseña")
    res.status(401).json({ error: "Credenciales incorrectas" });
    return;
  }
  return res.json({ token: generateToken(usuario), usuario });
});
router.post("/registro", authMiddleware, async (req, res) => {
  const usuario = await Usuario.findOne({
    where: { nombre_Usuario: req.body.nombre_Usuario },
  });

  if (usuario) {
    res.status(401).json({ error: "nombre de usuario a existe" });
    return;
  }
  const contrasenaEncryptada = await hash(req.body.contrasena, 10);
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

export default router;
