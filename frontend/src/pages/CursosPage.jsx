import { useEffect, useState } from "react";
import { getCursos } from "../services/cursoService";

function CursosPage() {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    getCursos()
      .then(response => setCursos(response.data))
      .catch(error => console.error("Error al obtener cursos:", error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Listado de Cursos</h2>
      <ul className="space-y-4">
        {cursos.map(curso => (
          <li key={curso.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{curso.nombre}</h3>
            <p className="text-gray-700">{curso.descripcion}</p>
            <p className="text-sm text-gray-500">Duración: {curso.duracionHoras} horas</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CursosPage;
