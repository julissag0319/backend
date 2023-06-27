import { Model, DataTypes } from "sequelize";
import { conexion } from "../../conexion/Conexion";
import { Estado } from "../estado";

export class Tipo_Cargo extends Model {
  id_Tipo_Cargo!: number;
  id_Estado!: number;
  descripcion_Tipo_Cargo!: string;
}

Tipo_Cargo.init(
  {
    id_Tipo_Cargo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion_Tipo_Cargo: {
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
    tableName: "Tipo_Cargo",
    sequelize: conexion,
    timestamps: false,
  }
);

Tipo_Cargo.hasOne(Estado, {
  foreignKey: "id_Estado",
});

Estado.belongsTo(Tipo_Cargo, {
  foreignKey: "id_Estado",
});