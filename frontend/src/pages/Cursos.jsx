import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import CursoForm from "../components/CursoForm";

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  const [cursoEditando, setCursoEditando] = useState(null);

  const fetchCursos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/cursos");
      setCursos(response.data);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  };

  const handleEliminar = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/api/cursos/${id}`);
          fetchCursos();
          Swal.fire("Eliminado", "El curso ha sido eliminado.", "success");
        } catch {
          Swal.fire("Error", "No se pudo eliminar el curso.", "error");
        }
      }
    });
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestión de Cursos</h1>

      <CursoForm
        cursoEditando={cursoEditando}
        onSuccess={() => {
          fetchCursos();
          setCursoEditando(null);
        }}
        onCancel={() => setCursoEditando(null)}
      />

      <table className="w-full table-auto border border-gray-300 mt-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((curso) => (
            <tr key={curso.id} className="text-center">
              <td className="border px-4 py-2">{curso.id}</td>
              <td className="border px-4 py-2">{curso.nombre}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                  onClick={() => setCursoEditando(curso)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleEliminar(curso.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {cursos.length === 0 && (
            <tr>
              <td colSpan="3" className="border px-4 py-4 text-center text-gray-500">
                No hay cursos disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Cursos;
