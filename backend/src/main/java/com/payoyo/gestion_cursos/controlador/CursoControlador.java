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

import com.payoyo.gestion_cursos.dto.CursoDTO;
import com.payoyo.gestion_cursos.servicio.ICursoServicio;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("api/cursos")
@CrossOrigin(origins = "*")
public class CursoControlador {
    
    @Autowired
    private ICursoServicio cursoServicio;

    //listar todos
    @GetMapping
    public List<CursoDTO> listarCursos(){
        return cursoServicio.listarCursos();
    }

    //listar por id
    @GetMapping("/{id}")
    public CursoDTO listarCursoPorId(@PathVariable Long id){
        return cursoServicio.buscarCursoPorId(id);
    }

    //crear uno
    @PostMapping
    public CursoDTO crearCurso(@Valid @RequestBody CursoDTO cursoDTO){
        return cursoServicio.crearCurso(cursoDTO);
    }

    //actualizar
    @PutMapping("/{id}")
    public CursoDTO actualizarCurso(@PathVariable Long id, @Valid @RequestBody CursoDTO cursoDTO) {
        return cursoServicio.actualizarCurso(id, cursoDTO);
    }

    //eliminar
    @DeleteMapping("/{id}")
    public void eliminarCurso(@PathVariable Long id){
        cursoServicio.eliminarCurso(id);
    }
    
}
