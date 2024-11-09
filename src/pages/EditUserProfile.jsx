import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { userValidation } from "@/validationSchema";
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
import aptitudesJson from "../../assets/aptitudes.json";
import { CustomLink } from "../components/CustomLink";

import ParticipantesController from "@/services/dbService/usuario/usuarioController"

export const EditUserProfile = ({tokenSesion, onEditUserProfile}) => {
  const { profilesOptions, technologyOptions } = aptitudesJson;
  const [profilePicture, setProfilePicture] = useState("");
  const [updateUserDataRequest, setUpdateUserDataRequest] = useState({
    requested: false,
    data: {}
  });
  const [initialValues, setInitialValues] = useState({
    fetched: false,
    object: {
      firstName: "",
      lastName: "",
      email: "",
      github: "",
      bio: "",
      profilePicture: "",
      profile: ['a'],
      technology: ['a']
    }
  })



  useEffect(() => {

    async function getUserData() {
      let dataUsuario = initialValues.object;
      try {
        const resultado = await ParticipantesController.asyncGetUsuario(tokenSesion); 
        dataUsuario = {
          firstName: resultado.data.nombre,
          lastName: resultado.data.apellido,
          email: resultado.data.email,
          github: resultado.data.url_github,
          bio: resultado.data.informacion,
          profile: resultado.data.profiles? resultado.data.profiles.map((profile) => profile.toLowerCase()): [],
          technology: resultado.data.technology? resultado.data.technology.map((tech) => tech.toLowerCase()): [],
        }
        setProfilePicture(resultado.data.imagen)
      }
      catch (e) {
        console.log(e);
      }
      finally {
        setInitialValues({
          fetched: true,
          object: dataUsuario
        })
      }
    }

    async function updateUserData() {
      try {
        const resultado = await ParticipantesController.asyncUpdateUsuario(tokenSesion, updateUserDataRequest.data);
        if(resultado.exitoso){
          alert("Informacion actualizada exitosamente!");
          //Actualizar Perfil navbar.
          onEditUserProfile({
            nombre: updateUserDataRequest.data.firstName+" "+updateUserDataRequest.data.lastName,
            imagen: updateUserDataRequest.data.image
          })
        }
        else{
          alert("Error: "+resultado.detalle);
        }
      }
      catch (e) {
        console.log(e);
      }
      finally {
        setUpdateUserDataRequest({
          requested: false,
          data: {}
        })
      }
    }

    if (!initialValues.fetched) {
      getUserData();
    }
    
    if (updateUserDataRequest.requested) {
      updateUserData();
    }

  }, [[], updateUserDataRequest]) // Primero un array vacio para que se ejecute el useEffect la primera vez que carga.

  const handleSubmit = (formData) => {
    setUpdateUserDataRequest({
      requested: true,
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        github: formData.github,
        bio: formData.bio,
        image: profilePicture,
        profile: formData.profile,
        technology: formData.technology,
      }
    })
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 flex-grow">
      <Card className="w-full max-w-xl m-4">
        <Formik
          enableReinitialize={true}
          initialValues={initialValues.object}
          validationSchema={userValidation}
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
                <div className="flex flex-col sm:flex-row gap-2">
                  <FormField label="Nombre" name="firstName" />
                  <FormField label="Apellido" name="lastName" />
                </div>

                <FormField label="Email" name="email" type="email" disabled="true"/>
                <FormField label="GitHub" name="github" />
                <FormField
                  label="Foto de perfil"
                  name="profilePicture"
                  type="file"
                  onChange={(event) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const imgData = event.target.result;
                      setProfilePicture(imgData);
                    }
                    const imgSelected = event.target.files[0]
                    reader.readAsDataURL(imgSelected)
                  }}
                />
                <img src={`${profilePicture}`} width={profilePicture?"150":"0"} height={profilePicture?"150":"0"}/>
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

              <CardFooter>
                <Button type="submit" disabled={isSubmitting}>
                  Guardar
                </Button>
                <CustomLink to="./clave">
                  <Button className="mx-4 px-0" variant="link">
                    Cambiar contraseña
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
  <div className="w-full">
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
