import { Tipo_Usuario } from "../../modelos/tipo_Usuario";
import { ITipo_Usuario } from "../../modelos/tipo_Usuario/interfaz";

//CLASE 
export class Controlador_Tipo_Usuario {

//Listar Todos los Departamentos de los Empleados
  async tomarTodoTipo_Usuario() {
    return await Tipo_Usuario.findAll({
      where: {
        id_Estado: 1,
      },
    });
  }

//Listar o Tomar solo un Tipo_Usuario
  async tomarUnTipo_Usuario(id: number) {
    return await Tipo_Usuario.findByPk(id);
  }

//Crear 
  async crearUno(data: ITipo_Usuario) {
    try {
      const { ...objectData } = data;
      const result = await Tipo_Usuario.create(objectData);
      return result;
    } catch (error) {
      throw error;
    }
  }

 //Editar
  async editarUno(id: number, data: ITipo_Usuario) {
    try {
      const { descripcion_Tipo_Usuario} = data;
      const result = await Tipo_Usuario.update(
        {
          descripcion_Tipo_Usuario,
        },
        {
          where: 
          {
            id_Tipo_Usuario: id,
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
      const result = await Tipo_Usuario.update(
        {
          id_Estado: 2,
        },
        {
          where: 
          {
            id_Tipo_Usuario: id,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}