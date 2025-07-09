import React, { useEffect, useState } from "react";

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    obtenerAlumnos();
  }, []);

  const obtenerAlumnos = async () => {
    try {
      const respuesta = await fetch("http://localhost:8080/api/alumnos");
      const datos = await respuesta.json();
      setAlumnos(datos);
    } catch (error) {
      console.error("❌ Error al obtener alumnos:", error);
    }
  };

  const eliminarAlumno = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que quieres eliminar este alumno?");
    if (!confirmar) return;

    try {
      const respuesta = await fetch(`http://localhost:8080/api/alumnos/${id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error("Error al eliminar el alumno");
      }

      setAlumnos((prevAlumnos) => prevAlumnos.filter((alumno) => alumno.id !== id));
    } catch (error) {
      console.error("❌ Error eliminando alumno:", error);
      alert("Hubo un error al intentar eliminar el alumno.");
    }
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
              <td className="border px-4 py-2">{alumno.cursoNombre}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600">
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => eliminarAlumno(alumno.id)}
                >
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
