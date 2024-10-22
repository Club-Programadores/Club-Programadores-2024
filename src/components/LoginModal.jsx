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
import { BarLoader } from "react-spinners";


const LoginModal = ({ loggedInCallback, onClose }) => {
  const [showIncorrectUserMsg, setShowIncorrectUserMsg] = useState(false);
  const [loginRequest, setLoginRequest] = useState({
    state: false,
    input: {
      email: "",
      password: ""
    }
  });

  const [loading, setLoading] = useState(false);
  const [loadingColor, setLoadingColor] = useState("#9333ea")
  const loginTimeOutTime = 30000;
  const loadingCSSOverride = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    async function asyncFunction(logingTimeout) {
      try {
        const response = await ParticipantesController.asyncLoginParticipante(loginRequest.input);
        if (response.datosValidos) {
          loggedInCallback(response.datosUsuario, response.tokenSesion);
          onClose();
        }
        else{
          setShowIncorrectUserMsg(true);
        }
      }
      catch (e) {
        console.log(e);
      }
      finally {
        //Reset Login Request
        clearTimeout(logingTimeout);
        setLoginRequest({
          state: false,
          input: {
            email: "",
            password: ""
          }
        });
      }
    }


    if (loginRequest.state == true) {
      setLoading(true);
      const logingTimeout = setTimeout(() => {
        alert("Error: Timeout Login")
        setLoading(false);
      }, loginTimeOutTime)

      //Call API.
      asyncFunction(logingTimeout);
    }
  }, [loginRequest])

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginRequest({
      state: true,
      input: {
        email: e.target.email.value,
        password: e.target.password.value
      }
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-72">
        <DialogHeader>
          <DialogTitle>Iniciar sesión</DialogTitle>
        </DialogHeader>
        {
          loading ?
            <BarLoader color={loadingColor} loading={loading} cssOverride={loadingCSSOverride} size={150} aria-label="Loading Spinner" data-testid="loader" />
            : <></>
        }
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                className="w-full"
                id="email"
                name="email"
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
