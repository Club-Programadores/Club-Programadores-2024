import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import techNameToImage from "../../../public/tools/techNameToImage";

export default function ParticipanteBox({ data }) {
  const participanteImageUrl =
    data.imageUrl ||
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

  return (
    <Card className="overflow-hidden mb-6 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <CardContent className="p-0 flex flex-col h-full">
        <div className="flex-grow flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-gradient-to-br from-purple-500 to-indigo-600 p-6 text-white flex flex-col justify-center items-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-white">
              <AvatarImage src={participanteImageUrl} alt={data.nombre} />
            </Avatar>
            <h2 className="text-2xl font-bold text-center mb-2">
              {data.nombre}
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {data.profiles.map((profile) => (
                <span
                  key={profile}
                  className="px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs font-semibold"
                >
                  {profile.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
          <div className="md:w-2/3 p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              TECNOLOGÍAS
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 flex-grow">
              {data.technology.map((tech) => (
                <div
                  key={tech.nombre}
                  className="flex flex-col items-center group"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full p-2 group-hover:bg-gray-200 transition-colors duration-200">
                    <img
                      src={techNameToImage(tech.nombre)}
                      alt={tech.nombre}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className="text-xs mt-2 text-center text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                    {tech.nombre}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
