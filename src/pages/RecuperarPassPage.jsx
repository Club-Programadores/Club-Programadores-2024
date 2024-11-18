import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ParticipantesController from "@/dbService/usuario/usuarioController"


export const RecuperarPassPage = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    ParticipantesController.recuperarPass(e.email)
    alert("Correo enviado, abralo para continuar con la recuperación de contraseña.");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Recuperar Contraseña</h1>
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
        </div>
        
        <div className="flex justify-center space-x-2 mt-3">
          <Button type="submit">
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
};

