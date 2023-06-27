import { Red } from "../../modelos/red";
import { IRed } from "../../modelos/red/interfaz";

//CLASE 
export class Controlador_Red {

//Listar Todos los Reds de los Empleados
  async tomarTodoRed() {
    return await Red.findAll({
      where: {
        id_Estado: 1,
      },
    });
  }

//Listar o Tomar solo un Red
  async tomarUnRed(id: number) {
    return await Red.findByPk(id);
  }

//Crear un Red 
  async crearUno(data: IRed) {
    try {
      const { ...objectData } = data;
      const result = await Red.create(objectData);
      return result;
    } catch (error) {
      throw error;
    }
  }

 //Editar Red
  async editarUno(id: number, data: IRed) {
    try {
      const { codigo_Red,descripcion_Red, id_Estado } = data;
      const result = await Red.update(
        {
          codigo_Red,  
          descripcion_Red,
          id_Estado,
        },
        {
          where: 
          {
            id_Red: id,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

//Eliminar Red
  async eliminarUno(id: number) {
    try {
      const result = await Red.update(
        {
          id_Estado: 2,
        },
        {
          where: 
          {
            id_Red: id,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}