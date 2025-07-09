package com.payoyo.gestion_cursos.mapper;

import com.payoyo.gestion_cursos.dto.CursoDTO;
import com.payoyo.gestion_cursos.modelo.Curso;

public class CursoMapper {

    public static CursoDTO toDTO(Curso curso){
        if (curso == null) return null;

        CursoDTO cursoDTO = new CursoDTO();
        
        cursoDTO.setId(curso.getId());
        cursoDTO.setNombre(curso.getNombre());
        cursoDTO.setDescripcion(curso.getDescripcion());
        cursoDTO.setDuracionHoras(curso.getDuracionHoras());

        return cursoDTO;
    }

    public static Curso toEntity(CursoDTO cursoDTO){
        if (cursoDTO == null) return null;

        Curso curso = new Curso();

        curso.setId(cursoDTO.getId());
        curso.setNombre(cursoDTO.getNombre());
        curso.setDescripcion(cursoDTO.getDescripcion());
        curso.setDuracionHoras(cursoDTO.getDuracionHoras());

        return curso;
    }
    
}
