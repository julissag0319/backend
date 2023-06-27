import { Model, DataTypes } from "sequelize";
import { conexion } from "../../conexion/Conexion";
import { Estado } from "../estado";

export class Tipo_Usuario	extends Model {
  id_Tipo_Usuario!: number;
  id_Estado!: number;
  descripcion_Tipo_Usuario!: string;
}

Tipo_Usuario.init(
  {
    id_Tipo_Usuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion_Tipo_Usuario: {
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
    tableName: "Tipo_Usuario",
    sequelize: conexion,
    timestamps: false,
  }
);

Tipo_Usuario.hasOne(Estado, {
  foreignKey: "id_Estado",
});

Estado.belongsTo(Tipo_Usuario, {
  foreignKey: "id_Estado",
});