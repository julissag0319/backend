import { Router, Request, Response } from "express";
import { Controlador_Usuario } from "../../controladores/usuario";
import { IUsuario } from "../../modelos/usuario/interfaz";

const router = Router();
const UsuarioInstacia = new Controlador_Usuario();

router.get("/", async (_req: Request, res: Response) => {
    try{
        const Usuario = await UsuarioInstacia.tomarTodoUsuario();
        if(Usuario.length === 0){
            res.status(200).json({ message: "No se encontraron registros" });
        }else{
            res.status(200).json(Usuario);
        }
    }catch(error){
        res.status(500).json({ message: "Error al recuperar los datos" });
    }
});

router.get("/usuario/:id", async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const Usuario = await UsuarioInstacia.tomarUnUsuario(
            Number(id)
        );
        res.status(200).json(Usuario);
    }catch(error){
        res.status(500).json({ message: "Error" });
        console.log(error);
    }
});

router.post("/nuevo-usuario", async (req: Request, res: Response) => {
    try {
        const { ...myObject } = req.body as IUsuario;
        await UsuarioInstacia.crearUno(myObject);
        res.status(201).json({ message: "Registro actualizado! " });
    }catch(error) {
        res.status(500).json({ message: "Error en el Servidor" });
        console.log(error);
    }
});

router.put("/editar-usuario/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { ...myObject } = req.body as IUsuario;
        const result = await UsuarioInstacia.editarUno(Number(id), myObject);
        if(result) {
            res.status(201).json({ message: "Registro actualizado!" });
        }
    }catch(error) {
        res.status(500).json({ message: "Servidor de error" });
        console.log(error);
    }
});

router.delete("/eliminar-usuario/:id", async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const result = await UsuarioInstacia.eliminarUno(Number(id));
        if (result) {
            res.status(200).json({ message: "Registro eliminado!" });
        }
    }catch (error) {
        res.status(500).json({ message: "Error al recuperar los datos" });
        console.log(error);
    }
});

export default router;