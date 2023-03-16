import { sign } from "jsonwebtoken";
import moment from "moment";
import moments from "moment-timezone";

export default abstract class Encryption {
  public static generateToken(payload: any) {
    return sign(payload, process.env.SECRET_KEY as string, {
      algorithm: "HS256",
      expiresIn: "1d",
    });
  }
}
