package com.payoyo.gestion_cursos.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CursoDTO {

    private Long id;

    @NotBlank(message = "El nombre no puede ir vacio")
    private String nombre;

    @Size(max = 150, message = "La descripcion del curso no puede ser superior a 150 caracteres")
    private String descripcion;

    private int duracionHoras;
    
}
