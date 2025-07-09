package com.payoyo.gestion_cursos.servicio;

import java.util.List;

import com.payoyo.gestion_cursos.dto.AlumnoDTO;

public interface IAlumnoServicio {

    List<AlumnoDTO> listarAlumnos();

    AlumnoDTO crearAlumno(AlumnoDTO alumnoDTO);

    AlumnoDTO buscarAlumnoPorId(Long id);

    AlumnoDTO actualizarAlumno(Long id, AlumnoDTO alumnoDTO);

    void eliminarAlumno(Long id);

}
