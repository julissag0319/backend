import { Tipo_Cargo } from "../../modelos/tipo_Cargo";
import { ITipo_Cargo } from "../../modelos/tipo_Cargo/interfaz";
import { conexion } from "@src/conexion/Conexion";

//CLASE 
export class Controlador_Tipo_Cargo {



//Listar Todos
async tomarTodoTipo_Cargo() {
  //relacion (d.*) para traer td los campos del depart la p es la variable de Persona 
  const [resultado] = await conexion.query("Select d.*, (Select count (*) From Persona p Where p.id_Tipo_Cargo = d.id_Tipo_Cargo ) Persona From Tipo_Cargo As d where d.id_Estado = 1")
  return resultado 
}



//Listar o Tomar solo un Tipo_Cargo 
  async tomarUnTipo_Cargo(id: number) {
    return await Tipo_Cargo.findByPk(id);
  }

//Crear 
  async crearUno(data: ITipo_Cargo) {
    try {
      const { ...objectData } = data;
      const result = await Tipo_Cargo.create(objectData);
      return result;
    } catch (error) {
      throw error;
    }
  }

 //Editar 
  async editarUno(id: number, data: ITipo_Cargo) {
    try {
      const { descripcion_Tipo_Cargo, id_Estado } = data;
      const result = await Tipo_Cargo.update(
        {
          descripcion_Tipo_Cargo,
          id_Estado,
        },
        {
          where: 
          {
            id_Tipo_Cargo: id,
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
      const result = await Tipo_Cargo.update(
        {
          id_Estado: 2,
        },
        {
          where: 
          {
            id_Tipo_Cargo: id,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}