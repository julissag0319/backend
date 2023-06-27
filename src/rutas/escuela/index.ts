import { Router, Request, Response } from "express";
import { Controlador_Escuela } from "../../controladores/escuela";
import { IEscuela } from "../../modelos/escuela/interfaz";

const router = Router();
const EscuelaInstacia = new Controlador_Escuela();

router.get("/", async (_req: Request, res: Response) => {
    try{
        const Escuela = await EscuelaInstacia.tomarTodoEscuela();
        if(Escuela.length === 0){
            res.status(200).json({ message: "No se encontraron registros" });
        }else{
            res.status(200).json(Escuela);
        }
    }catch(error){
        res.status(500).json({ message: "Error al recuperar los datos" });
    }
});

router.get("/escuela/:id", async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const Escuela = await EscuelaInstacia.tomarUnEscuela(
            Number(id)
        );
        res.status(200).json(Escuela);
    }catch(error){
        res.status(500).json({ message: "Error" });
        console.log(error);
    }
});

router.post("/nuevo-escuela", async (req: Request, res: Response) => {
    try {
        const { ...myObject } = req.body as IEscuela;
        await EscuelaInstacia.crearUno(myObject);
        res.status(201).json({ message: "Registro actualizado! " });
    }catch(error) {
        res.status(500).json({ message: "Error en el Servidor" });
        console.log(error);
    }
});

router.put("/editar-escuela/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { ...myObject } = req.body as IEscuela;
        const result = await EscuelaInstacia.editarUno(Number(id), myObject);
        if(result) {
            res.status(201).json({ message: "Registro actualizado!" });
        }
    }catch(error) {
        res.status(500).json({ message: "Servidor de error" });
        console.log(error);
    }
});

router.delete("/eliminar-escuela/:id", async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const result = await EscuelaInstacia.eliminarUno(Number(id));
        if (result) {
            res.status(200).json({ message: "Registro eliminado!" });
        }
    }catch (error) {
        res.status(500).json({ message: "Error al recuperar los datos" });
        console.log(error);
    }
});

export default router;