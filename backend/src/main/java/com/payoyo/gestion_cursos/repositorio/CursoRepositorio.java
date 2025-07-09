package com.payoyo.gestion_cursos.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payoyo.gestion_cursos.modelo.Curso;

public interface CursoRepositorio extends JpaRepository<Curso, Long>{} 
