import "./Contact.css";
import React from "react";

function Contact() {
  return (
    <div className="d-flex justify-content-center" id="contact-us">
      <div className="justify-content-center mt-3 py-5" id="contact-container">
        <div className="d-flex flex-column flex-lg-row align-items-center">
          <h1 className="mx-5 mb-3 mb-lg-0">Contáctanos</h1>
          <form action="https://formspree.io/f/xqkvozor" method="POST">
            <section className="d-flex flex-column flex-md-row">
              <div className="mb-3 me-md-4">
                <label htmlFor="inputName" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  name="name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  name="mail"
                  required
                />
              </div>
            </section>
            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">
                Mensaje
              </label>
              <textarea
                className="form-control"
                id="mensaje"
                required
                name="mensaje"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
