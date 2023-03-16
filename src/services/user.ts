import { Request, Response, NextFunction } from "express";
import Encryption from "../helpers/jwt";
const { generateToken } = Encryption;
import EmailService from "../helpers/email";
const { sendEmail } = EmailService;
import path from "path";
import fs from "fs";

export default class Service {
  public static async RegisterEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userName, isVerified, email } = req.body;
      const { id } = req.params;

      if (isVerified === "true" || isVerified)
        throw { name: "Already verified" };

      const payload = {
        id,
        userName,
      };

      const token = generateToken(payload);

      const url = `${process.env.PUBLIC}/user/verify?token=${token}`;

      const emailSend = path.join(__dirname, "../../emails/activateUser.html");

      fs.readFile(
        emailSend,
        "utf-8",
        (err: NodeJS.ErrnoException | null, data: string): void => {
          data = data.replace("[TOKEN]", url).replace("[USERNAME]", userName);

          sendEmail(email, "Verification Account", data, next)
            .then(() => {
              res.status(200).json({
                message: "success",
              });
            })
            .catch((err) => next(err));
        }
      );
    } catch (err) {
      next(err);
    }
  }
}
