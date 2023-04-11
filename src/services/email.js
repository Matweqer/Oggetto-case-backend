import { createTransport } from 'nodemailer';
import templates from '../config/emailTemplates';

const address = process.env.MAIL_USER;
const smtp = createTransport({
  host: 'outlook.office365.com',
  port: 587,
  secure: false,
  auth: { user: address, pass: process.env.MAIL_PASS },
});

export function sendMail(to, type, ...arg) {
  const replacement = templates[type];
  const mail = {
    from: { name: 'Oggetto', address },
    to,
    subject: replacement.subject,
    generateTextFromHTML: true,
    html: replacement.template(...arg),
  };

  console.log(mail);

  // Закомментировали, чтобы не дудосить левые почты
  // smtp.sendMail(mail);
}
