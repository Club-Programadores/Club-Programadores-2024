import React from "react";
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
import participantesJson from "../../assets/miembros.json";
import { CustomLink } from "../components/CustomLink";

export const PasswordChange = () => {
  const users = participantesJson.miembros;
  const currentUser = users.find((user) => user.id === 8); // <- Cambiar id para probar editar cualquier usuario

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
  };

  return (
    <div className="flex container justify-center py-12 bg-gray-100">
      <Card>
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
                <CustomLink to="../settings">
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
