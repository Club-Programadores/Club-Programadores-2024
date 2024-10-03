import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusCircle, Code, Earth } from "lucide-react"

export default function ProyectoBox({ data }) {
  const renderContent = () => {
    switch (data.estado) {

      case "nuevo":
        return (
          <>
            <p className="text-sm text-gray-600 mb-4">{data.descripcion}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {data.tecnologias && data.tecnologias.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
            <a
              className="w-full"
              href={data.url_pagina}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="secondary"
                className="w-full flex items-center justify-center"
              >
                <PlusCircle className="mr-2" size={20} />
                Unirse al proyecto
              </Button>
            </a>
          </>
        )

      case "en_desarrollo":
        return (
          <>
            <p className="text-sm text-gray-600 mb-4">{data.descripcion}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {data.tecnologias && data.tecnologias.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
            <a href={data.url_proyecto} target="_blank" rel="noopener noreferrer">
              <Button className="w-full flex items-center justify-center">
                <Code className="mr-2" size={20} />
                Repositorio
              </Button>
            </a>
          </>
        )

      case "finalizado":
        return (
          <>
            <p className="text-sm text-gray-600 mb-4">{data.descripcion}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {data.tecnologias && data.tecnologias.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
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
          </>
        )
        
      default:
        return null
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r to-blue-500 from-indigo-600 text-white">
        <CardTitle className="text-lg font-semibold">{data.titulo}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {renderContent()}
      </CardContent>
    </Card>
  )
}