import { Request, Response, NextFunction } from "express";
import jwt from "../helpers/jwt";
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
      const { UUID } = req.params;

      if (isVerified === "true" || isVerified)
        throw { name: "Already verified" };

      const token = jwt.generateToken({ UUID });

      const url = `${process.env.PUBLIC}/user/verify?token=${token}`;

      const emailSend = path.join(__dirname, "../../emails/activateUser.html");

      fs.readFile(
        emailSend,
        "utf-8",
        (err: NodeJS.ErrnoException | null, data: string): void => {
          data = data
            .replace("[TOKEN]", url)
            .replace("[USERNAME]", userName)
            .replace("[PUBLIC]", process.env.PUBLIC as string);

          sendEmail(email, "Verification Account", data, next)
            .then(() => {
              res.status(200).json({
                message: "success",
              });
            })
            .catch((err) => {
              next(err);
            });
        }
      );
    } catch (err) {
      next(err);
    }
  }

  public static async ResetPasswordEmail(
    req: Request | any,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, userName } = req.user;

      const { access_token } = req.headers;

      const url = `${process.env.PUBLIC}/change-password?token=${access_token}`;

      const emailSend = path.join(__dirname, "");

      fs.readFile(
        emailSend,
        "utf-8",
        (err: NodeJS.ErrnoException | null, data: string): void => {
          data = data.replace("[URL]", url).replace("[USERNAME]", userName);

          sendEmail(email, "Change-Password", data, next)
            .then(() => {
              res.status(200).json({ message: "success" });
            })
            .catch((err) => {
              next(err);
            });
        }
      );
    } catch (err) {
      next(err);
    }
  }
}
