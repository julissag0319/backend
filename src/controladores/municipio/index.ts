import { Municipio } from "../../modelos/municipio";
import { IMunicipio } from "../../modelos/municipio/interfaz";

//CLASE 
export class Controlador_Municipio {

//Listar Todos 
  async tomarTodoMunicipio() {
    return await Municipio.findAll({
      where: {
        id_Estado: 1,
      },
    });
  }

//Listar o Tomar solo un Municipio
  async tomarUnMunicipio(id: number) {
    return await Municipio.findByPk(id);
  }

//Crear
  async crearUno(data: IMunicipio) {
    try {
      const { ...objectData } = data;
      const result = await Municipio.create(objectData);
      return result;
    } catch (error) {
      throw error;
    }
  }

 //Editar  
  async editarUno(id: number, data: IMunicipio) {
    try {
      const { descripcion_Municipio, id_Estado } = data;
      const result = await Municipio.update(
        {
          descripcion_Municipio,
          id_Estado,
        },
        {
          where: 
          {
            id_Municipio: id,
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
      const result = await Municipio.update(
        {
          id_Estado: 2,
        },
        {
          where: 
          {
            id_Municipio: id,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}