import { Departamento } from "../../modelos/departamento";
import { IDepartamento } from "../../modelos/departamento/interfaz";

//CLASE 
export class Controlador_Departamento {

//Listar Todos los Departamentos
  async tomarTodoDepartamento() {
    return await Departamento.findAll({
      where: {
        id_Estado: 1,
      },
    });
  }

//Listar o Tomar solo uno
  async tomarUnDepartamento(id: number) {
    return await Departamento.findByPk(id);
  }

//Crear un Departamento
  async crearUno(data: IDepartamento) {
    try {
      const { ...objectData } = data;
      const result = await Departamento.create(objectData);
      return result;
    } catch (error) {
      throw error;
    }
  }

 //Editar un Departamento
  async editarUno(id: number, data: IDepartamento) {
    try {
      const { descripcion_Departamento, id_Estado } = data;
      const result = await Departamento.update(
        {
          descripcion_Departamento,
          id_Estado,
        },
        {
          where: 
          {
            id_Departamento: id,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

//Eliminar un Departamento
  async eliminarUno(id: number) {
    try {
      const result = await Departamento.update(
        {
          id_Estado: 2,
        },
        {
          where: 
          {
            id_Departamento: id,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}