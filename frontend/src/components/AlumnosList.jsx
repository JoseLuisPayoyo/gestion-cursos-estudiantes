import React from 'react'

const AlumnoList = ({ alumnos }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Nombre</th>
            <th className="p-2">Correo</th>
            <th className="p-2">Teléfono</th>
            <th className="p-2">Curso ID</th>
          </tr>
        </thead>
        <tbody>
          {alumnos.map((alumno) => (
            <tr key={alumno.id} className="border-t">
              <td className="p-2">{alumno.nombre}</td>
              <td className="p-2">{alumno.correo}</td>
              <td className="p-2">{alumno.telefono}</td>
              <td className="p-2">{alumno.cursoId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AlumnoList
