import nodemailer from 'nodemailer';
import Secrets from "@/../private/secrets.json"

export default class MailSender{
    static transporter;

    constructor(){
        // Create a transporter object
        transporter = nodemailer.createTransport({
            // host: 'live.smtp.mailtrap.io',
            // port: 587,
            // secure: false, // use SSL
            // auth: {
            //   user: '1a2b3c4d5e6f7g',
            //   pass: '1a2b3c4d5e6f7g',
            // }
            host: Secrets.MailSender.host,
            port: Secrets.MailSender.port,
            secure: false, // use SSL
            auth: {
            user: Secrets.MailSender.user,
            pass: Secrets.MailSender.pass,
            }
        });
    }

    static sendMail = function (subject, text, to) {
        let resultado = {
            detalle: '',
            exitoso: false,
        }

        // Configure the mailoptions object
        const mailOptions = {
            from: Secrets.MailSender.mail,
            to: to,
            subject: subject,
            text: text
        };        

        // Send the email
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                resultado.detalle = 'Error:', error;
            } else {
                resultado.exitoso = true;
                resultado.detalle = 'Email sent:', info.response; 
            }
        });
    }

}

