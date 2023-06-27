import { Model, DataTypes } from "sequelize";
import { conexion } from "../../conexion/Conexion";
import { Departamento } from "../departamento";
import { Municipio } from "../municipio";
import { Persona } from "../persona";
import { Red } from "../red";
import { Estado } from "../estado";

export class Escuela extends Model {
  id_Escuela!: number;
  id_Departamento!: number;
  id_Municipio!: number;
  descripcion_Escuela!: string;
  id_Persona!: number;
  id_Red!: number;
  id_Estado!: number;
}

Escuela.init(
  {
    id_Escuela: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    id_Departamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Departamento,
        key: "id_Departamento",
      },
    },
    id_Municipio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Municipio,
        key: "id_Municipio",
      },
    },
    descripcion_Escuela: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    id_Persona: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Persona,
        key: "id_Persona",
      },
    },

    id_Red: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Red,
        key: "id_Red",
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
    tableName: "Escuela",
    sequelize: conexion,
    timestamps: false,
  }
);

////relacion

Escuela.hasOne(Departamento, {
  foreignKey: "id_Departamento",
});

Departamento.belongsTo(Escuela, {
  foreignKey: "id_Departamento",
});
//////////////
Escuela.hasOne(Municipio, {
  foreignKey: "id_Municipio",
});

Municipio.belongsTo(Escuela, {
  foreignKey: "id_Municipio",
});


//////////////
Escuela.hasOne(Persona, {
  foreignKey: "id_Persona",
});

Persona.belongsTo(Escuela, {
  foreignKey: "id_Persona",
});

//////////////
Escuela.hasOne(Red, {
  foreignKey: "id_Red",
});

Red.belongsTo(Escuela, {
  foreignKey: "id_Red",
});
////relacion

Escuela.hasOne(Estado, {
  foreignKey: "id_Estado",
});

Estado.belongsTo(Escuela, {
  foreignKey: "id_Estado",
});