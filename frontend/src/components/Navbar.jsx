import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Gestión Cursos</h1>
        <div className="space-x-4">
          <Link to="/alumnos" className="hover:underline">
            Alumnos
          </Link>
          <Link to="/cursos" className="hover:underline">
            Cursos
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
