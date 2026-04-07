package com.productos.mongodb.dto.responses;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;
import java.util.UUID;

@Getter
@Setter
public class ProductResponse {
    private String id;
    private String name;
    private Double price;
    private Map<String, Object> details;
}
