import { checkToken } from "@src/utils/tokens";
import { Handler } from "express";
import { JwtPayload } from "jsonwebtoken";

export const authMiddleware: Handler = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).json({ error: "Header de authorization no esta presente" });
    return;
  }
  if (!authorization.startsWith("Bearer ")) {
    res.status(401).json({
      error: 'El formato de el header de authorization debe ser "Bearer token"',
    });
    return;
  }
  const token = authorization.substring(7);
  let payload: JwtPayload | string | undefined;
  try {
    payload = checkToken(token);
  } catch (error) {
    res.status(401).json({ error });
    return;
  }
  if (!payload) {
    res.status(401).json({ error: "Token invalido" });
    return;
  }
  next();
  return;
};
