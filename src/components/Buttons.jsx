import React from "react";
import { Button } from "./ui/button";

export const RegisterButton = ({ onClick, outline }) => {
  return (
    <Button
      variant={outline ? "outline" : ""}
      className={
        outline
          ? "select-none border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
          : "select-none bg-purple-600 hover:bg-purple-700 text-white"
      }
      onClick={onClick}
    >
      Registrarse
    </Button>
  );
};

export const LoginButton = ({ onClick, outline }) => {
  return (
    <Button
      variant={outline ? "outline" : ""}
      className={
        outline
          ? "select-none border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
          : "select-none bg-purple-600 hover:bg-purple-700 text-white"
      }
      onClick={onClick}
    >
      Login
    </Button>
  );
};
