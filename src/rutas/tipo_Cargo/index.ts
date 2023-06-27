import { Router, Request, Response } from "express";
import { Controlador_Tipo_Cargo } from "../../controladores/tipo_Cargo";
import { ITipo_Cargo } from "../../modelos/tipo_Cargo/interfaz";

const router = Router();
const Tipo_CargoInstacia = new Controlador_Tipo_Cargo();

router.get("/", async (_req: Request, res: Response) => {
    try{
        const Tipo_Cargo = await Tipo_CargoInstacia.tomarTodoTipo_Cargo();
        if(Tipo_Cargo.length === 0){
            res.status(200).json({ message: "No se encontraron registros" });
        }else{
            res.status(200).json(Tipo_Cargo);
        }
    }catch(error){
        res.status(500).json({ message: "Error al recuperar los datos" });
    }
});

router.get("/tipo_cargo/:id", async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const Tipo_Cargo = await Tipo_CargoInstacia.tomarUnTipo_Cargo(
            Number(id)
        );
        res.status(200).json(Tipo_Cargo);
    }catch(error){
        res.status(500).json({ message: "Error" });
        console.log(error);
    }
});

router.post("/nuevo-tipo_cargo", async (req: Request, res: Response) => {
    try {
        const { ...myObject } = req.body as ITipo_Cargo;
        await Tipo_CargoInstacia.crearUno(myObject);
        res.status(201).json({ message: "Registro actualizado! " });
    }catch(error) {
        res.status(500).json({ message: "Error al agregar" });
        console.log(error);
    }
});

router.put("/editar-tipo_cargo/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { ...myObject } = req.body as ITipo_Cargo;
        const result = await Tipo_CargoInstacia.editarUno(Number(id), myObject);
        if(result) {
            res.status(201).json({ message: "Registro actualizado!" });
        }
    }catch(error) {
        res.status(500).json({ message: "Servidor de error" });
        console.log(error);
    }
});

router.delete("/eliminar-tipo_cargo/:id", async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const result = await Tipo_CargoInstacia.eliminarUno(Number(id));
        if (result) {
            res.status(200).json({ message: "Registro eliminado!" });
        }
    }catch (error) {
        res.status(500).json({ message: "Error al recuperar los datos" });
        console.log(error);
    }
});

export default router;