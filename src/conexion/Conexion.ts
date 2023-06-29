import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const conexion = new Sequelize({
  dialect: "mssql",
  dialectOptions: {
    options: {
      encrypt: false,
      enableArithAbort: true,
      trustedConnection: true, // Use Windows Authentication,
      domain: process.env.DOMAIN, // el dominio de tu compu
      userName: process.env.USERNAME, // tu usuario de compu
    },
  },

  
  host: "localhost",
  database: "USADBASE",
  username: process.env.USERNAME2, // el usuario de sql
  password: process.env.PASSWORD, // contraseña del usuario de sql
});

// testing connection
conexion
  .authenticate()
  .then(() => console.log("Conexion Exitosa"))
  .catch((err) =>
    console.error("Imposble conectarse con la base de datos", err)
  );
