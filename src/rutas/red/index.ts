import { Router, Request, Response } from "express";
import { Controlador_Red } from "../../controladores/red";
import { IRed } from "../../modelos/red/interfaz";

const router = Router();
const RedInstacia = new Controlador_Red();

router.get("/", async (_req: Request, res: Response) => {
    try{
        const Red = await RedInstacia.tomarTodoRed();
        if(Red.length === 0){
            res.status(200).json({ message: "No se encontraron registros" });
        }else{
            res.status(200).json(Red);
        }
    }catch(error){
        res.status(500).json({ message: "Error al recuperar los datos" });
    }
});

router.get("/cantidad_redes", async (_req: Request, res: Response) => {
    try{
        const Red = await RedInstacia.CantidadRedPorEscuelas();
        if(Red.length === 0){
            res.status(200).json({ message: "No se encontraron registros" });
        }else{
            res.status(200).json(Red);
        }
    }catch(error){
        res.status(500).json({ message: "Error al recuperar los datos" });
    }
});



router.get("/red/:id", async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const Red = await RedInstacia.tomarUnRed(
            Number(id)
        );
        res.status(200).json(Red);
    }catch(error){
        res.status(500).json({ message: "Error" });
        console.log(error);
    }
});

router.post("/nuevo-red", async (req: Request, res: Response) => {
    try {
        const { ...myObject } = req.body as IRed;
        await RedInstacia.crearUno(myObject);
        res.status(201).json({ message: "Registro actualizado! " });
    }catch(error) {
        res.status(500).json({ message: "Error en el Servidor" });
        console.log(error);
    }
});

router.put("/editar-red/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { ...myObject } = req.body as IRed;
        const result = await RedInstacia.editarUno(Number(id), myObject);
        if(result) {
            res.status(201).json({ message: "Registro actualizado!" });
        }
    }catch(error) {
        res.status(500).json({ message: "Servidor de error" });
        console.log(error);
    }
});

router.delete("/eliminar-red/:id", async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const result = await RedInstacia.eliminarUno(Number(id));
        if (result) {
            res.status(200).json({ message: "Registro eliminado!" });
        }
    }catch (error) {
        res.status(500).json({ message: "Error al recuperar los datos" });
        console.log(error);
    }
});

export default router;