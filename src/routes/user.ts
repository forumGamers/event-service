import Service from "../services/user";
import BaseRoutes from "./base";

class UserRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/register/:id", Service.RegisterEmail);
  }
}

export default new UserRoutes().router;
