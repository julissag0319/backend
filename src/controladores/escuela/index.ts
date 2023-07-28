import { Escuela } from "../../modelos/escuela";
import { IEscuela } from "../../modelos/escuela/interfaz";
//import { conexion } from "@src/conexion/Conexion";
import { conexion } from "@src/conexion/Conexion";
//CLASE 
export class Controlador_Escuela {


  //Listar Todos los Departamentos
  async tomarTodoEscuela() {


    const [resultado] = await conexion.query(`select id_Escuela,
    d.descripcion_Departamento 'id_Departamento',
    m.descripcion_Municipio 'id_Municipio',
    e.descripcion_Escuela,
    CONCAT(p.nombre_Persona,' ',p.apellido_Persona) 'id_Persona',
    r.descripcion_Red 'id_Red',
    es.descripcion_Estado 'id_Estado'
    from Escuela e
    join Departamento d on d.id_Departamento = e.id_Departamento
    join Municipio m on m.id_Municipio = e.Id_Municipio
    join Persona p on p.id_Persona = e.id_Persona
    join Red r on r.id_Red = e.id_Red
    join Estado es on es.id_Estado = e.id_Estado`);
      return resultado;

/*
    return await Escuela.findAll({
      where: {
        id_Estado: 1,
      },
    }); */
  }

  async ListarEscuelas() {
    //relacion (d.*) para traer td los campos del depart la p es la variable de Persona 
    const [resultado] = await conexion.query(`select id_Escuela,
  d.descripcion_Departamento 'id_Departamento',
  m.descripcion_Municipio 'id_Municipio',
  e.descripcion_Escuela,
  CONCAT(p.nombre_Persona,' ',p.apellido_Persona) 'id_Persona',
  r.descripcion_Red 'id_Red',
  es.descripcion_Estado 'id_Estado'
  from Escuela e
  join Departamento d on d.id_Departamento = e.id_Departamento
  join Municipio m on m.id_Municipio = e.Id_Municipio
  join Persona p on p.id_Persona = e.id_Persona
  join Red r on r.id_Red = e.id_Red
  join Estado es on es.id_Estado = e.id_Estado`);
    return resultado;
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
      const { id_Escuela, id_Departamento, id_Municipio, descripcion_Escuela, id_Persona, id_Red, id_Estado } = data;
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