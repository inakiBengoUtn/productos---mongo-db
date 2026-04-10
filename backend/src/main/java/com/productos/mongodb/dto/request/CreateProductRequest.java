package com.productos.mongodb.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class CreateProductRequest {
    @NotBlank
    private String name;
    @PositiveOrZero
    private Double price;
    @NotNull
    private Map<String, Object> details;
    @PositiveOrZero
    private Integer stock;
}
