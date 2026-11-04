package com.omnicart.repository;

import com.omnicart.model.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, String> {

    List<OrderEntity> findByUserId(String userId);

    List<OrderEntity> findByStatus(String status);
}

