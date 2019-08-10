import { Request, Response } from "express";
import { NextFunction } from "connect";

export interface CustomRequest extends Request {
  user?: string;
}

export interface CustomResponse extends Response {}

export type CustomRequestHandler = (
  req: CustomRequest,
  res: CustomResponse,
  next: NextFunction
) => any;
