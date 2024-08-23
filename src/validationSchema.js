import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Confirmar contraseña es obligatorio"),
  firstName: Yup.string()
    .trim()
    .matches(/^[a-zA-Z ]*$/, "Nombre inválido")
    .max(15, "Máximo 15 caracteres")
    .required("El nombre es obligatorio"),
  lastName: Yup.string()
    .trim()
    .matches(/^[a-zA-Z ]*$/, "Apellido inválido")
    .required("El apellido es obligatorio"),
  bio: Yup.string().trim().max(160, "Máximo 160 caracteres"),
  profile: Yup.array().min(1, "Seleccioná al menos un perfil"),
  technology: Yup.array().min(1, "Seleccioná al menos una tecnología"),
});
