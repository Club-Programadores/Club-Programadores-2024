import emailjs from '@emailjs/browser';
import Secrets from "@/../private/secrets.json"

export default class MailSender{

    static receiveTextMail = function (fromName, fromMail, message) {
        let resultado = {
            detalle: '',
            exitoso: false,
        }

        const templateParams = {
            user_name: fromName,
            user_email: fromMail,
            message: message
        }  

        const emailJSOptions = {
            publicKey: Secrets.EmailJS.publicKey
        }

        // receive the email
        emailjs.send(Secrets.EmailJS.serviceId, Secrets.EmailJS.templateId, templateParams, emailJSOptions).then(
            (response) => {
                resultado.exitoso = true;
                resultado.detalle= response.status + response.text;
            },
            (error) => {
                resultado.detalle= error;
            },
          );

        return resultado;
    }

    static asyncReceiveTextMail = async function (fromName, fromMail, message) {
        let resultado = {
            detalle: '',
            exitoso: false,
        }

        const templateParams = {
            user_name: fromName,
            user_email: fromMail,
            message: message
        }  

        const emailJSOptions = {
            publicKey: Secrets.EmailJS.publicKey
        }

        // receive the email
        await emailjs.send(Secrets.EmailJS.serviceId, Secrets.EmailJS.templateId, templateParams, emailJSOptions).then(
            (response) => {
                resultado.exitoso = true;
                resultado.detalle= response.status + response.text;
            },
            (error) => {
                resultado.detalle= error;
            },
            );

        return resultado;
    }

}

