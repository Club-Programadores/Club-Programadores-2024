import * as Yup from "yup";

export const userValidationSchema = Yup.object({
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

export const projectValidationSchema = Yup.object({
  titulo: Yup.string()
    .max(50, "Máximo 50 caracteres")
    .required("El correo título es obligatorio"),
  descripcion: Yup.string()
    .max(560, "Máximo 560 caracteres")
    .required("La descripción es obligatoria"),
  url_proyecto: Yup.string().max(100, "Máximo 100 caracteres").trim(),
  url_pagina: Yup.string().max(100, "Máximo 100 caracteres").trim(),
  estado: Yup.string().required("Debes definir un estado"),
  tecnologías: Yup.array(),
});
