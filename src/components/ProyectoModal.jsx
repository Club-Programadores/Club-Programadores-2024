import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, Code, Earth, Circle } from "lucide-react";

export default function ProyectoModal({ isOpen, onClose, proyecto }) {
  if (!proyecto) return null;

  const renderEstadoBadge = () => {
    const estadoColor = {
      nuevo: "text-green-400 border-green-400",
      en_desarrollo: "text-yellow-400 border-yellow-400",
      finalizado: "text-blue-300 border-blue-300",
    };

    const estadoTextual = {
      nuevo: "Nuevo",
      en_desarrollo: "En desarrollo",
      finalizado: "Finalizado",
    };

    return (
      <Badge className={`${estadoColor[proyecto.estado]} `} variant="outline">
        <Circle className="h-3 -ml-2 -mr-[2px]" strokeWidth={4} />
        <p>{estadoTextual[proyecto.estado]}</p>
      </Badge>
    );
  };

  const renderParticipantes = () => (
    <div className="flex flex-wrap gap-2">
      {proyecto.participantes.map((participante) => {
        return (
          <Avatar
            key={participante}
            title={`${participante.nombre} ${participante.apellido}`}
          >
            <AvatarImage
              src={
                participante.image ||
                `https://api.dicebear.com/6.x/initials/svg?seed=${participante}`
              }
              alt={
                participante
              }
            />
            <AvatarFallback>{participante[0]}</AvatarFallback>
          </Avatar>
        );
      })}
    </div>
  );

  const renderButtons = () => {
    const buttons = [];

    if (proyecto.estado === "nuevo" && proyecto.abierto === "true") {
      buttons.push(
        <Button key="join" className="flex-1 flex items-center justify-center">
          <UserPlus className="mr-2" size={20} />
          Unirse al proyecto
        </Button>
      );
    }

    if (proyecto.url_proyecto) {
      buttons.push(
        <Button
          key="repo"
          className="flex-1 flex items-center justify-center"
          disabled={!proyecto.url_proyecto}
          onClick={() => location.replace(proyecto.url_proyecto)}
        >
          <Code className="mr-2" size={20} />
          Repositorio
        </Button>
      );
    }

    if (proyecto.url_pagina) {
      buttons.push(
        <Button
          key="web"
          className="flex-1 flex items-center justify-center"
          disabled={!proyecto.url_pagina}
          onClick={() => window.open(proyecto.url_pagina, "_blank")}
        >
          <Earth className="mr-2" size={20} />
          Página web
        </Button>
      );
    }

    return (
      <div className="flex flex-col md:flex-row gap-2 mt-4">{buttons}</div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <Card className="border-0">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r to-blue-500 from-indigo-600 p-6 text-white">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl">
                  {proyecto.titulo}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-1 flex items-center justify-between">
                {renderEstadoBadge()}
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                <p className="text-gray-600">{proyecto.descripcion}</p>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Tecnologías</h3>
                <div className="flex flex-wrap gap-2">
                  {proyecto.tecnologias.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Participantes</h3>
                {renderParticipantes()}
              </div>
              {renderButtons()}
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
