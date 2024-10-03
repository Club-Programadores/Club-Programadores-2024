import React, {useCallback, useEffect, useState } from "react";
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

import ParticipantesController from "@/../public/dbService/participantesController"


const LoginModal = ({ loggedInCallback, onClose }) => {
  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userCredentialsAreValid, setUserCredentialsAreValid] = useState(false);
  const [showIncorrectUserMsg, setShowIncorrectUserMsg] = useState(false);

  const [datosUsuario, setDatosUsuario] = useState({
    nombre: "",
    imagen: "",
    email: ""
  });

  const fetchData = useCallback(async () => { 
    try{   

      const loginInput = {
        email: userMail,
        pass: userPass
      }

      const responseUserData = await ParticipantesController.asyncLoginParticipante(loginInput);

      if(responseUserData.password != userPass){
        setUserCredentialsAreValid(false);
      }
      else{
        console.log(responseUserData.image)
        setDatosUsuario({
          nombre: `${responseUserData.nombre} ${responseUserData.apellido}`,
          imagen: `${responseUserData.image}`,
          email: `${responseUserData.email}`
        })
        
        setUserCredentialsAreValid(true);
      }
    }
    catch(error){
      console.log(error)
    }
  })
  
  useEffect(()=>{
    fetchData();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userCredentialsAreValid) {
      setShowIncorrectUserMsg(true);
    } else {
      if (typeof loggedInCallback === "function") {
        loggedInCallback(datosUsuario);
      }
      onClose();
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
