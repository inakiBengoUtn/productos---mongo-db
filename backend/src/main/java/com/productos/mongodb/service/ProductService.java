package com.productos.mongodb.service;

import com.productos.mongodb.dto.request.CreateProductRequest;
import com.productos.mongodb.dto.request.ProductFilterRequest;
import com.productos.mongodb.dto.responses.ProductResponse;
import com.productos.mongodb.model.Product;
import com.productos.mongodb.repo.ProductRepo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepo repo;
    private final MongoTemplate mongoTemplate;

    public Product createProduct(final CreateProductRequest request) {
        Product product = Product.builder()
                .name(request.getName())
                .price(request.getPrice())
                .details(request.getDetails())
                .stock(request.getStock())
                .active(true)
                .build();

        return repo.save(product);
    }

    public List<ProductResponse> findAll(ProductFilterRequest request) {
        Query query = new Query();
        List<Criteria> criteria = new ArrayList<>();
        String name = request.getName();
        Double minPrice = request.getMinPrice();
        Integer stock = request.getStock();
        Boolean active = request.getActive();

        if (name != null && !name.isBlank()) {
            criteria.add(Criteria.where("name").regex(name, "i")); // búsqueda tipo LIKE
        }
        if (minPrice != null && minPrice >= 0) {
            criteria.add(Criteria.where("price").gte(minPrice));
        }
        if (stock != null && stock >= 0) {
            criteria.add(Criteria.where("stock").gte(stock));
        }
        if (active != null) {
            criteria.add(Criteria.where("active").is(active));
        }

        if (!criteria.isEmpty()) {
            query.addCriteria(new Criteria().andOperator(criteria));
        }
        return mongoTemplate.find(query, Product.class)
                .stream()
                .map(this::toProductResponse)
                .toList();
    }

    private ProductResponse toProductResponse(Product p) {
        ProductResponse productResponse = new ProductResponse();
        productResponse.setId(p.getId());
        productResponse.setName(p.getName());
        productResponse.setPrice(p.getPrice());
        productResponse.setDetails(p.getDetails());
        productResponse.setStock(p.getStock());
        return productResponse;
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
