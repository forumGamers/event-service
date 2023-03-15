import BaseRoutes from "./base";
import userRoutes from "./user";

class Router extends BaseRoutes {
  public routes(): void {
    this.router.use("/user", userRoutes);
  }
}

export default new Router().router;
