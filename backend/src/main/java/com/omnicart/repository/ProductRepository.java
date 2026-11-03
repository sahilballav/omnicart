package com.omnicart.repository;

import com.omnicart.model.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, String>, JpaSpecificationExecutor<ProductEntity> {

    List<ProductEntity> findByCategory(String category);

    Page<ProductEntity> findByCategory(String category, Pageable pageable);

    @Query(value = "SELECT * FROM products WHERE price <= :maxPrice ORDER BY price ASC", nativeQuery = true)
    List<ProductEntity> findByMaxPrice(@Param("maxPrice") BigDecimal maxPrice);

    // Native PostgreSQL JSONB attribute query
    @Query(value = "SELECT * FROM products WHERE attributes ->> :attributeKey = :attributeValue", nativeQuery = true)
    List<ProductEntity> findByJsonbAttribute(@Param("attributeKey") String attributeKey, @Param("attributeValue") String attributeValue);

    // Native PostgreSQL JSONB GIN containment query
    @Query(value = "SELECT * FROM products WHERE attributes @> CAST(:jsonCriteria AS jsonb)", nativeQuery = true)
    List<ProductEntity> findByJsonbCriteria(@Param("jsonCriteria") String jsonCriteria);
}
