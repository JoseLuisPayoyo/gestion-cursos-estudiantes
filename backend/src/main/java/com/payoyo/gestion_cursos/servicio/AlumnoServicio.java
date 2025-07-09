package com.payoyo.gestion_cursos.servicio;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payoyo.gestion_cursos.dto.AlumnoDTO;
import com.payoyo.gestion_cursos.exception.RecursoNoEncontradoException;
import com.payoyo.gestion_cursos.mapper.AlumnoMapper;
import com.payoyo.gestion_cursos.modelo.Alumno;
import com.payoyo.gestion_cursos.modelo.Curso;
import com.payoyo.gestion_cursos.repositorio.AlumnoRepositorio;
import com.payoyo.gestion_cursos.repositorio.CursoRepositorio;

@Service
public class AlumnoServicio implements IAlumnoServicio{

    @Autowired
    private AlumnoRepositorio alumnoRepositorio;

    @Autowired
    private CursoRepositorio cursoRepositorio;

    @Override
    public List<AlumnoDTO> listarAlumnos() {
        //pasamos a lista y devolvemos
        return alumnoRepositorio.findAll()
            .stream()
            .map(AlumnoMapper::toDTO)
            .collect(Collectors.toList());
    }

    @Override
    public AlumnoDTO crearAlumno(AlumnoDTO alumnoDTO) {
        //buscamos el curso
        Curso curso = cursoRepositorio.findById(alumnoDTO.getCursoId())
            .orElseThrow(() -> new RecursoNoEncontradoException("Curso no encontrado con ID: " + alumnoDTO.getCursoId()));
        
        //convertimos a entidad
        Alumno alumno = AlumnoMapper.toEntity(alumnoDTO, curso); 
        
        //guardamos en la db
        Alumno alumnoGuardado = alumnoRepositorio.save(alumno);

        //devolvemos el dto
        return AlumnoMapper.toDTO(alumnoGuardado);
    }

    @Override
    public AlumnoDTO buscarAlumnoPorId(Long id) {
        //buscamos por id
        Alumno alumno = alumnoRepositorio.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Alumno no encontrado con ID: " + id));

        //devolvemos el dto    
        return AlumnoMapper.toDTO(alumno);   
    }

    @Override
    public AlumnoDTO actualizarAlumno(Long id, AlumnoDTO alumnoDTO) {
        //buscamos el existente
        Alumno alumno = alumnoRepositorio.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Alumno no encontrado con ID: " + id));

        //buscamos su curso
        Curso curso = cursoRepositorio.findById(alumnoDTO.getCursoId())
            .orElseThrow(() -> new RecursoNoEncontradoException("Curso no encontrado con ID: " + id));
            
        //actualizamos sus datos
        alumno.setNombre(alumnoDTO.getNombre());
        alumno.setCorreo(alumnoDTO.getCorreo());
        alumno.setTelefono(alumnoDTO.getTelefono());
        alumno.setCurso(curso);
        
        //guardamos
        Alumno alumnoGuardado = alumnoRepositorio.save(alumno);

        //devolvemos el dto
        return AlumnoMapper.toDTO(alumnoGuardado);
    }

    @Override
    public void eliminarAlumno(Long id) {
        //buscamos el id
        alumnoRepositorio.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Alumno no encontrado con ID: " + id));

        //eliminamos
        alumnoRepositorio.deleteById(id);
    }
    
}
