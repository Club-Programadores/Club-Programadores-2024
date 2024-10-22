import React, { useState, useEffect } from "react";
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

import ParticipantesController from "@/dbService/participantesController"
import { File } from "lucide-react";

const RegistrationModal = ({ signedUpCallback, onClose }) => {
  const [step, setStep] = useState(1);
  const [apiRegisterRequest, setApiRegisterRequest] = useState({
    state: false,
    registerData: {}
  });

  const profilesOptions = aptitudes.profilesOptions;
  const technologyOptions = aptitudes.technologyOptions;

  useEffect(() => {
    async function asyncFunction() {

      try {

        console.log("test3");
        const resultadoRegistro = await ParticipantesController.asyncRegistrarParticipante(apiRegisterRequest.registerData);
        console.log(resultadoRegistro);
        //Si el registro es exitoso, accede al endpoint de login para conseguir token de sesión.
        if (resultadoRegistro.registroExitoso) {
          const loginInput = {
            email: apiRegisterRequest.registerData.email,
            pass: apiRegisterRequest.registerData.password
          }
          const resultadoLogin = await ParticipantesController.asyncLoginParticipante(loginInput);
          console.log(resultadoLogin);
          if (resultadoLogin.datosValidos) {
            signedUpCallback(response.informacionParticipante, resultado.tokenSesion);
          }
        }
        else {
          //manejar error al registrar usuario 
        }

      }
      catch (e) {
        console.log(e);
      }

      console.log(resultado.detalle);
    }

    if(apiRegisterRequest.state === true){
    setTimeout(() => {
      console.log("tes2");
      asyncFunction();
      onClose();
    }, 400);
    }
    console.log("test");
  })

  const handleSubmit = (formData) => {
    console.log(formData);
    setApiRegisterRequest({
      state: true,
      registerData: formData
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
            <Form className="space-y-4" enctype="multipart/form-data" method="post">
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
                          type="file"
                          id="image"
                          name="image"
                          className="w-full"
                        />
                        <ErrorMessage
                          name="image"
                          component="p"
                          className="text-red-500 text-sm"
                        />
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
