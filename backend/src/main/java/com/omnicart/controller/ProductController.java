package com.omnicart.controller;

import com.omnicart.dto.ApiResponse;
import com.omnicart.dto.ProductDTO;
import com.omnicart.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000"})
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<ProductDTO>>> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String q,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        Page<ProductDTO> products = productService.getProducts(category, q, maxPrice, pageable);
        return ResponseEntity.ok(ApiResponse.of("Products retrieved successfully", products));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getAllProducts() {
        List<ProductDTO> products = productService.getAllProducts();
        return ResponseEntity.ok(ApiResponse.of("All catalog products retrieved", products));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDTO>> getProductById(@PathVariable String id) {
        ProductDTO product = productService.getProductById(id);
        return ResponseEntity.ok(ApiResponse.of("Product details retrieved", product));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductDTO>> createProduct(@Valid @RequestBody ProductDTO productDTO) {
        ProductDTO created = productService.createProduct(productDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.of("Product created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDTO>> updateProduct(
            @PathVariable String id,
            @Valid @RequestBody ProductDTO productDTO
    ) {
        ProductDTO updated = productService.updateProduct(id, productDTO);
        return ResponseEntity.ok(ApiResponse.of("Product updated successfully", updated));
    }

    @PatchMapping("/{id}/inventory")
    public ResponseEntity<ApiResponse<ProductDTO>> updateInventory(
            @PathVariable String id,
            @RequestParam int count
    ) {
        ProductDTO updated = productService.updateInventory(id, count);
        return ResponseEntity.ok(ApiResponse.of("Inventory count adjusted", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.of("Product deleted successfully", null));
    }

    @GetMapping("/search/jsonb")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> searchByJsonbAttribute(
            @RequestParam String key,
            @RequestParam String value
    ) {
        List<ProductDTO> results = productService.searchByJsonbAttribute(key, value);
        return ResponseEntity.ok(ApiResponse.of("JSONB attribute search completed", results));
    }
}

