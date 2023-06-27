import { Router, Request, Response } from "express";
import { Controlador_Tipo_Usuario } from "../../controladores/tipo_Usuario";
import { ITipo_Usuario } from "../../modelos/tipo_Usuario/interfaz";

const router = Router();
const Tipo_UsuarioInstacia = new Controlador_Tipo_Usuario();

router.get("/", async (_req: Request, res: Response) => {
    try{
        const Tipo_Usuario = await Tipo_UsuarioInstacia.tomarTodoTipo_Usuario();
        if(Tipo_Usuario.length === 0){
            res.status(200).json({ message: "No se encontraron registros" });
        }else{
            res.status(200).json(Tipo_Usuario);
        }
    }catch(error){
        res.status(500).json({ message: "Error al recuperar los datos" });
    }
});

router.get("/tipo_usuario/:id", async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const Tipo_Usuario = await Tipo_UsuarioInstacia.tomarUnTipo_Usuario(
            Number(id)
        );
        res.status(200).json(Tipo_Usuario);
    }catch(error){
        res.status(500).json({ message: "Error" });
        console.log(error);
    }
});

router.post("/nuevo-tipo_usuario", async (req: Request, res: Response) => {
    try {
        const { ...myObject } = req.body as ITipo_Usuario;
        await Tipo_UsuarioInstacia.crearUno(myObject);
        res.status(201).json({ message: "Registro actualizado! " });
    }catch(error) {
        res.status(500).json({ message: "Error en el Servidor" });
        console.log(error);
    }
});

router.put("/editar-tipo_usuario/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { ...myObject } = req.body as ITipo_Usuario;
        const result = await Tipo_UsuarioInstacia.editarUno(Number(id), myObject);
        if(result) {
            res.status(201).json({ message: "Registro actualizado!" });
        }
    }catch(error) {
        res.status(500).json({ message: "Servidor de error" });
        console.log(error);
    }
});

router.delete("/eliminar-tipo_usuario/:id", async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const result = await Tipo_UsuarioInstacia.eliminarUno(Number(id));
        if (result) {
            res.status(200).json({ message: "Registro eliminado!" });
        }
    }catch (error) {
        res.status(500).json({ message: "Error al recuperar los datos" });
        console.log(error);
    }
});

export default router;