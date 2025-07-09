import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Cursos = () => {
  const [cursos, setCursos] = useState([]);

  const fetchCursos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/cursos");
      setCursos(response.data);
    } catch (error) {
      console.error("Error al cargar cursos:", error);
    }
  };

  const handleEliminar = async (id) => {
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmacion.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/cursos/${id}`);
        Swal.fire("Curso eliminado", "", "success");
        fetchCursos();
      } catch (error) {
        console.error("Error al eliminar curso:", error);
        Swal.fire("Error al eliminar", "", "error");
      }
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Cursos</h1>
      <table className="w-full table-auto border border-gray-300">
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
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600">
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
        </tbody>
      </table>
    </div>
  );
};

export default Cursos;
