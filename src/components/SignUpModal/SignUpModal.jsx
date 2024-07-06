import "./SignUpModal.css";
import React, { useState } from "react";
import miembrosMaster from "../../../assets/miembros.json";

const SignUpModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    bio: "",
    skills: [],
    intereses: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e, category) => {
    const { checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [category]: checked
        ? [...prevData[category], value]
        : prevData[category].filter((item) => item !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoMiembro = {
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      email: formData.email,
      bio: formData.bio,
      intereses: formData.intereses.split(";"),
      skills: formData.skills,
    };
    console.log(miembrosMaster);
    console.log(nuevoMiembro);
    miembrosMaster.miembros.push(nuevoMiembro);
    onClose();
  };

  return (
    <div className="modal modal-container d-flex" id="sign-up-modal">
      <div className="modal-dialog modal-dialog-centered form-container w-50 modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Registrate</h5>
            <button
              onClick={onClose}
              type="button"
              className="btn-close cursor-pointer"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body d-flex flex-column flex-lg-row gap-4">
              <section className="data-container w-100">
                <div className="mb-3">
                  <h3>Tus datos</h3>
                  <label htmlFor="nombre">Nombre/s</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="apellido">Apellido/s</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    className="form-control"
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                  />
                </div>
              </section>

              <section className="skills-interests-container w-100">
                <div className="form-group">
                  <h3>Tus Skills</h3>
                  {[
                    "HTML",
                    "JavaScript",
                    "React",
                    "NodeJS",
                    "Blender",
                    "Godot",
                    "Unity",
                    "SPARQL",
                  ].map((skill) => (
                    <div key={skill} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={skill.toLowerCase()}
                        value={skill}
                        checked={formData.skills.includes(skill)}
                        onChange={(e) => handleCheckboxChange(e, "skills")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={skill.toLowerCase()}
                      >
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="form-group">
                  <h3>Tus Intereses</h3>
                  <label htmlFor="intereses">¿Qué te copa?</label>
                  <textarea
                    className="form-control"
                    id="intereses"
                    name="intereses"
                    placeholder="Backend;GameDev;WebDev..."
                    value={formData.intereses}
                    onChange={handleInputChange}
                  />
                </div>
              </section>
            </div>
            <div className="modal-footer">
              <button
                onClick={onClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
              <button type="submit" className="btn btn-success">
                ¡Sumarme!
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
