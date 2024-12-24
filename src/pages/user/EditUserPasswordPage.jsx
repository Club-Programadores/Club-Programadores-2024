import UserController from "@/services/dbService/user/userController"
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { passwordValidation } from "@/validationSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter} from "@/components/ui/card";
import { CustomLink } from "../../components/CustomLink";

export const EditUserPasswordPage = ({tokenSesion}) => {
  const [updatePasswordRequest, setUpdatePasswordRequest] = useState({
    requested: false,
    newPass: ""
  });

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  useEffect(() => {
    async function updatePassword(){
      const resultPasswordUpdate = await UserController.asyncUpdateUserPassword(tokenSesion,updatePasswordRequest.newPass)
      alert(resultPasswordUpdate.details)
      setUpdatePasswordRequest({
        requested: false,
        newPass: ""
      })    
    }

    if(updatePasswordRequest.requested){
      updatePassword();
    }

  },[updatePasswordRequest])

  const handleSubmit = (newPass) => {
    setUpdatePasswordRequest({
      requested: true,
      newPass: newPass.password
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
