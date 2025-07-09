package com.payoyo.gestion_cursos.servicio;

import java.util.List;

import com.payoyo.gestion_cursos.dto.CursoDTO;

public interface ICursoServicio {

    List<CursoDTO> listarCursos();

    CursoDTO crearCurso(CursoDTO cursoDTO);

    CursoDTO buscarCursoPorId(Long id);

    CursoDTO actualizarCurso(Long id, CursoDTO cursoDTO);

    void eliminarCurso(Long id);
}
