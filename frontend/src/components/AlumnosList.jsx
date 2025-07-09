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
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-300 bg-white shadow rounded mt-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-6 py-3">Nombre</th>
            <th className="border px-6 py-3">Correo</th>
            <th className="border px-6 py-3">Teléfono</th>
            <th className="border px-6 py-3">Curso</th>
            <th className="border px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno) => (
            <tr key={alumno.id} className="text-center">
              <td className="border px-6 py-3 whitespace-nowrap">{alumno.nombre}</td>
              <td className="border px-6 py-3 whitespace-nowrap">{alumno.correo}</td>
              <td className="border px-6 py-3 whitespace-nowrap">{alumno.telefono}</td>
              <td className="border px-6 py-3 whitespace-nowrap">
                {getCursoNombre(alumno.cursoId)}
              </td>
              <td className="border px-6 py-3 whitespace-nowrap space-x-2">
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
    </div>
  );
};

export default AlumnosList;
