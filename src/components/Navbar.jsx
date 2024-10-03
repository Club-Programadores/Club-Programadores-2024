import React, { useState } from "react";
import { useModal } from "@/components/ModalsHandler";
import { LoginButton, RegisterButton } from "@/components/Buttons";
import { CustomLink } from "./CustomLink";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Menu, X, LogOut, User, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent as MenuContent,
  DropdownMenuItem as MenuItem,
  DropdownMenuLabel as MenuLabel,
  DropdownMenuSeparator as Separator,
  DropdownMenuTrigger as MenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = ({ isLogged, datosUsuario, logOutCallback }) => {
  const { toggleRegistration, toggleLogin } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-nowrap">
        <div className="flex justify-between items-center">
          <CustomLink
            to="/"
            className="animated-responsive flex-1 flex justify-start cursor-pointer select-none items-center"
          >
            <span className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-mono tracking-tighter font-black text-xl mr-2">
              {"</>"}
            </span>
            <h1 className="font-semibold text-purple-600 hidden md:block">
              Club de Programador@s
            </h1>
          </CustomLink>

          <nav className="animated-responsive flex-1 justify-center hidden lg:flex space-x-4">
            <CustomLink
              to="/"
              className="cursor-pointer select-none text-gray-600 hover:text-purple-600"
            >
              Inicio
            </CustomLink>
            <CustomLink
              to="/contactanos"
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
                <div className="animated-responsive flex flex-1 lg:w-fit w-full justify-center md:justify-end md:mr-7 lg:mr-0">
                  <MenuTrigger
                    asChild
                    className="flex cursor-pointer items-center px-2 w-fit gap-2 rounded-lg text-nowrap text-gray-600 hover:bg-purple-100"
                  >
                    <div>
                      <p className="hidden md:flex select-none px-1">
                        {datosUsuario.nombre}
                      </p>
                      <Avatar className="flex mx-auto md:-mr-4 ring-4 ring-white">
                        <AvatarImage
                          className="select-none"
                          src={datosUsuario.imagen}
                          alt="Foto de perfil"
                        />
                      </Avatar>
                    </div>
                  </MenuTrigger>
                  <MenuContent className="w-48">
                    <MenuLabel>Mi cuenta</MenuLabel>

                    <Separator />

                    <MenuItem>
                      <CustomLink
                        to="/editar-perfil"
                        className="flex items-center w-full"
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Editar perfil</span>
                      </CustomLink>
                    </MenuItem>

                    <MenuItem>
                      <CustomLink
                        to="/editar-proyectos"
                        className="flex items-center w-full"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Editar proyectos</span>
                      </CustomLink>
                    </MenuItem>

                    <MenuItem onClick={logOutCallback}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar sesión</span>
                    </MenuItem>
                  </MenuContent>
                </div>
              </DropdownMenu>
            </>
          ) : (
            <div className="animated-responsive justify-end flex-1 hidden lg:flex space-x-2">
              <RegisterButton onClick={toggleRegistration} outline={true} />
              <LoginButton onClick={toggleLogin} outline={true} />
            </div>
          )}
          <div className="animated-responsive flex flex-1 md:flex-none lg:flex-1 w-fit justify-end lg:hidden">
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
              to="/contactanos"
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
              <></> // (vacío)
            ) : (
              <>
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
