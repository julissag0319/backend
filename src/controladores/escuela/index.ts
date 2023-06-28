import { Escuela } from "../../modelos/escuela";
import { IEscuela } from "../../modelos/escuela/interfaz";
import { conexion } from "@src/conexion/Conexion";

//CLASE 
export class Controlador_Escuela {


//Listar Todos los Departamentos
async tomarTodoEscuela() {
  //relacion (d.*) para traer td los campos del depart la p es la variable de Persona 
  const [resultado] = await conexion.query("Select d.*, (Select count (*) From Persona p Where p.id_Escuela = d.id_Escuela ) Persona From Escuela As d where d.id_Estado = 1")
  return resultado 
}



//Listar o Tomar solo un Escuela
  async tomarUnEscuela(id: number) {
    return await Escuela.findByPk(id);
  }

//Crear un Escuela 
  async crearUno(data: IEscuela) {
    try {
      const { ...objectData } = data;
      const result = await Escuela.create(objectData);
      return result;
    } catch (error) {
      throw error;
    }
  }

 //Editar un Escuela
  async editarUno(id: number, data: IEscuela) {
    try {
      const { id_Escuela, id_Departamento,id_Municipio,descripcion_Escuela,id_Persona,id_Red, id_Estado } = data;
      const result = await Escuela.update(
        {
          id_Escuela, 
          id_Departamento,
          id_Municipio,
          descripcion_Escuela,
          id_Persona,
          id_Red,
          id_Estado,
        },
        {
          where: 
          {
            id_Escuela: id,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

//Eliminar un Escuela
  async eliminarUno(id: number) {
    try {
      const result = await Escuela.update(
        {
          id_Estado: 2,
        },
        {
          where: 
          {
            id_Escuela: id,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}