// src/components/AlumnoForm.jsx
import React, { useState, useEffect } from "react";

const AlumnoForm = ({ onSuccess, alumnoEditado }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cursoId, setCursoId] = useState("");
  const [cursos, setCursos] = useState([]);

  // Cargar cursos al montar
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/cursos");
        const data = await res.json();
        setCursos(data);
      } catch (error) {
        console.error("Error al cargar cursos:", error);
      }
    };

    fetchCursos();
  }, []);

  // Si estamos editando, cargar datos en el formulario
  useEffect(() => {
    if (alumnoEditado) {
      setNombre(alumnoEditado.nombre);
      setCorreo(alumnoEditado.correo);
      setTelefono(alumnoEditado.telefono);
      setCursoId(alumnoEditado.cursoId.toString());
    } else {
      setNombre("");
      setCorreo("");
      setTelefono("");
      setCursoId("");
    }
  }, [alumnoEditado]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const datosAlumno = {
      nombre,
      correo,
      telefono,
      cursoId: parseInt(cursoId),
    };

    try {
      const url = alumnoEditado
        ? `http://localhost:8080/api/alumnos/${alumnoEditado.id}`
        : "http://localhost:8080/api/alumnos";

      const method = alumnoEditado ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosAlumno),
      });

      if (!res.ok) throw new Error("Error al guardar alumno");

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al guardar el alumno.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md mb-10"
    >
      <h2 className="text-xl font-bold mb-4 text-center">
        {alumnoEditado ? "Editar Alumno" : "Añadir Alumno"}
      </h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Nombre</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Correo</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Teléfono</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium">Curso</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={cursoId}
          onChange={(e) => setCursoId(e.target.value)}
          required
        >
          <option value="">Selecciona un curso</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nombre}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {alumnoEditado ? "Actualizar Alumno" : "Guardar Alumno"}
      </button>
    </form>
  );
};

export default AlumnoForm;
