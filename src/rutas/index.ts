import { Router } from "express";

import Departamentorutas from "./departamento";
import tipo_cargorutas from "./tipo_Cargo";
import Tipo_Usuariorutas from "./tipo_Usuario";
import Municipiorutas from "./municipio";
import Redrutas from "./red";
import Usuariorutas from "./usuario";
import Personarutas from "./persona";
import Escuelarutas from "./escuela";
import Auth from "./auth";
import { authMiddleware } from "@src/middlewares/auth";

const router = Router();

router.use("/departamento", Departamentorutas);
router.use("/tipo_cargo", authMiddleware, tipo_cargorutas);
router.use("/Tipo_Usuario", Tipo_Usuariorutas);
router.use("/municipio", authMiddleware, Municipiorutas);
router.use("/red",  Redrutas);
router.use("/usuario", authMiddleware, Usuariorutas);
router.use("/persona",  Personarutas);
router.use("/escuela", authMiddleware, Escuelarutas);
// no puse el authMiddleware xq el login debe estar disponible sin autenticacion
router.use("/auth", Auth);

export default router;
