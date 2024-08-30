import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";

export default function ProyectoEnDesarrolloBox({ data }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r to-blue-500 from-indigo-600 text-white">
        <CardTitle className="text-lg font-semibold">{data.titulo}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-gray-600 mb-4">{data.descripcion}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {/* {data.tecnologias.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))} */}
        </div>
        <a href={data.url_proyecto} target="_blank" rel="noopener noreferrer">
          <Button className="w-full flex items-center justify-center">
            <Code className="mr-2" size={20} />
            Repositorio
          </Button>
        </a>
      </CardContent>
    </Card>
  );
}
