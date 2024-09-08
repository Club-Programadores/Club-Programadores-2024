import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { userValidationSchema } from "@/validationSchema";
import { Textarea } from "@/components/ui/textarea";
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
import Select from "react-select";
import participantesJson from "../../../assets/miembros.json";
import aptitudesJson from "../../../assets/aptitudes.json";

export const EditUserProfile = () => {
  const users = participantesJson.miembros;
  const currentUser = users.find((user) => user.id === 8); // <- Cambiar id para probar editar cualquier usuario
  const { profilesOptions, technologyOptions } = aptitudesJson;

  const initialValues = {
    firstName: currentUser.nombre,
    lastName: currentUser.apellido,
    email: currentUser.email,
    password: currentUser.password,
    confirmPassword: currentUser.password,
    bio: currentUser.bio,
    profile: currentUser.profiles.map((profile) => profile.toLowerCase()),
    technology: currentUser.technology.map((tech) => tech.toLowerCase()),
  };

  const handleSubmit = (values) => {
    console.log(JSON.stringify(values, null, 2));
  };

  return (
    <Card>
      <Formik
        initialValues={initialValues}
        validationSchema={userValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <CardHeader>
              <CardTitle>Cuenta</CardTitle>
              <CardDescription>
                Edita tu perfil. Clickea "Guardar" cuando termines.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <FormField label="Nombre" name="firstName" />
              <FormField label="Apellido" name="lastName" />
              <FormField label="Email" name="email" type="email" />
              <FormField label="Contraseña" name="password" type="password" />
              <FormField
                label="Confirmar contraseña"
                name="confirmPassword"
                type="password"
              />
              <FormField
                label="Foto de perfil"
                name="profilePicture"
                type="file"
              />
              <FormField
                label="Información adicional"
                name="bio"
                as={Textarea}
              />
              <h3 className="pt-2 text-lg font-semibold">Aptitudes</h3>
              <SelectDropdown
                label="Perfil"
                name="profile"
                options={profilesOptions}
                setFieldValue={setFieldValue}
                values={values}
              />
              <SelectDropdown
                label="Tecnologías"
                name="technology"
                options={technologyOptions}
                setFieldValue={setFieldValue}
                values={values}
              />
            </CardContent>
            <CardFooter className="mt-0">
              <Button type="submit" disabled={isSubmitting}>
                Guardar
              </Button>
            </CardFooter>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

const FormField = ({ label, name, as = Input, ...props }) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <Field as={as} id={name} name={name} className="w-full" {...props} />
    <ErrorMessage name={name} component="p" className="text-red-500 text-sm" />
  </div>
);

const SelectDropdown = ({ label, name, options, ...props }) => (
  <div>
    <Label htmlFor={name}>{label}</Label>
    <Select
      isMulti
      name={name}
      options={options}
      className="w-full"
      placeholder="Seleccionar"
      value={options.filter((option) =>
        props.values[name].includes(option.value)
      )}
      onChange={(selectedOptions) =>
        props.setFieldValue(
          name,
          selectedOptions.map((option) => option.value)
        )
      }
    />
    <ErrorMessage name={name} component="p" className="text-red-500 text-sm" />
  </div>
);
