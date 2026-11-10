package com.omnicart.service;

import com.omnicart.dto.order.CheckoutRequest;
import com.omnicart.dto.order.CheckoutResponse;
import com.omnicart.dto.order.OrderDTO;

import java.util.List;

public interface OrderService {

    CheckoutResponse processCheckout(CheckoutRequest request);

    OrderDTO getOrderById(String orderId);

    List<OrderDTO> getOrdersByUserId(String userId);

    List<OrderDTO> getAllOrders();
}
