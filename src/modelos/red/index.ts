import { Model, DataTypes } from "sequelize";
import { conexion } from "../../conexion/Conexion";
import { Estado } from "../estado";

export class Red extends Model {
  id_Red!: number;
  codigo_Red!: string;
  descripcion_Red!: string;
  id_Estado!: number;
}

Red.init(
  {
    id_Red: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    codigo_Red: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion_Red: {
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
    tableName: "Red",
    sequelize: conexion,
    timestamps: false,
  }
);

Red.hasOne(Estado, {
  foreignKey: "id_Estado",
});

Estado.belongsTo(Red, {
  foreignKey: "id_Estado",
});