import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { passwordValidation } from "@/validationSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { CustomLink } from "../components/CustomLink";
import ParticipantesController from "@/services/dbService/usuario/usuarioController"


export const PasswordChange = () => {
  const [changePasswordRequest, setChangePasswordRequest] = useState({
    state: false,
    newPass: ""
  });

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  useEffect(() => {
    async function changePassword(){
      let mensajeResultado
      try{
        const resultado = await ParticipantesController.asyncChangePassword(changePasswordRequest.newPass)
        mensajeResultado = resultado.detalle;
      }
      catch(e){
        mensajeResultado = e.message;
      }
      finally{
        alert(mensajeResultado)
        setChangePasswordRequest({
          state: false,
          newPass: ""
        });
      }
    }

    if(changePasswordRequest.state){
      changePassword();
    }

  }, changePasswordRequest);

  const handleSubmit = (e) => {
    setChangePasswordRequest({
      state: true,
      newPass: e.password
    })
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 flex-grow">
      <Card className="w-full max-w-sm m-4">
        <Formik
          initialValues={initialValues}
          validationSchema={passwordValidation}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <CardHeader>
                <CardTitle>Cambiar contraseña</CardTitle>
                <CardDescription>
                  La contraseña debe tener al menos 8 caracteres.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <FormField label="Contraseña" name="password" type="password" />
                <FormField
                  label="Confirmar contraseña"
                  name="confirmPassword"
                  type="password"
                />
              </CardContent>

              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  Guardar
                </Button>
                <CustomLink to="../editar-perfil">
                  <Button className="mx-4 px-0" variant="link">
                    Volver
                  </Button>
                </CustomLink>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

const FormField = ({ label, name, as = Input, ...props }) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <Field as={as} id={name} name={name} className="w-full" {...props} />
    <ErrorMessage name={name} component="p" className="text-red-500 text-sm" />
  </div>
);
