package com.productos.mongodb.controller;

import com.productos.mongodb.dto.request.CreateProductRequest;
import com.productos.mongodb.dto.responses.ProductResponse;
import com.productos.mongodb.model.Product;
import com.productos.mongodb.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@Slf4j
public class ProductController {
    private final ProductService service;

    @PostMapping
    public ResponseEntity createProduct(@RequestBody @Valid CreateProductRequest request) {
        Product p = service.createProduct(request);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(p.getId())
                .toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> findAll() {
        List<ProductResponse> allProducts = service.findAll();
        return ResponseEntity.ok(allProducts);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        service.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("{id}")
    public ResponseEntity<ProductResponse> findProductById(@PathVariable String id) {
        try {
            ProductResponse p = service.getProductById(id);
            return ResponseEntity.ok(p);
        } catch (ChangeSetPersister.NotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
