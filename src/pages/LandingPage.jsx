import { Button } from "@/components/ui/button";
import { RegisterButton } from "@/components/Buttons";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/components/ModalsHandler";
import {
  CalendarIcon,
  UserIcon,
  FileQuestionIcon,
  CheckCircleIcon,
  MapPinIcon,
  ClockIcon,
} from "lucide-react";

export const LandingPage = () => {
  const { toggleRegistration } = useModal();

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="relative select-none h-[400px] mb-12">
          <img
            src="/imgs/heroBanner1.jpg"
            alt="Estudiantes programando"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                ¡SUMATE AL CLUB DE PROGRAMADOR@S!
              </h2>
              <RegisterButton onClick={toggleRegistration} />
            </div>
          </div>
        </section>

        <section className="mb-12" id="about-us">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-8" ñ>
            El Club de Programadores es un espacio para compartir, practicar y
            colaborar
          </h2>
          <p className="text-xl text-center text-gray-600 mb-8">
            Sumate a un espacio para compartir conocimientos, practicar
            ejercicios de las respectivas clases que cada persona esté tomando y
            colaborar mutuamente, apuntando al aprendizaje autogestivo y
            colaborativo de programación. El objetivo es generar una red de
            desarrolladores web y fomentar el trabajo colaborativo. <br />
            Esta plataforma es un complemento para ayudar a conectar a sus
            miembros y dar seguimiento a los proyectos.
          </p>

          <seccion className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <img
                  src="imgs\002-profile.svg"
                  alt="Perfil"
                  className="mx-auto mb-4 w-32"
                />
                <h3 className="text-xl font-semibold mb-2">Creá tu perfil</h3>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <img
                  src="imgs\004-competence.svg"
                  alt="Skills"
                  className="mx-auto mb-4 w-32"
                />
                <h3 className="text-xl font-semibold mb-2">
                  Cargá tus habilidades y proyectos
                </h3>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <img
                  src="imgs\005-teamwork.svg"
                  alt="Conectar"
                  className="mx-auto mb-4 w-32"
                />
                <h3 className="text-xl font-semibold mb-2">
                  Conectá con otr@s y potenciá tu desarrollo
                </h3>
              </CardContent>
            </Card>
          </seccion>
        </section>

        <section className="mb-12" id="program-details">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Detalles del Programa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Actividades</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>
                      Proyectos desafiantes presentados por 4 empresas
                      tecnológicas
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>Desarrollo de cada proyecto por 6 encuentros</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>
                      Espacio para proyectos propios de los participantes
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Colaboración</h3>
                <p className="mb-4">
                  La actividad se dicta en alianza con Plataforma 5, un coding
                  bootcamp que se dedica a la formación de profesionales
                  capacitados para trabajar en las mejores empresas del país.
                </p>
                <p>
                  Esta colaboración asegura que los participantes reciban una
                  formación de calidad y actualizada según las demandas del
                  mercado laboral.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mb-12" id="about-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <CalendarIcon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-semibold mb-2">25 encuentros</h3>
                <p>
                  Sábados de 10 a 12hs, del 15 de junio al 14 de diciembre de
                  2024
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <MapPinIcon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-semibold mb-2">Ubicación</h3>
                <p>
                  Centro Universitario Vicente López, Carlos Villate 4480, Munro
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <UserIcon className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-xl font-semibold mb-2">Destinatarios</h3>
                <p>Personas con conocimientos previos de Desarrollo Web</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-gray-100 mt-12 p-8 rounded-lg" id="contact-us">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            CONTÁCTANOS
          </h2>
          <form className="max-w-md mx-auto">
            <div className="mb-4">
              <Input
                placeholder="Nombre"
                type="text"
                id="inputName"
                name="name"
                required
              />
            </div>
            <div className="mb-4">
              <Input
                placeholder="Email"
                type="email"
                id="inputEmail"
                name="mail"
                required
              />
            </div>
            <div className="mb-4">
              <Textarea
                placeholder="Mensaje"
                id="mensaje"
                name="mensaje"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Enviar
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
};
