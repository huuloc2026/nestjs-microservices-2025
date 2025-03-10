import { Request } from "express";
import { TokenPayload } from "../interface/interface";

declare module "express" {
  export interface Request {
    user?: TokenPayload;
  }
}
