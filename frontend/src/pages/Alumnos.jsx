import React, { useEffect, useState } from "react";
import AlumnoForm from "../components/AlumnoForm";

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [cursos, setCursos] = useState([]);

  const fetchAlumnos = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/alumnos");
      const data = await res.json();

      // Obtener también los cursos para poder mostrar el nombre en vez del ID
      const cursosRes = await fetch("http://localhost:8080/api/cursos");
      const cursosData = await cursosRes.json();
      setCursos(cursosData);

      setAlumnos(data);
    } catch (error) {
      console.error("Error al cargar alumnos:", error);
    }
  };

  const obtenerNombreCurso = (cursoId) => {
    const curso = cursos.find((c) => c.id === cursoId);
    return curso ? curso.nombre : "Desconocido";
  };

  const eliminarAlumno = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este alumno?");
    if (!confirmar) return;

    try {
      await fetch(`http://localhost:8080/api/alumnos/${id}`, { method: "DELETE" });
      fetchAlumnos(); // Recargar lista
    } catch (error) {
      console.error("Error al eliminar alumno:", error);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Gestión de Alumnos</h1>

      {/* Formulario de creación */}
      <AlumnoForm onSuccess={fetchAlumnos} />

      {/* Tabla de alumnos */}
      <table className="w-full table-auto border border-gray-300 bg-white shadow rounded">
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
              <td className="border px-4 py-2">
                {obtenerNombreCurso(alumno.cursoId)}
              </td>
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
