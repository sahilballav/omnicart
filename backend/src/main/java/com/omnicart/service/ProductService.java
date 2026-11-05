package com.omnicart.service;

import com.omnicart.dto.ProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {

    Page<ProductDTO> getProducts(String category, String query, BigDecimal maxPrice, Pageable pageable);

    List<ProductDTO> getAllProducts();

    ProductDTO getProductById(String id);

    ProductDTO createProduct(ProductDTO productDTO);

    ProductDTO updateProduct(String id, ProductDTO productDTO);

    ProductDTO updateInventory(String id, int quantity);

    void deleteProduct(String id);

    List<ProductDTO> searchByJsonbAttribute(String key, String value);
}

