import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Code, Earth } from "lucide-react";
import ProyectoModal from "./ProyectoModal";

export default function ProyectoBox({ data, onUnirseCallback }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderTechnologies = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      {data.tecnologias &&
        data.tecnologias.map((tech) => (
          <Badge key={tech} variant="secondary">
            {tech}
          </Badge>
        ))}
    </div>
  );

  const renderContent = () => {
    let called = false;
    switch (data.estado) {
      case "nuevo":
        return (
          <>
            <p className="text-sm text-gray-600 mb-4">{data.descripcion}</p>
            {renderTechnologies()}
            {
              !data.permite_sumarse?<></>:
                <Button
                  // variant="secondary"
                  className="w-full flex items-center justify-center"
                  onClick={onUnirseCallback}
                  >
                  <PlusCircle className="mr-2" size={20} />
                  Unirse al proyecto
                </Button>
              // <a
              //   className="w-full"
              //   href={data.url_pagina}
              //   target="_blank"
              //   rel="noopener noreferrer"
              //   >
              // </a>
            }
          </>
        );

      case "en_desarrollo":
        return (
          <>
            <p className="text-sm text-gray-600 mb-4">{data.descripcion}</p>
            {renderTechnologies()}
            {
              data.url_proyecto && data.url_proyecto !== ""?
                <a
                href={data.url_proyecto}
                target="_blank"
                rel="noopener noreferrer"
                >
                  <Button className="w-full flex items-center justify-center">
                    <Code className="mr-2" size={20} />
                    Repositorio
                  </Button>
                </a>:
                <></>
            }
          </>
        );

      case "finalizado":
        return (
          <>
            <p className="text-sm text-gray-600 mb-4">{data.descripcion}</p>
            {renderTechnologies()}
            <div className="flex gap-2">
              {
                data.url_pagina && data.url_pagina !== ""?
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
                  </a>:
                  <></>
                
              }
              {
                data.url_proyecto && data.url_proyecto !== ""?
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
                  </a>:
                  <></>
              }
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Card
        className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:bg-gray-100"
        onClick={() => setIsModalOpen(true)}
        title="Ver más info"
      >
        <CardHeader className="bg-gradient-to-r to-blue-500 from-indigo-600 text-white">
          <CardTitle className="text-lg font-semibold">{data.titulo}</CardTitle>
        </CardHeader>
        <CardContent className="p-4">{renderContent()}</CardContent>
      </Card>
      <ProyectoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        proyecto={data}
      />
    </>
  );
}
