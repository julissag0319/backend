import { Model, DataTypes } from "sequelize";
import { conexion } from "../../conexion/Conexion";

export class Estado extends Model {
  id_Estado!: number;
  descripcion_Estado!: string;
}

Estado.init(
  {
    id_Estado: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion_Estado: {
      type: DataTypes.ENUM("Activo", "Inactivo"),
      defaultValue: "Activo",
      allowNull: false,
    },
  },
  {
    tableName: "Estado",
    sequelize: conexion,
    timestamps: false,
  }
);