const nodemailer=require("nodemailer")
const config=require("config")

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: config.get("smtp_host"),
      port: config.get("smtp_port"),
      secure: false,
      auth: {
        user: config.get("smtp_user"),
        pass: config.get("smtp_password"),
      },
    });
  }
  async sendOtpMail(toEmail, otp) {
    await this.transporter.sendMail({
      from: config.get("smtp_user"),
      to: toEmail,
      subject: "Sayohat akkauntini faollashtirish",
      text: `Sayohat akkauntini faollashtirish uchun quyidagi kodni kiriting: ${otp}`,
      html: `
        <div>
            <h3>Akkauntni faollashtirish uchun quyidagi kodni kiriting:</h3>
            <h2 style="color: blue">${otp}</h2>
        </div>
        `,
    });
  }
}


module.exports=new MailService()