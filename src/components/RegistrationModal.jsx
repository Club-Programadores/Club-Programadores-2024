import React, { useState } from "react";
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

const RegistrationModal = ({ signedUpCallback, onClose }) => {
  const [step, setStep] = useState(1);
  const profilesOptions = aptitudes.profilesOptions;
  const technologyOptions = aptitudes.technologyOptions;

  const handleSubmit = (formData) => {
    setTimeout(() => {
      
      ParticipantesController.registrarParticipante(formData);

      const datosUsuario = {
        nombre: `${formData.firstName} ${formData.lastName}`,
        imagen: nuevoMiembro.imagen,
        email: nuevoMiembro.email
      }
      signedUpCallback(datosUsuario);
      
      onClose();
    }, 400);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-96">
        <DialogHeader>
          <DialogTitle>Registrarse</DialogTitle>
        </DialogHeader>
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            github: "",
            bio: "",
            profile: [],
            technology: [],
          }}
          validationSchema={fullUserValidation}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, validateForm }) => (
            <Form className="space-y-4">
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
                        <Label htmlFor="profilePicture">GitHub</Label>
                        <Input
                          type="text"
                          id="github"
                          placeholder="https://github.com/usuario"
                          className="w-full"
                        />
                      </div>
                      <div>
                        <Label htmlFor="profilePicture">Foto de perfil</Label>
                        <Input
                          type="file"
                          id="profilePicture"
                          className="w-full"
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
