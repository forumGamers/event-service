import { JwtPayload, Secret, sign, SignOptions, verify } from "jsonwebtoken";

export interface jwtValue extends JwtPayload {
  UUID: string;
  loggedAs: "User" | "Admin" | "Seller";
}

export default new (class JWT {
  private secret: Secret;

  constructor() {
    this.secret = process.env.SECRET as Secret;
  }

  public generateToken(data: { UUID: string }, options?: SignOptions) {
    return sign(data, this.secret, options);
  }

  public verifyToken(token: string) {
    return verify(token, this.secret) as jwtValue;
  }
})();
