/*Nodemailer is used for sending emails in Node.js applications.Nodemailer is primarily used for sending emails programmatically from your Node.js application. It doesn't handle receiving emails.*/
//Nodemailer is third party laibery of node.js

//we used mailtrap side for send email

import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //make token by using encrupt userId we also used jwt and so more etc..
    const hashToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(
        userId,

        { verifyToken: hashToken, verifyTokenExpire: Date.now() + 3600000 }
      );
    } else if (emailType == "RESET") {
      await User.findByIdAndUpdate(
        userId,

        {
          forgetPasswordToken: hashToken,
          forgetPasswordTokenExpiry: Date.now() + 3600000,
        }
      );
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "dfdd7136548225",
        pass: "5669198ef1ab28",
      },
    });

    const mailOptions = {
      from: "ayush@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType == "VERIFY" ? "Verify your email" : "Reset your password", // Subject line

      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashToken}
      </p>`, // html body
    };

    // send mail with defined transport object
    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
