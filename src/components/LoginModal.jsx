import React, { useState } from "react";
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

const LoginModal = ({ loggedInCallback, onClose }) => {
  const [userMail, setUserMail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [showIncorrectUserMsg, setShowIncorrectUserMsg] = useState(false);

  const testUserMail = "a@b.com";
  const testUserPass = "1234";

  const isCredentialsValid = () => {
    return userMail === testUserMail && userPass === testUserPass;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isCredentialsValid()) {
      setShowIncorrectUserMsg(true);
    } else {
      if (typeof loggedInCallback === "function") {
        loggedInCallback();
      }
      onClose();
      console.log("Logged In");
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
