// src/pages/Alumnos.jsx
import React from "react";

const Alumnos = () => {
  const alumnos = [
    {
      id: 1,
      nombre: "Juan Pérez",
      correo: "juan@example.com",
      telefono: "612345678",
      curso: "Java Básico"
    },
    {
      id: 2,
      nombre: "Laura Gómez",
      correo: "laura@example.com",
      telefono: "622345678",
      curso: "Spring Boot Avanzado"
    },
    {
      id: 3,
      nombre: "Pedro López",
      correo: "pedro@example.com",
      telefono: "632345678",
      curso: "React desde Cero"
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Alumnos</h1>
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Correo</th>
            <th className="border px-4 py-2">Teléfono</th>
            <th className="border px-4 py-2">Curso</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno) => (
            <tr key={alumno.id} className="text-center">
              <td className="border px-4 py-2">{alumno.nombre}</td>
              <td className="border px-4 py-2">{alumno.correo}</td>
              <td className="border px-4 py-2">{alumno.telefono}</td>
              <td className="border px-4 py-2">{alumno.curso}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600">
                  Editar
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Alumnos;
