import "./Contact.css"
import React from 'react'

function Contact() {
  return (
    <div id='contact-us'>
        <div className='container mt-3 py-5' id='contact-container'>
          <h1>Contactanos</h1>
            <form   action="https://formspree.io/f/xqkvozor" method="POST">
            <div class="mb-3">
                  <label for="inputName" class="form-label">Nombre</label>
                  <input type="text" class="form-control" id="inputName" name="name" required/>
              </div>
              <div class="mb-3">
                  <label for="inputEmail" class="form-label">email</label>
                  <input type="email" class="form-control" id="inputEmail" name="mail" required/>
              </div>
              <div class="mb-3">
                  <label for="mensaje" class="form-label">Mensaje</label>
                  <textarea class="form-control" id="mensaje" required name="mensaje"/>
              </div>
                <button type="submit" class="btn btn-primary">Enviar</button>
              </form>
        </div>
    </div>
  )
}

export default Contact
