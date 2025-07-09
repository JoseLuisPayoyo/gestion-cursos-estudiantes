package com.payoyo.gestion_cursos.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AlumnoDTO {

    private Long id;

    @NotBlank(message = "El nombre no puede ir vacio")
    private String nombre;

    @Email(message = "El correo no tiene un formato válido")
    @NotBlank(message = "El correo no puede ir vacío")  
    private String correo;

    @Size(min = 9, max = 9)
    @NotBlank(message = "El telefono no puede ir vacio")
    private String telefono;

    @NotNull(message = "El ID de curso es obligatorio")
    private Long cursoId;

    private String cursoNombre;

    
}
