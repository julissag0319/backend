import { Router, Request, Response } from "express";
import { Controlador_Municipio } from "../../controladores/municipio";
import { IMunicipio } from "../../modelos/municipio/interfaz";

const router = Router();
const MunicipioInstacia = new Controlador_Municipio();

router.get("/", async (_req: Request, res: Response) => {
    try{
        const Municipio = await MunicipioInstacia.tomarTodoMunicipio();
        if(Municipio.length === 0){
            res.status(200).json({ message: "No se encontraron registros" });
        }else{
            res.status(200).json(Municipio);
        }
    }catch(error){
        res.status(500).json({ message: "Error al recuperar los datos" });
    }
});

router.get("/municipio/:id", async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const Municipio = await MunicipioInstacia.tomarUnMunicipio(
            Number(id)
        );
        res.status(200).json(Municipio);
    }catch(error){
        res.status(500).json({ message: "Error" });
        console.log(error);
    }
});

router.post("/nuevo-municipio", async (req: Request, res: Response) => {
    try {
        const { ...myObject } = req.body as IMunicipio;
        await MunicipioInstacia.crearUno(myObject);
        res.status(201).json({ message: "Municipio Agregado! " });
    }catch(error) {
        res.status(500).json({ message: "Error Agregar Municipio" });
        console.log(error);
    }
});

router.put("/editar-municipio/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { ...myObject } = req.body as IMunicipio;
        const result = await MunicipioInstacia.editarUno(Number(id), myObject);
        if(result) {
            res.status(201).json({ message: "Registro actualizado!" });
        }
    }catch(error) {
        res.status(500).json({ message: "Error al Editar" });
        console.log(error);
    }
});

router.delete("/eliminar-municipio/:id", async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const result = await MunicipioInstacia.eliminarUno(Number(id));
        if (result) {
            res.status(200).json({ message: "Registro eliminado!" });
        }
    }catch (error) {
        res.status(500).json({ message: "Error al eliminar los datos" });
        console.log(error);
    }
});

export default router;