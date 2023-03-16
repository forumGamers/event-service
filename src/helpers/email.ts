import nodemailer, { SendMailOptions, SentMessageInfo } from "nodemailer";
import { NextFunction } from "express";

export default abstract class EmailService {
  public static async sendEmail(
    destination: string,
    subject: string,
    html: string,
    next: NextFunction
  ): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
        debug: true,
      });

      const email: SendMailOptions = {
        from: process.env.EMAIL,
        to: destination,
        html,
        subject,
      };

      transporter
        .verify()
        .then(() => {
          transporter.sendMail(
            email,
            (err: Error | null, response: SentMessageInfo) => {
              if (err) throw err;
              console.log("success");
            }
          );
        })
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  }
}
