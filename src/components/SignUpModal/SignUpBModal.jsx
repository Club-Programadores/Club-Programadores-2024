import React, { useState } from "react";
import miembrosMaster from "../../../assets/miembros.json";
import Select from "react-select";

const interestsOptions = [
  { label: "WebDev", value: "webdev" },
  { label: "FrontEnd", value: "frontend" },
  { label: "BackEnd", value: "backend" },
  { label: "GameDev", value: "gamedev" },
  { label: "Teaching", value: "teaching" },
  { label: "UI/UX", value: "ui/ux" },
  { label: "Quality Assurance", value: "quality assurance" },
  { label: "Testing", value: "testing" },
  { label: "Networking", value: "networking" },
  {
    label: "Functional Oriented Programming",
    value: "functional oriented programming",
  },
  {
    label: "Object Oriented Programming",
    value: "object oriented programming",
  },
  {
    label: "Arquitectura de Información",
    value: "arquitectura de información",
  },
  { label: "Knowledge Graphs", value: "knowledge graphs" },
  { label: "3D Art", value: "3d art" },
  { label: "2D Art", value: "2d art" },
  { label: "Pixel Art", value: "pixel art" },
];

const skillsOptions = [
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "JavaScript", value: "javascript" },
  { label: "Python", value: "python" },
  { label: "php", value: "php" },
  { label: "Java", value: "java" },
  { label: "C++", value: "c++" },
  { label: "C#", value: "c#" },
  { label: "React", value: "react" },
  { label: "MySQL", value: "mysql" },
  { label: "PostgreSQL", value: "postgresql" },
  { label: "Sparql", value: "sparql" },
];

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
                  <InteresesDropdown />
                  {/* <textarea
                    className="form-control"
                    id="intereses"
                    name="intereses"
                    placeholder="Backend;GameDev;WebDev..."
                    value={formData.intereses}
                    onChange={handleInputChange}
                  /> */}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="intereses">Lenguajes</label>
                  <SkillsDropdown />
                  {/* {[
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
                  ))} */}
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

function SkillsDropdown(props) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOnChange = (e) => {
    setSelectedOption(e);
    // props.setSkillsFilter(e);
  };

  return (
    <Select
      defaultValue={selectedOption}
      onChange={handleOnChange}
      options={skillsOptions}
      isMulti={true}
      placeholder="Seleccionar..."
    />
  );
}

function InteresesDropdown(props) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOnChange = (e) => {
    setSelectedOption(e);
    // props.setInteresesFilter(e);
  };

  return (
    <Select
      defaultValue={selectedOption}
      onChange={handleOnChange}
      options={interestsOptions}
      isMulti={true}
      placeholder="Seleccionar..."
    />
  );
}

export default SignUpBModal;
