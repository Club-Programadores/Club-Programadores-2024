import React, { useState, useEffect  } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { fullUserValidation } from "../validationSchema";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import aptitudes from "../../assets/aptitudes.json";
import Select from "react-select";
import { BarLoader } from "react-spinners";

import ParticipantesController from "@/services/dbService/usuario/usuarioController"

const RegistrationModal = ({ signedUpCallback, onClose }) => {
  const profilesOptions = aptitudes.profilesOptions;
  const technologyOptions = aptitudes.technologyOptions;
  const registrationTimeOut = 100000;
  const loadingCSSOverride = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingColor, setLoadingColor] = useState( "#9333ea")
  const [fotoDePerfil_Base64, setFotoDePerfil_Base64] = useState("");

  const [requestRegister, setRequestRegister] = useState({
    state: false,
    data: {}
  });

  useEffect(() => {
    async function asyncFunction(apiResponseTimeout) {
      try {
        const resultadoRegistro = await ParticipantesController.asyncRegistrarUsuario(requestRegister.data);
        if (resultadoRegistro.registroExitoso) {
          signedUpCallback(resultadoRegistro.datosUsuario, resultadoRegistro.tokenSesion);
        }
        else {
          alert("Error:"+resultadoRegistro.detalle);
        }
      }
      catch (e) {
        console.log(e);
      }
      finally{
        //Reset Login Request
        setLoading(false);
        clearTimeout(apiResponseTimeout)
        setRequestRegister({
          state: false,
          data: {}
        })
        onClose();
      }

    }

    if(requestRegister.state === true){
      setLoading(true)
      const apiResponseTimeout = setTimeout(() => {
        alert("Error: Timeout Registro")
        setLoading(false)
      }, registrationTimeOut);

      //Call Api.
      asyncFunction(apiResponseTimeout);
    }
  }, [requestRegister])

  const handleSubmit = (formData) => {
    setRequestRegister({
      state: true,
      data: {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
        github: formData.github,
        bio: formData.bio,
        image: fotoDePerfil_Base64,
        profile: formData.profile,
        technology: formData.technology,
      }
    })
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-96">
        <DialogHeader>
          <DialogTitle>Registrarse</DialogTitle>
        </DialogHeader>
        { 
          loading?
            <BarLoader color={loadingColor} loading={loading} cssOverride={loadingCSSOverride} size={150} aria-label="Loading Spinner" data-testid="loader"/>
          : <></>
        }
        <Formik
          initialValues={{
            codigo: "",
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            github: "",
            bio: "",
            image: null,
            profile: [],
            technology: [],
          }}
          validationSchema={fullUserValidation}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, validateForm }) => (
            <Form className="space-y-4" method="post" encType="multipart/form-data">
              {step === 0 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="codigo">Codigo de Autorización</Label>
                    <Field
                      as={Input}
                      type="text"
                      id="codigo"
                      name="codigo"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="codigo"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              )}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Field
                      as={Input}
                      type="email"
                      id="email"
                      name="email"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Contraseña</Label>
                    <Field
                      as={Input}
                      type="password"
                      id="password"
                      name="password"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">
                      Confirmar contraseña
                    </Label>
                    <Field
                      as={Input}
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="p"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Tus datos</h3>
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor="firstName">Nombre</Label>
                        <Field
                          as={Input}
                          type="text"
                          id="firstName"
                          name="firstName"
                          className="w-full"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Apellido</Label>
                        <Field
                          as={Input}
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="w-full"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="github">GitHub</Label>
                        <Field
                          as={Input}
                          type="text"
                          id="github"
                          name="github"
                          className="w-full"
                          placeholder="https://github.com/usuario"
                        />
                        <ErrorMessage
                          name="github"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="image">Foto de perfil</Label>
                        <Field
                          as={Input}
                          type="file"
                          id="image"
                          name="image"
                          className="w-full"
                          onChange={(event) => {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              const imgData = event.target.result;
                              setFotoDePerfil_Base64(imgData);
                            }
                            const imgSelected = event.target.files[0]
                            reader.readAsDataURL(imgSelected)
                          }}
                        />
                        <ErrorMessage
                          name="image"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                        <img src={`${fotoDePerfil_Base64}`} width={fotoDePerfil_Base64?"150":"0"} height={fotoDePerfil_Base64?"150":"0"}/>
                      </div>
                      <div>
                        <Label htmlFor="bio">Información adicional</Label>
                        <Field
                          as={Textarea}
                          id="bio"
                          name="bio"
                          className="w-full"
                        />
                        <ErrorMessage
                          name="bio"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Tus aptitudes</h3>
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor="profile">Perfil</Label>
                        <Select
                          isMulti
                          name="profile"
                          className="w-full"
                          placeholder="Seleccionar"
                          options={profilesOptions}
                          onChange={(selectedOptions) =>
                            setFieldValue(
                              "profile",
                              selectedOptions.map((option) => option.value)
                            )
                          }
                        />
                        <ErrorMessage
                          name="profile"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                      <div>
                        <Label htmlFor="technology">Tecnologías</Label>
                        <Select
                          isMulti
                          name="technology"
                          className="w-full"
                          placeholder="Seleccionar"
                          options={technologyOptions}
                          onChange={(selectedOptions) =>
                            setFieldValue(
                              "technology",
                              selectedOptions.map((option) => option.value)
                            )
                          }
                        />
                        <ErrorMessage
                          name="technology"
                          component="p"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-center space-x-2">
                {step === 0 && (
                  <Button
                    type="button"
                    onClick={async () => {
                      const stepErrors = await validateForm();
                      const step0Fields = [
                        "codigo"
                      ];
                      const hasStep0Errors = step0Fields.some(
                        (field) => stepErrors[field]
                      );

                      if (!hasStep0Errors) {
                        setStep(1);
                      }
                    }}
                  >
                    Siguiente
                  </Button>
                )}
                {step === 1 && (
                  <Button
                    type="button"
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
                  </Button>
                )}
                {step === 2 && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      Atrás
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      ¡Sumarme!
                    </Button>
                  </>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationModal;
