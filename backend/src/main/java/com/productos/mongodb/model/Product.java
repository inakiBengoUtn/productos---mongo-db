package com.productos.mongodb.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;
import java.util.UUID;

@Data
@Builder
@Document(collection = "product")
public class Product {
    @Id
    private String id;
    private String name;
    private Double price;
    private Map<String, Object> details;
    private Integer stock;
    private boolean active;
}
