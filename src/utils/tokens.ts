import { Usuario } from "@src/modelos/usuario";
import { sign, verify } from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "";
if (secret.length == 0) {
  throw new Error("JWT_SECRET esta vacio");
}
export const generateToken = (user: Usuario) => {
  return sign({ username: user.nombre_Usuario }, secret, {
    expiresIn: "10m",
  });
};

export const checkToken = (token: string) => {
  return verify(token, secret);
};
