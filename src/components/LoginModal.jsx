import React, { useCallback, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ParticipantesController from "@/dbService/participantesController"


const LoginModal = ({ loggedInCallback, onClose }) => {
  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userCredentialsAreValid, setUserCredentialsAreValid] = useState(false);
  const [showIncorrectUserMsg, setShowIncorrectUserMsg] = useState(false);

  const [tokenSesion, setTokenSesion] = useState("");
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: "",
    imagen: "",
  });

  // const fetchData = useCallback(async () => {
  //   const loginInput = {
  //     email: userMail,
  //     pass: userPass
  //   }
  //   try {
  //     const response = await ParticipantesController.asyncLoginParticipante(loginInput);
  //     setDatosUsuario({
  //       nombre: `${response.informacionParticipante.nombre}`,
  //       imagen: `${response.informacionParticipante.image}`,
  //     })
  //     setTokenSesion(response.tokenSesion)
  //     setUserCredentialsAreValid(true);
  //   }
  //   catch {
  //     setUserCredentialsAreValid(false);
  //   }
  // })

  // useEffect(() => {
  //   fetchData();
  // })

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(1);
    const loginInput = {
      email: userMail,
      pass: userPass
    }
    const resultadoLogin = ParticipantesController.loginParticipante(loginInput);
    console.log(resultadoLogin);

    if (resultadoLogin.datosValidos) {
      console.log(2);
      loggedInCallback(resultadoLogin.informacionParticipante, resultadoLogin.tokenSesion);
      onClose();
    } {
      console.log(3);
      setShowIncorrectUserMsg(true);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-72">
        <DialogHeader>
          <DialogTitle>Iniciar sesión</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                className="w-full"
                id="email"
                name="email"
                value={userMail}
                onChange={(e) => setUserMail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input
                as={Input}
                type="password"
                id="password"
                name="password"
                className="w-full"
                onChange={(e) => setUserPass(e.target.value)}
              />
            </div>
          </div>

          {showIncorrectUserMsg && (
            <Alert variant="destructive" className="mt-3">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle> Correo y/o contraseña incorrecta </AlertTitle>
            </Alert>
          )}

          <div className="flex justify-center space-x-2 mt-3">
            <Button type="submit">Entrar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
