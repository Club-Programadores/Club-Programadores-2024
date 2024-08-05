import React, { useState } from "react";
import miembrosMaster from "../../../assets/miembros.json";
import InteresesDropdown from "../FiltersDropdown/InteresesDropdown/InteresesDropdownFile"
import SkillsDropdown from "../FiltersDropdown/SkillsDropdown/SkillsDropdownFile"

const SignUpBModal = ({ onClose, handleBack }) => {
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

  // const handleCheckboxChange = (e, category) => {
  //   const { checked, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [category]: checked
  //       ? [...prevData[category], value]
  //       : prevData[category].filter((item) => item !== value),
  //   }));
  // };

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
      <div className="modal-dialog modal-dialog-centered form-container modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Registrate</h5>
            <button
              onClick={onClose}
              type="button"
              className="btn-close cursor-pointer"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
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
                  <label htmlFor="bio">Información adicional</label>
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
                <h3>Tus aptitudes</h3>
                <div className="form-group mb-3">
                  <label htmlFor="intereses">Perfil</label>
                  <InteresesDropdown placeholder="seleccionar..."/>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="intereses">Lenguajes</label>
                  <SkillsDropdown placeholder="seleccionar..."/>
                </div>
                <div className="mb-3">
                  <label>Foto de perfil</label>
                  <input className="form-control" type="file" id="formFile" />
                </div>
              </section>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button
                onClick={handleBack}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Atrás
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

export default SignUpBModal;
