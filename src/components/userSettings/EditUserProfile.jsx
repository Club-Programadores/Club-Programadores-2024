import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { profilesOptions } from "../FiltersDropdown/PerfilesDropdown";
import { technologyOptions } from "../FiltersDropdown/TechnologyDropdown";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Select from "react-select";
import participantesJson from "../../../assets/miembros.json";
import { userValidationSchema } from "@/validationSchema";

export const EditUserProfile = () => {
  const users = JSON.parse(JSON.stringify(participantesJson)).miembros;
  const currentUser = users.find((user) => user.id === 8);
  const normalizeString = (str) => str.toLowerCase().replace(/\s+/g, "");

  const initialProfileValues = profilesOptions.filter((option) =>
    currentUser.profiles.some(
      (profile) => normalizeString(profile) === normalizeString(option.value)
    )
  );
  const initialTechnologyValues = technologyOptions.filter((option) =>
    currentUser.technology.some((tech) => tech.nombre === option.value)
  );

  const handleSubmit = (values) => {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
    }, 400);
  };

  return (
    <Card>
      <Formik
        initialValues={{
          firstName: currentUser.nombre,
          lastName: currentUser.apellido,
          email: currentUser.email,
          password: currentUser.password,
          confirmPassword: currentUser.password,
          bio: currentUser.bio,
          profile: currentUser.profiles,
          technology: currentUser.technology.map((tech) => tech.nombre),
        }}
        validationSchema={userValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <>
            <CardHeader>
              <CardTitle>Cuenta</CardTitle>
              <CardDescription>
                Edita tu perfil. Clickea "Guardar" cuando termines.
              </CardDescription>
            </CardHeader>
            <Form>
              <CardContent className="space-y-2">
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
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
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
                <div>
                  <Label htmlFor="profilePicture">Foto de perfil</Label>
                  <Input type="file" id="profilePicture" className="w-full" />
                </div>
                <div>
                  <Label htmlFor="bio">Información adicional</Label>
                  <Field as={Textarea} id="bio" name="bio" className="w-full" />
                  <ErrorMessage
                    name="bio"
                    component="p"
                    className="text-red-500 text-sm"
                  />
                </div>
                <h3 className="pt-2 text-lg font-semibold">Aptitudes</h3>
                <div>
                  <Label htmlFor="profile">Perfil</Label>
                  <Select
                    isMulti
                    name="profile"
                    className="w-full"
                    value={initialProfileValues}
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
                    value={initialTechnologyValues}
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
              </CardContent>
              <CardFooter className="mt-0">
                <Button type="submit" disabled={isSubmitting}>
                  Guardar
                </Button>
              </CardFooter>
            </Form>
          </>
        )}
      </Formik>
    </Card>
  );
};
