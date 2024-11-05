import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LuGithub as Github } from "react-icons/lu";
import techNameToImage from "../../public/tools/techNameToImage";

export default function UserProfileModal({ isOpen, onClose, user }) {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden">
        <Card className="border-0">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r to-purple-500 from-indigo-600 p-6 text-white">
              <DialogHeader>
                <DialogTitle className=" text-white">
                  Perfil de usuario
                </DialogTitle>
              </DialogHeader>
              <div className="flex items-center mt-4">
                <Avatar className="w-20 h-20 border-4 border-white">
                  <AvatarImage
                    src={
                      user.imageUrl ||
                      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                    }
                    alt={user.nombre}
                  />
                </Avatar>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold">
                    {user.nombre} {user.apellido}
                  </h2>
                  <a
                    href={user.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-white hover:underline mt-1"
                    title="Ir al perfil de GitHub"
                  >
                    <Github size={16} className="mr-1" />
                    {user.github ? (
                      user.github.replace("https://github.com/", "")
                    ) : (
                      <></>
                    )}
                  </a>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Perfil</h3>
                <div className="flex flex-wrap gap-2">
                  {user.profiles.map((profile) => (
                    <Badge key={profile} variant="secondary">
                      {profile}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Bio</h3>
                <p className="text-gray-600">{user.bio}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Tecnologías</h3>
                <div className="flex flex-wrap gap-4">
                  {user.technology.map((tech) => (
                    <div
                      key={tech}
                      className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1"
                    >
                      <img
                        src={techNameToImage(tech)}
                        alt={tech}
                        className="w-5 h-5 object-contain"
                      />
                      <span className="text-sm">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
