import { Persona } from "../../modelos/persona";
import { IPersona } from "../../modelos/persona/interfaz";

//CLASE 
export class Controlador_Persona {

//Listar Todos los Personas de los Empleados
  async tomarTodoPersona() {
    return await Persona.findAll({
      where: {
        id_Estado: 1,
      },
    });
  }

//Listar o Tomar solo un Persona de los Empleados
  async tomarUnPersona(id: number) {
    return await Persona.findByPk(id);
  }

//Crear un Persona de los Empleados
  async crearUno(data: IPersona) {
    try {
      const { ...objectData } = data;
      const result = await Persona.create(objectData);
      return result;
    } catch (error) {
      throw error;
    }
  }

 //Editar un Persona de los Empleados 
  async editarUno(id: number, data: IPersona) {
    try {
      const { nombre_Persona,apellido_Persona,identidad_Persona,telefono_Persona,correo_Persona,id_Departamento,id_Tipo_Cargo,id_Estado } = data;
      const result = await Persona.update(
        {
            nombre_Persona,
            apellido_Persona,
            identidad_Persona,
            telefono_Persona,
            correo_Persona,
            id_Departamento,
            id_Tipo_Cargo,
            id_Estado 
        },
        {
          where: 
          {
            id_Persona: id,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

//Eliminar un Persona
  async eliminarUno(id: number) {
    try {
      const result = await Persona.update(
        {
          id_Estado: 2,
        },
        {
          where: 
          {
            id_Persona: id,
          },
        }
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}