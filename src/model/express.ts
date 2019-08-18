import { Request, Response } from "express";
import { NextFunction } from "connect";
import * as dbModel from "../db/model_generated";

export interface CustomRequest extends Request {
  user?: dbModel.users;
}

export interface CustomResponse extends Response {}

export type CustomRequestHandler = (
  req: CustomRequest,
  res: CustomResponse,
  next: NextFunction
) => any;
