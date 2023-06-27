import { Model, DataTypes } from "sequelize";
import { conexion } from "../../conexion/Conexion";
import { Estado } from "../estado";

export class Municipio extends Model {
  id_Municipio!: number;
  id_Estado!: number;
  descripcion_Municipio!: string;
}

Municipio.init(
  {
    id_Municipio: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion_Municipio: {
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
    tableName: "Municipio",
    sequelize: conexion,
    timestamps: false,
  }
);

Municipio.hasOne(Estado, {
  foreignKey: "id_Estado",
});

Estado.belongsTo(Municipio, {
  foreignKey: "id_Estado",
});