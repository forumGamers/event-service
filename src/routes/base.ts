import IRoutes from "../interfaces/routes";
import { Router } from "express";

export default abstract class BaseRoutes implements IRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  abstract routes(): void;
}
