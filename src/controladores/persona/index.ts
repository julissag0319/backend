import { Persona } from "../../modelos/persona";
import { IPersona } from "../../modelos/persona/interfaz";
import { conexion } from "@src/conexion/Conexion";
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

  async CantidadSupervisores() {
    //relacion (d.*) para traer td los campos del depart la p es la variable de Persona 
    const [resultado] = await conexion.query(`select 
    CONCAT(p.nombre_Persona,' ',p.apellido_Persona) 'Supervisor',
    count(e.id_Escuela) 'Cantidad'
    from Escuela e
    full join Persona p on p.id_Persona = e.id_Persona
    join Tipo_Cargo c on c.id_Tipo_Cargo = p.id_Tipo_Cargo
    group by p.nombre_Persona,p.apellido_Persona`);
      return resultado;
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