import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import techNameToImage from "../../public/tools/techNameToImage";

export default function ParticipanteBox({ data }) {
  const participanteImageUrl =
    data.imageUrl ||
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full cursor-pointer">
      <CardContent className="p-0 flex flex-col sm:flex-row h-full">
        <div className="sm:w-1/3 bg-gradient-to-br from-purple-500 to-indigo-600 p-4 sm:p-6 text-white flex flex-col justify-center items-center">
          <Avatar className="w-20 h-20 sm:w-24 sm:h-24 mb-4 ring-4 ring-white">
            <AvatarImage src={participanteImageUrl} alt={data.nombre} />
            <AvatarFallback>{data.nombre.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">
            {data.nombre}
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {data.profiles.map((profile) => (
              <Badge
                key={profile}
                variant="secondary"
                className="bg-white bg-opacity-20 text-white"
              >
                {profile.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>
        <div className="sm:w-2/3 p-4 sm:p-6 flex flex-col">
          <h3 className="text-lg font-bold mb-4 text-gray-700">TECNOLOGÍAS</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 gap-3 flex-grow">
            {data.technology.map((tech) => (
              <div
                key={tech}
                className="flex flex-col items-center group"
                title={tech}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-100 rounded-full p-2 transition-colors group-hover:bg-gray-200">
                  <img
                    src={techNameToImage(tech)}
                    alt={tech}
                    className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                  />
                </div>
                <span className="text-xs mt-1 text-center text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                  {tech}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
