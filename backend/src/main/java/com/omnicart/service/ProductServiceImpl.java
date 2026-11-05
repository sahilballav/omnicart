package com.omnicart.service;

import com.omnicart.dto.ProductDTO;
import com.omnicart.exception.ResourceNotFoundException;
import com.omnicart.model.ProductEntity;
import com.omnicart.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<ProductDTO> getProducts(String category, String query, BigDecimal maxPrice, Pageable pageable) {
        Specification<ProductEntity> spec = Specification.where(null);

        if (category != null && !category.isBlank() && !category.equalsIgnoreCase("All")) {
            spec = spec.and((root, q, cb) -> cb.equal(cb.lower(root.get("category")), category.toLowerCase()));
        }

        if (query != null && !query.isBlank()) {
            String pattern = "%" + query.toLowerCase().trim() + "%";
            spec = spec.and((root, q, cb) -> cb.or(
                    cb.like(cb.lower(root.get("name")), pattern),
                    cb.like(cb.lower(root.get("brand")), pattern),
                    cb.like(cb.lower(root.get("description")), pattern)
            ));
        }

        if (maxPrice != null && maxPrice.compareTo(BigDecimal.ZERO) > 0) {
            spec = spec.and((root, q, cb) -> cb.lessThanOrEqualTo(root.get("price"), maxPrice));
        }

        return productRepository.findAll(spec, pageable).map(this::mapToDTO);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ProductDTO getProductById(String id) {
        ProductEntity entity = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));
        return mapToDTO(entity);
    }

    @Override
    @Transactional
    public ProductDTO createProduct(ProductDTO dto) {
        String id = dto.getId() != null && !dto.getId().isBlank() ? dto.getId() : "prod-" + UUID.randomUUID().toString().substring(0, 8);
        ProductEntity entity = ProductEntity.builder()
                .id(id)
                .name(dto.getName())
                .description(dto.getDescription())
                .price(dto.getPrice())
                .category(dto.getCategory())
                .brand(dto.getBrand())
                .rating(dto.getRating() != null ? dto.getRating() : new BigDecimal("5.00"))
                .reviewCount(dto.getReviewCount() != null ? dto.getReviewCount() : 0)
                .inventoryCount(dto.getInventoryCount() != null ? dto.getInventoryCount() : 100)
                .images(dto.getImages() != null ? dto.getImages() : List.of())
                .tags(dto.getTags() != null ? dto.getTags() : List.of())
                .attributes(dto.getAttributes() != null ? dto.getAttributes() : java.util.Map.of())
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        ProductEntity saved = productRepository.save(entity);
        log.info("Created new digital product asset: {} ({})", saved.getName(), saved.getId());
        return mapToDTO(saved);
    }

    @Override
    @Transactional
    public ProductDTO updateProduct(String id, ProductDTO dto) {
        ProductEntity entity = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setPrice(dto.getPrice());
        entity.setCategory(dto.getCategory());
        entity.setBrand(dto.getBrand());
        if (dto.getInventoryCount() != null) {
            entity.setInventoryCount(dto.getInventoryCount());
        }
        if (dto.getImages() != null) {
            entity.setImages(dto.getImages());
        }
        if (dto.getTags() != null) {
            entity.setTags(dto.getTags());
        }
        if (dto.getAttributes() != null) {
            entity.setAttributes(dto.getAttributes());
        }
        entity.setUpdatedAt(Instant.now());

        ProductEntity updated = productRepository.save(entity);
        log.info("Updated product asset: {}", updated.getId());
        return mapToDTO(updated);
    }

    @Override
    @Transactional
    public ProductDTO updateInventory(String id, int quantity) {
        ProductEntity entity = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", id));

        entity.setInventoryCount(Math.max(0, quantity));
        entity.setUpdatedAt(Instant.now());
        ProductEntity saved = productRepository.save(entity);
        log.info("Adjusted inventory for product {} to {}", id, quantity);
        return mapToDTO(saved);
    }

    @Override
    @Transactional
    public void deleteProduct(String id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product", "id", id);
        }
        productRepository.deleteById(id);
        log.info("Deleted product asset: {}", id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDTO> searchByJsonbAttribute(String key, String value) {
        return productRepository.findByJsonbAttribute(key, value).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private ProductDTO mapToDTO(ProductEntity entity) {
        return ProductDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .price(entity.getPrice())
                .category(entity.getCategory())
                .brand(entity.getBrand())
                .rating(entity.getRating())
                .reviewCount(entity.getReviewCount())
                .inventoryCount(entity.getInventoryCount())
                .images(entity.getImages())
                .tags(entity.getTags())
                .attributes(entity.getAttributes())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}

