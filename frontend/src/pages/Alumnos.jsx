import React, { useEffect, useState } from "react";
import AlumnoForm from "../components/AlumnoForm";
import AlumnosList from "../components/AlumnosList";

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  const fetchAlumnos = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/alumnos");
      const data = await res.json();
      setAlumnos(data);

      const cursosRes = await fetch("http://localhost:8080/api/cursos");
      const cursosData = await cursosRes.json();
      setCursos(cursosData);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  const handleEdit = (alumno) => {
    setAlumnoSeleccionado(alumno);
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Gestión de Alumnos</h1>

      <AlumnoForm
        onSuccess={() => {
          fetchAlumnos();
          setAlumnoSeleccionado(null);
        }}
        alumnoEditado={alumnoSeleccionado}
      />

      <AlumnosList
        alumnos={alumnos}
        cursos={cursos}
        onEdit={handleEdit}
        fetchAlumnos={fetchAlumnos}
      />
    </div>
  );
};

export default Alumnos;
