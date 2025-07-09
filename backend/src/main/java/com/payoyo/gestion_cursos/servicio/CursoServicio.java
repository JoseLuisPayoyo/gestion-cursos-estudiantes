package com.payoyo.gestion_cursos.servicio;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.payoyo.gestion_cursos.dto.CursoDTO;
import com.payoyo.gestion_cursos.exception.RecursoNoEncontradoException;
import com.payoyo.gestion_cursos.mapper.CursoMapper;
import com.payoyo.gestion_cursos.modelo.Curso;
import com.payoyo.gestion_cursos.repositorio.CursoRepositorio;

@Service
public class CursoServicio implements ICursoServicio{

    @Autowired
    private CursoRepositorio cursoRepositorio;

    @Override
    public List<CursoDTO> listarCursos() {
        return cursoRepositorio.findAll()
            .stream()
            .map(CursoMapper::toDTO)
            .collect(Collectors.toList());
    }

    @Override
    public CursoDTO crearCurso(CursoDTO cursoDTO) {
        //pasar a entidad
        Curso curso = CursoMapper.toEntity(cursoDTO);
        //guardar en db
        cursoRepositorio.save(curso);
        //devolver dto
        return CursoMapper.toDTO(curso);
    }

    @Override
    public CursoDTO buscarCursoPorId(Long id) {
        //buscamos o excepcion
        Curso curso = cursoRepositorio.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Curso no encontrado con id: " + id));
        //devolvemos el dto
        return CursoMapper.toDTO(curso);
    }

    @Override
    public CursoDTO actualizarCurso(Long id, CursoDTO cursoDTO) {
        //buscamos o excepcion
        Curso curso = cursoRepositorio.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Curso no encontrado con id: " + id));
        
        curso.setNombre(cursoDTO.getNombre());
        curso.setDescripcion(cursoDTO.getDescripcion());
        curso.setDuracionHoras(cursoDTO.getDuracionHoras());
        
        Curso cursoActualizado = cursoRepositorio.save(curso);
        return CursoMapper.toDTO(cursoActualizado);
    }

    @Override
    public void eliminarCurso(Long id) {
        //buscamos o excepcion
        Curso curso = cursoRepositorio.findById(id)
            .orElseThrow(() -> new RecursoNoEncontradoException("Curso no encontrado con id: " + id));
        cursoRepositorio.delete(curso);
    }
    
}
