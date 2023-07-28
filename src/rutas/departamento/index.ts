import { Router, Request, Response } from "express";
import { Controlador_Departamento } from "../../controladores/departamento";
import { IDepartamento } from "../../modelos/departamento/interfaz";

const router = Router();
const departamentoInstacia = new Controlador_Departamento();

router.get("/", async (_req: Request, res: Response) => {
    try{
        const departamentos = await departamentoInstacia.tomarTodoDepartamento();
        if(departamentos.length === 0){
            res.status(200).json({ message: "No Records Were Found" });
        }else{
            res.status(200).json(departamentos);
        }
    }catch(error){
        res.status(500).json({ message: "Error retrieving the data" });
    }
});

router.get("/cantidad_departamentos", async (_req: Request, res: Response) => {
    try{
        const departamentos = await departamentoInstacia.cantidadEscuelasPorDepartamento();
        if(departamentos.length === 0){
            res.status(200).json({ message: "No Records Were Found" });
        }else{
            res.status(200).json(departamentos);
        }
    }catch(error){
        res.status(500).json({ message: "Error retrieving the data" });
    }
});

router.get("/departamento/:id", async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const departamento = await departamentoInstacia.tomarUnDepartamento(
            Number(id)
        );
        res.status(200).json(departamento);
    }catch(error){
        res.status(500).json({ message: "Internal Error Server" });
        console.log(error);
    }
});

router.post("/nuevo-departamento", async (req: Request, res: Response) => {
    try {
        const { ...myObject } = req.body as IDepartamento;
        await departamentoInstacia.crearUno(myObject);
        res.status(201).json({ message: "Agregado con exito! " });
    }catch(error) {
        res.status(500).json({ message: "Error al Agregar nuevo Departamento" });
        console.log(error);
    }
});

router.put("/editar-departamento/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { ...myObject } = req.body as IDepartamento;
        const result = await departamentoInstacia.editarUno(Number(id), myObject);
        if(result) {
            res.status(201).json({ message: "Editado Correctamente!" });
        }
    }catch(error) {
        res.status(500).json({ message: "Error al Editar" });
        console.log(error);
    }
});

router.delete("/eliminar-departamento/:id", async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const result = await departamentoInstacia.eliminarUno(Number(id));
        if (result) {
            res.status(200).json({ message: "Eliminado correctamente" });
        }
    }catch (error) {
        res.status(500).json({ message: "Error al Eliminar" });
        console.log(error);
    }
});

export default router;