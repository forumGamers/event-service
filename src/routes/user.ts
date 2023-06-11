import { authentication } from "../middlewares/authentication";
import Service from "../services/user";
import BaseRoutes from "./base";

class UserRoutes extends BaseRoutes {
  public routes(): void {
    this.router
      .post("/register/:id", Service.RegisterEmail)
      .get("/reset-password", authentication, Service.ResetPasswordEmail);
  }
}

export default new UserRoutes().router;
