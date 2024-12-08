import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Earth } from "lucide-react";

export default function ProyectoFinalizadoBox({ data }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r to-blue-500 from-indigo-600 text-white">
        <CardTitle className="text-lg font-semibold">{data.titulo}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-gray-600 mb-4">{data.descripcion}</p>
        {data.tecnologias &&
          data.tecnologias.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}

        <div className="flex gap-2">
          <a
            className="w-full"
            href={data.url_pagina}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full flex items-center justify-center">
              <Earth className="mr-2" size={20} />
              Página web
            </Button>
          </a>

          <a
            className="w-full"
            href={data.url_proyecto}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full flex items-center justify-center">
              <Code className="mr-2" size={20} />
              Repositorio
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
