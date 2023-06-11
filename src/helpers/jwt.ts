import { JwtPayload, sign, verify } from "jsonwebtoken";

export default abstract class Encryption {
  public static generateToken(payload: any) {
    return sign(payload, process.env.SECRET as string, {
      algorithm: "HS256",
      expiresIn: "1d",
    });
  }

  public static verifyToken(token: string): JwtPayload {
    return verify(token, process.env.SECRET as string) as JwtPayload;
  }
}
