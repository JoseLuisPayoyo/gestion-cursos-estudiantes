package com.payoyo.gestion_cursos.mapper;

import com.payoyo.gestion_cursos.dto.AlumnoDTO;
import com.payoyo.gestion_cursos.modelo.Alumno;
import com.payoyo.gestion_cursos.modelo.Curso;

public class AlumnoMapper {

    public static AlumnoDTO toDTO(Alumno alumno){
        AlumnoDTO alumnoDTO = new AlumnoDTO();

        alumnoDTO.setId(alumno.getId());
        alumnoDTO.setNombre(alumno.getNombre());
        alumnoDTO.setCorreo(alumno.getCorreo());
        alumnoDTO.setTelefono(alumno.getTelefono());
        alumnoDTO.setCursoId(alumno.getCurso().getId());

        return alumnoDTO;
    }

    public static Alumno toEntity(AlumnoDTO alumnoDTO, Curso curso){
        Alumno alumno = new Alumno();
        
        alumno.setId(alumnoDTO.getId());
        alumno.setNombre(alumnoDTO.getNombre());
        alumno.setCorreo(alumnoDTO.getCorreo());
        alumno.setTelefono(alumnoDTO.getTelefono());
        alumno.setCurso(curso);

        return alumno;
    }
    
}
