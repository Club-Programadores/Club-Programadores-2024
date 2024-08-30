import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 mt-12">
      <div className="flex max-w-7xl mx-auto px-4 sm:px-6 gap-2 lg:px-8 text-center justify-center text-gray-600">
        <a
          href="https://www.vicentelopez.gov.ar/centrouniversitariovl/novedades/club-de-desarrolladores-presencial-"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy; 2024 Club de Desarrolladores
        </a>
        <p>~</p>
        <a
          href="https://www.vicentelopez.gov.ar/centrouniversitariovl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Centro Universitario de Vicente López
        </a>
      </div>
    </footer>
  );
};
