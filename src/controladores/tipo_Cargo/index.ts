import { Tipo_Cargo } from "../../modelos/tipo_Cargo";
import { ITipo_Cargo } from "../../modelos/tipo_Cargo/interfaz";

//CLASE 
export class Controlador_Tipo_Cargo {

//Listar Todos 
  async tomarTodoTipo_Cargo() {
    return await Tipo_Cargo.findAll({
      where: {
        id_Estado: 1,
      },
    });
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