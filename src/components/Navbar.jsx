import React, { useState } from "react";
import { useModal } from "@/components/ModalsHandler";
import { LoginButton, RegisterButton } from "@/components/Buttons";
import { CustomLink } from "./CustomLink";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Menu, X, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = ({ isLogged, logOutCallback }) => {
  const { toggleRegistration, toggleLogin } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-nowrap">
        <div className="flex justify-between items-center">
          <CustomLink
            to="/"
            className="flex cursor-pointer select-none items-center"
          >
            <span className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-mono tracking-tighter font-black text-xl mr-2">
              {"</>"}
            </span>
            <h1 className="font-semibold text-purple-600 hidden md:block">
              Club de Programador@s
            </h1>
          </CustomLink>

          <nav className="hidden lg:flex space-x-4">
            <CustomLink
              to="/"
              className="cursor-pointer select-none text-gray-600 hover:text-purple-600"
            >
              Inicio
            </CustomLink>
            <CustomLink
              to="/contact-us"
              className="cursor-pointer select-none text-gray-600 hover:text-purple-600"
            >
              Contacto
            </CustomLink>
            <CustomLink
              to="/participantes"
              className="cursor-pointer select-none text-gray-600 hover:text-purple-600"
            >
              Participantes
            </CustomLink>
            <CustomLink
              to="/proyectos"
              className="cursor-pointer select-none text-gray-600 hover:text-purple-600"
            >
              Proyectos
            </CustomLink>
          </nav>
          {isLogged ? (
            <>
              <DropdownMenu>
                <div className="flex lg:w-fit w-full justify-center md:justify-end mr-7 lg:mr-0">
                  <DropdownMenuTrigger
                    asChild
                    className="flex cursor-pointer items-center px-2 w-fit gap-2 rounded-lg text-nowrap text-gray-600 hover:bg-purple-100"
                  >
                    <div>
                      <p className="hidden md:flex select-none px-1">
                        Pablo Estigarribia
                      </p>
                      <Avatar className="flex mx-auto md:-mr-4 ring-4 ring-white">
                        <AvatarImage
                          className="select-none"
                          src="https://static.vecteezy.com/system/resources/previews/004/511/281/original/default-avatar-photo-placeholder-profile-picture-vector.jpg"
                          alt="Foto de perfil"
                        />
                      </Avatar>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="cursor-pointer mr-2 h-4 w-4" />
                      <span>Editar perfil</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <LogOut className="cursor-pointer mr-2 h-4 w-4" />
                      <span onClick={logOutCallback}>Cerrar sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </div>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden lg:flex space-x-2">
              <RegisterButton onClick={toggleRegistration} outline={true} />
              <LoginButton onClick={toggleLogin} outline={true} />
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden flex flex-col text-2xl gap-3 items-center mt-4 space-y-2">
            <CustomLink
              to="/"
              className="block cursor-pointer select-none text-gray-600 active:text-purple-600"
            >
              Inicio
            </CustomLink>
            <CustomLink
              to="/contact-us"
              className="block cursor-pointer select-none text-gray-600 active:text-purple-600"
            >
              Contacto
            </CustomLink>
            <CustomLink
              to="/participantes"
              className="block cursor-pointer select-none text-gray-600 active:text-purple-600"
            >
              Participantes
            </CustomLink>
            <CustomLink
              to="/proyectos"
              className="block cursor-pointer select-none text-gray-600 active:text-purple-600"
            >
              Proyectos
            </CustomLink>
            {isLogged ? (
              <></>
            ) : (
              <>
                {" "}
                <span
                  onClick={toggleRegistration}
                  className="block cursor-pointer select-none text-gray-600 active:text-purple-600"
                >
                  Registrarse
                </span>
                <span
                  onClick={toggleLogin}
                  className="block cursor-pointer select-none text-gray-600 active:text-purple-600"
                >
                  Iniciar sesión
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
