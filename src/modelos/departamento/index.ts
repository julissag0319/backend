import { Model, DataTypes } from "sequelize";
import { conexion } from "../../conexion/Conexion";
import { Estado } from "../estado";

export class Departamento extends Model {
  id_Departamento!: number;
  id_Estado!: number;
  descripcion_Departamento!: string;
}

Departamento.init(
  {
    id_Departamento: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion_Departamento: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "Departamento",
    sequelize: conexion,
    timestamps: false,
  }
);

Departamento.hasOne(Estado, {
  foreignKey: "id_Estado",
});

Estado.belongsTo(Departamento, {
  foreignKey: "id_Estado",
});