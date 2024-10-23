import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="flex flex-col gap-1 sm:flex-row max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left items-center justify-center text-gray-500">
        <a
          href="https://www.vicentelopez.gov.ar/centrouniversitariovl/novedades/club-de-desarrolladores-presencial-"
          className="hover:underline underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy; 2024 Club de Desarrolladores
        </a>
        <p className="hidden sm:flex sm:px-2">|</p>
        <a
          href="https://www.vicentelopez.gov.ar/centrouniversitariovl"
          className="hover:underline underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Centro Universitario de Vicente López
        </a>
      </div>
    </footer>
  );
};
