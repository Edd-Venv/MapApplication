const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const pug = require("pug");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.username;
    this.url = url;
    this.from = "Edwin's Support Team <eushibantusupprt@gmail.com>";
  }

  newTransport() {
    return nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: "apikey",
        pass:
          "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",
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    this.newTransport();
    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordReset() {
    await this.send("passwordReset", "Password Reset, Reset Within 10mins!");
  }
};
