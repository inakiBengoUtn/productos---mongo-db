package com.productos.mongodb.dto.request;

import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
public class ProductFilterRequest {
    private String name;
    private Double minPrice;
    private Integer stock;
    private Boolean active;
}
