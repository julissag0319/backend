import { Model, DataTypes } from "sequelize";
import { conexion } from "../../conexion/Conexion";
import { Estado } from "../estado";
import { Departamento } from "../departamento";
import { Tipo_Cargo } from "../tipo_Cargo";

export class Persona extends Model {
  id_Persona!: number;
  nombre_Persona!: string;
  apellido_Persona!: string;
  identidad_Persona!: string;
  telefono_Persona!: string;
  correo_Persona!: string;
  id_Departamento!: number;
  id_Tipo_Cargo!: number;
  id_Estado!: number;
}

Persona.init(
  {
    id_Persona: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_Persona: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido_Persona: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    identidad_Persona: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    telefono_Persona: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    correo_Persona: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_Departamento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Departamento,
          key: "id_Departamento",
        },
      },

    id_Tipo_Cargo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tipo_Cargo,
        key: "id_Tipo_Cargo",
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
    tableName: "Persona",
    sequelize: conexion,
    timestamps: false,
  }
);


Persona.hasOne(Departamento, {
  foreignKey: "id_Departamento",
});

Departamento.belongsTo(Persona, {
  foreignKey: "id_Departamento",
});


Persona.hasOne(Tipo_Cargo, {
  foreignKey: "id_Tipo_Cargo",
});

Tipo_Cargo.belongsTo(Persona, {
  foreignKey: "id_Tipo_Cargo",
});


Persona.hasOne(Estado, {
  foreignKey: "id_Estado",
});

Estado.belongsTo(Persona, {
  foreignKey: "id_Estado",
});



