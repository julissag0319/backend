import { Model, DataTypes } from "sequelize";
import { conexion } from "../../conexion/Conexion";
import { Estado } from "../estado";
import {Persona} from "../persona";
import { Tipo_Usuario } from "../tipo_Usuario";


export class Usuario extends Model {
  id_Usuario!: number;
  id_Persona!: number;
  nombre_Usuario!: string;
  contrasena_Usuario!: string;
  codigo_Recuperacion!: string;
  id_Tipo_Usuario!: number;
  id_Estado!: number;
}

Usuario.init(
  {
    id_Usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_Persona: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Persona,
        key: "id_Persona",
      },
    },
    
    nombre_Usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contrasena_Usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    codigo_Recuperacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    id_Tipo_Usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Tipo_Usuario,
          key: "id_Tipo_Usuario",
        },
      },
    id_Estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Estado,
        key: "id_Estado",
      },
    },
  },
  {
    tableName: "Usuario",
    sequelize: conexion,
    timestamps: false,
  }
);

Usuario.hasOne(Persona,{
  foreignKey:"id_Persona",
});

Persona.belongsTo(Usuario,{
  foreignKey:"id_Persona",
});

Usuario.hasOne(Tipo_Usuario,{
  foreignKey:"id_Tipo_Usuario",
});

Tipo_Usuario.belongsTo(Usuario,{
  foreignKey:"id_Tipo_Usuario",
});

Usuario.hasOne(Estado, {
  foreignKey: "id_Estado",
});

Estado.belongsTo(Usuario, {
  foreignKey: "id_Estado",
});