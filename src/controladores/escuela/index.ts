import { Escuela } from "../../modelos/escuela";
import { IEscuela } from "../../modelos/escuela/interfaz";

//CLASE 
export class Controlador_Escuela {

//Listar Todos los Escuela
  async tomarTodoEscuela() {
    return await Escuela.findAll({
      where: {
        id_Estado: 1,
      },
    });
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