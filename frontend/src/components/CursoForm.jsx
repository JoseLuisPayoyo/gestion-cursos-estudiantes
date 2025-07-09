import React, { useState, useEffect } from "react";
import axios from "axios";

const CursoForm = ({ cursoEditando, onSuccess, onCancel }) => {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (cursoEditando) {
      setNombre(cursoEditando.nombre);
    } else {
      setNombre("");
    }
  }, [cursoEditando]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (cursoEditando) {
        await axios.put(`http://localhost:8080/api/cursos/${cursoEditando.id}`, { nombre });
      } else {
        await axios.post("http://localhost:8080/api/cursos", { nombre });
      }
      onSuccess(); // recarga la tabla
      setNombre("");
    } catch (error) {
      console.error("Error al guardar el curso:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2 className="text-xl font-semibold mb-2">
        {cursoEditando ? "Editar Curso" : "Nuevo Curso"}
      </h2>
      <div className="mb-2">
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del curso"
          className="border px-3 py-2 rounded w-full"
          required
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Guardar
        </button>
        {cursoEditando && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default CursoForm;
