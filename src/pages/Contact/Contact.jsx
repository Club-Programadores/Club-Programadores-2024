import "./Contact.css";
import React from "react";

function Contact() {
  return (
    <div class="d-flex justify-content-center" id="contact-us">
      <div class=" justify-content-center mt-3 py-5" id="contact-container">
        <div class="d-flex flex-column flex-lg-row align-items-center">
          <h1 class="mx-5 mb-3 mb-lg-0">Contáctanos</h1>
          <form action="https://formspree.io/f/xqkvozor" method="POST">
            <section class="d-flex flex-column flex-md-row">
              <div class="mb-3 me-md-4">
                <label for="inputName" class="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputName"
                  name="name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="inputEmail" class="form-label">
                  Email
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="inputEmail"
                  name="mail"
                  required
                />
              </div>
            </section>
            <div class="mb-3">
              <label for="mensaje" class="form-label">
                Mensaje
              </label>
              <textarea
                class="form-control"
                id="mensaje"
                required
                name="mensaje"
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
