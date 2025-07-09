package com.payoyo.gestion_cursos.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payoyo.gestion_cursos.modelo.Alumno;

public interface AlumnoRepositorio extends JpaRepository<Alumno, Long>{} 
