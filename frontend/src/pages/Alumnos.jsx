import React, { useEffect, useState } from "react";

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/alumnos")
      .then(response => response.json())
      .then(data => {
        console.log("📦 Alumnos:", data);
        setAlumnos(data);
      })
      .catch(error => console.error("❌ Error al cargar alumnos", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/cursos")
      .then(response => response.json())
      .then(data => {
        console.log("📘 Cursos:", data);
        setCursos(data);
      })
      .catch(error => console.error("❌ Error al cargar cursos", error));
  }, []);

  const obtenerNombreCurso = (id) => {
    const curso = cursos.find(c => c.id === id);
    return curso ? curso.nombre : "Sin curso";
  };

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
              <td className="border px-4 py-2">{obtenerNombreCurso(alumno.cursoId)}</td>
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
