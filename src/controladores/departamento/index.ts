
import { Departamento } from "../../modelos/departamento";
import { IDepartamento } from "../../modelos/departamento/interfaz";
import { conexion } from "@src/conexion/Conexion";

//CLASE 
export class Controlador_Departamento {

//Listar Todos los Departamentos
  async tomarTodoDepartamento() {
    //relacion (d.*) para traer td los campos del depart la p es la variable de Persona 
    const [resultado] = await conexion.query("Select d.*, (Select count (*) From Persona p Where p.id_Departamento = d.id_Departamento ) Persona From Departamento As d where d.id_Estado = 1")
    return resultado 
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