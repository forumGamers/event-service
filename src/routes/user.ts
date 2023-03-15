import BaseRoutes from "./base";

class UserRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post("/register");
  }
}

export default new UserRoutes().router;
