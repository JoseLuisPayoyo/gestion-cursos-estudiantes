import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CursoForm = ({ fetchCursos, modo = "crear", cursoEditar = null, onCancel }) => {
  const [nombre, setNombre] = useState(cursoEditar?.nombre || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nombre.trim() === "") return Swal.fire("Error", "El nombre no puede estar vacío", "error");

    try {
      if (modo === "crear") {
        await axios.post("http://localhost:8080/api/cursos", { nombre });
        Swal.fire("Curso creado", "", "success");
      } else {
        await axios.put(`http://localhost:8080/api/cursos/${cursoEditar.id}`, { nombre });
        Swal.fire("Curso actualizado", "", "success");
      }

      fetchCursos();
      setNombre("");
      if (onCancel) onCancel(); // Para cerrar el formulario de edición
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "No se pudo guardar el curso", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del curso"
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
        {modo === "crear" ? "Crear curso" : "Actualizar curso"}
      </button>
      {modo === "editar" && (
        <button
          type="button"
          onClick={onCancel}
          className="ml-2 bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
        >
          Cancelar
        </button>
      )}
    </form>
  );
};

export default CursoForm;
