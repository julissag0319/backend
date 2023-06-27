import { Router } from "express";

import Departamentorutas from "./departamento";
import tipo_cargorutas from "./tipo_Cargo";
import Tipo_Usuariorutas from "./tipo_Usuario";
import Municipiorutas from "./municipio";
import Redrutas from "./red";
import Usuariorutas from "./usuario";
import Personarutas from "./persona";
import Escuelarutas from "./escuela";

const router = Router();

router.use("/departamento", Departamentorutas);
router.use("/tipo_cargo", tipo_cargorutas);
router.use("/Tipo_Usuario", Tipo_Usuariorutas);
router.use("/municipio", Municipiorutas);
router.use("/red", Redrutas);
router.use("/usuario", Usuariorutas);
router.use("/persona", Personarutas);
router.use("/escuela", Escuelarutas);

export default router;