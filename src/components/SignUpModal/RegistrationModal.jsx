import React, { useState } from "react";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchema } from "../../validationSchema";
import { profilesOptions } from "../FiltersDropdown/PerfilesDropdown/PerfilesDropdownFile";
import { technologyOptions } from "../FiltersDropdown/TechnologyDropdown/TechnologyDropdown";
import "./RegistrationModal.css";

const RegistrationModal = ({ signedUpCallback, onClose }) => {
  const [step, setStep] = useState(1);

  const handleSubmit = (values) => {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      console.log(
        "Recordatorio: La subida de la foto de perfil aún no está implementada"
      );
      signedUpCallback();
      onClose();
    }, 400);
  };

  return (
    <div className="modal modal-container d-flex" id="registration-modal">
      <div className="modal-dialog modal-dialog-centered form-container modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Registrarse</h5>
            <button
              onClick={onClose}
              type="button"
              className="btn-close cursor-pointer"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              firstName: "",
              lastName: "",
              bio: "",
              profile: [],
              technology: [],
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue, validateForm }) => (
              <Form>
                {step === 1 && (
                  <div className="step1 modal-body d-flex flex-column">
                    <section className="d-flex flex-column">
                      <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <Field
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                        />
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="text-danger"
                          role="alert"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password">Contraseña</label>
                        <Field
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                        />
                        <ErrorMessage
                          name="password"
                          component="span"
                          className="text-danger"
                          role="alert"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="confirmPassword">
                          Confirmar contraseña
                        </label>
                        <Field
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          name="confirmPassword"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="span"
                          className="text-danger"
                          role="alert"
                        />
                      </div>
                    </section>
                  </div>
                )}
                {step === 2 && (
                  <div className="modal-body d-flex flex-column flex-lg-row gap-4">
                    <section className="data-container w-100">
                      <div className="mb-3">
                        <h3>Tus datos</h3>
                        <label htmlFor="firstName">Nombre</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="firstName"
                          name="firstName"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="span"
                          className="text-danger"
                          role="alert"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="lastName">Apellido</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="lastName"
                          name="lastName"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="span"
                          className="text-danger"
                          role="alert"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="bio">Información adicional</label>
                        <Field
                          as="textarea"
                          className="form-control"
                          id="bio"
                          name="bio"
                        />
                        <ErrorMessage
                          name="bio"
                          component="span"
                          className="text-danger"
                          role="alert"
                        />
                      </div>
                    </section>

                    <section className="technology-profiles-container w-100">
                      <div className="form-group mb-3">
                        <h3>Tus aptitudes</h3>
                        <label htmlFor="profile">Perfil</label>
                        <Select
                          isMulti
                          name="profile"
                          options={profilesOptions}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(selectedOptions) =>
                            setFieldValue(
                              "profile",
                              selectedOptions.map((option) => option.value)
                            )
                          }
                        />
                        <ErrorMessage
                          name="profile"
                          component="span"
                          className="text-danger"
                          role="alert"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="technology">Tecnologías</label>
                        <Select
                          isMulti
                          name="technology"
                          options={technologyOptions}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={(selectedOptions) =>
                            setFieldValue(
                              "technology",
                              selectedOptions.map((option) => option.value)
                            )
                          }
                        />
                        <ErrorMessage
                          name="technology"
                          component="span"
                          className="text-danger"
                          role="alert"
                        />
                      </div>
                      <div className="mb-3">
                        <label>Foto de perfil</label>
                        <input
                          className="form-control"
                          type="file"
                          id="formFile"
                        />
                      </div>
                    </section>
                  </div>
                )}
                <div className="modal-footer d-flex justify-content-center">
                  {step === 1 && (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={async () => {
                        const stepErrors = await validateForm();
                        const step1Fields = [
                          "email",
                          "password",
                          "confirmPassword",
                        ];
                        const hasStep1Errors = step1Fields.some(
                          (field) => stepErrors[field]
                        );
                        if (!hasStep1Errors) {
                          setStep(2);
                        }
                      }}
                    >
                      Siguiente
                    </button>
                  )}
                  {step === 2 && (
                    <>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setStep(1)}
                      >
                        Atrás
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success"
                        disabled={isSubmitting}
                      >
                        ¡Sumarme!
                      </button>
                    </>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
