import { Usuario } from "../../modelos/usuario";
import { IUsuario } from "../../modelos/usuario/interfaz";

//import { conexion } from "@src/conexion/Conexion";

//CLASE 
export class Controlador_Usuario {

//Listar Todos los Usuarios 
 // async tomarTodoUsuario() {
      //relacion (d.*) para traer td los campos del depart la p es la variable de Persona 
   //   const [resultado] = await conexion.query("Select d.*, (Select count (*) From Persona p Where p.id_Usuario = d.id_Usuario ) Persona From Usuario As d where d.id_Estado = 1")
     // return resultado 
 //   }




    async tomarTodoUsuario() {
      return await Usuario.findAll({
        where: {
          id_Estado: 1,
        },
      });
    }
//Listar o Tomar solo un Usuario 
  async tomarUnUsuario(id: number) {
    return await Usuario.findByPk(id);
  }

//Crear 
  async crearUno(data: IUsuario) {
    try {
     
      const { ...objectData } = data;
      const result = await Usuario.create(objectData);
      return result;
    } catch (error) {
      throw error;
    }
  }

 //Editar 
  async editarUno(id: number, data: IUsuario) {
    try {
      const { id_Usuario, id_Persona, nombre_Usuario, contrasena_Usuario,codigo_Recuperacion,id_Tipo_Usuario,id_Estado} = data;
      const result = await Usuario.update(
        {
          id_Usuario, 
          id_Persona, 
          nombre_Usuario, 
          contrasena_Usuario,
          codigo_Recuperacion,
          id_Tipo_Usuario,
          id_Estado,
        },
        {
          where: 
          {
            id_Usuario: id,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

//Eliminar
  async eliminarUno(id: number) {
    try {
      const result = await Usuario.update(
        {
          id_Estado: 2,
        },
        {
          where: 
          {
            id_Usuario: id,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}