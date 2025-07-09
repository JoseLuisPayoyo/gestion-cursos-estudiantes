import React, { useEffect, useState } from 'react'
import AlumnoList from '../components/AlumnosList'

const Alumnos = () => {
  const [alumnos, setAlumnos] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/api/alumnos')
      .then(res => res.json())
      .then(data => setAlumnos(data))
      .catch(err => console.error('Error al cargar alumnos:', err))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Listado de Alumnos</h1>
      <AlumnoList alumnos={alumnos} />
    </div>
  )
}

export default Alumnos
