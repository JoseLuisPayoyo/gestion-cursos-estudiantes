// src/components/AlumnosList.jsx
import React from "react";
import Swal from "sweetalert2";

const AlumnosList = ({ alumnos, cursos, onEdit, fetchAlumnos }) => {
  const getCursoNombre = (cursoId) => {
    const curso = cursos.find((c) => c.id === cursoId);
    return curso ? curso.nombre : "Desconocido";
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar alumno?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:8080/api/alumnos/${id}`, {
          method: "DELETE",
        });
        Swal.fire("¡Eliminado!", "El alumno fue eliminado", "success");
        fetchAlumnos();
      } catch (error) {
        console.error("Error eliminando alumno:", error);
        Swal.fire("Error", "No se pudo eliminar el alumno", "error");
      }
    }
  };

  return (
    
    <table className="w-full max-w-6xl mx-auto table-auto border border-gray-300 bg-white shadow rounded mt-6">
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
              {getCursoNombre(alumno.cursoId)}
            </td>
            <td className="border px-4 py-2 space-x-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                onClick={() => onEdit(alumno)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(alumno.id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AlumnosList;
