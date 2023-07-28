import { Router, Request, Response } from "express";
import { Controlador_Persona } from "../../controladores/persona";
import { IPersona } from "../../modelos/persona/interfaz";

const router = Router();
const PersonaInstacia = new Controlador_Persona();

router.get("/", async (_req: Request, res: Response) => {
    try{
        const Persona = await PersonaInstacia.tomarTodoPersona();
        if(Persona.length === 0){
            res.status(200).json({ message: "No se encontraron registros" });
        }else{
            res.status(200).json(Persona);
        }
    }catch(error){
        res.status(500).json({ message: "Error al recuperar los datos" });
    }
});

router.get("/cantidad_supervisores", async (_req: Request, res: Response) => {
    try{
        const Persona = await PersonaInstacia.CantidadSupervisores();
        if(Persona.length === 0){
            res.status(200).json({ message: "No se encontraron registros" });
        }else{
            res.status(200).json(Persona);
        }
    }catch(error){
        res.status(500).json({ message: "Error al recuperar los datos" });
    }
});

///tomar una persona 
router.get("/persona/:id", async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const Persona = await PersonaInstacia.tomarUnPersona(
            Number(id)
        );
        res.status(200).json(Persona);
    }catch(error){
        res.status(500).json({ message: "Error" });
        console.log(error);
    }
});

router.post("/nuevo-persona", async (req: Request, res: Response) => {
    try {
        const { ...myObject } = req.body as IPersona;
        await PersonaInstacia.crearUno(myObject);
        res.status(201).json({ message: "Registro actualizado! " });
    }catch(error) {
        res.status(500).json({ message: "Error al agregar una Persona" });
        console.log(error);
    }
});

router.put("/editar-persona/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { ...myObject } = req.body as IPersona;
        const result = await PersonaInstacia.editarUno(Number(id), myObject);
        if(result) {
            res.status(201).json({ message: "Registro actualizado!" });
        }
    }catch(error) {
        res.status(500).json({ message: "Servidor de error" });
        console.log(error);
    }
});

router.delete("/eliminar-persona/:id", async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const result = await PersonaInstacia.eliminarUno(Number(id));
        if (result) {
            res.status(200).json({ message: "Registro eliminado!" });
        }
    }catch (error) {
        res.status(500).json({ message: "Error al eliminar los datos" });
        console.log(error);
    }
});

export default router;