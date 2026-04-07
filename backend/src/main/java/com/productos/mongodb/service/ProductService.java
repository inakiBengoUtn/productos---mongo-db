package com.productos.mongodb.service;

import com.productos.mongodb.dto.request.CreateProductRequest;
import com.productos.mongodb.dto.responses.ProductResponse;
import com.productos.mongodb.model.Product;
import com.productos.mongodb.repo.ProductRepo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepo repo;

    public Product createProduct(final CreateProductRequest request) {
        Product product = Product.builder()
                .name(request.getName())
                .price(request.getPrice())
                .details(request.getDetails())
                .build();

        return repo.save(product);
    }

    public List<ProductResponse> findAll() {
        List<Product> allProducts = repo.findAll();

        return allProducts.stream().map(p -> {
            ProductResponse productResponse = new ProductResponse();
            productResponse.setId(p.getId());
            productResponse.setName(p.getName());
            productResponse.setPrice(p.getPrice());
            productResponse.setDetails(p.getDetails());
            return productResponse;
        }).toList();
    }

    public ProductResponse getProductById(final String id) throws ChangeSetPersister.NotFoundException {
        // Busca por id, si no encuentra lanza error NotFoundException
        Product p = repo.findById(id).orElseThrow(ChangeSetPersister.NotFoundException::new);
        ProductResponse pResponse = new ProductResponse();
        pResponse.setId(p.getId());
        pResponse.setName(p.getName());
        pResponse.setPrice(p.getPrice());
        pResponse.setDetails(p.getDetails());
        return pResponse;
    }

    public void deleteProduct(final String id) {
        repo.deleteById(id);
    }
}
