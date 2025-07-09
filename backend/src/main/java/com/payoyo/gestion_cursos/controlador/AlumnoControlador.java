package com.payoyo.gestion_cursos.controlador;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payoyo.gestion_cursos.dto.AlumnoDTO;
import com.payoyo.gestion_cursos.servicio.IAlumnoServicio;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("api/alumnos")
@CrossOrigin(origins = "*")
public class AlumnoControlador {
    
    @Autowired
    private IAlumnoServicio alumnoServicio;

    //listar alumnos
    @GetMapping
    public List<AlumnoDTO> listarAlumnos(){
        return alumnoServicio.listarAlumnos();
    }

    //buscar alumno por id
    @GetMapping("/{id}")
    public AlumnoDTO buscarAlumnoPorId(@PathVariable Long id){
        return alumnoServicio.buscarAlumnoPorId(id);
    }

    //crear alumnos
    @PostMapping
    public AlumnoDTO crearAlumno(@Valid @RequestBody AlumnoDTO alumnoDTO){
        return alumnoServicio.crearAlumno(alumnoDTO);
    }

    //actualizar alumno
    @PutMapping("/{id}")
    public AlumnoDTO actualizarAlumno(@PathVariable Long id, @Valid @RequestBody AlumnoDTO alumnoDTO){
        return alumnoServicio.actualizarAlumno(id, alumnoDTO);
    }

    //eliminar alumno
    @DeleteMapping("/{id}")
    public void eliminarAlumno(@PathVariable Long id){
        alumnoServicio.eliminarAlumno(id);
    }


}
