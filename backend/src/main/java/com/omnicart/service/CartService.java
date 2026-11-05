package com.omnicart.service;

import com.omnicart.model.Cart;

public interface CartService {

    Cart getCart(String sessionId);

    Cart addToCart(String sessionId, String productId, int quantity, String license);

    Cart updateQuantity(String sessionId, String productId, int quantity);

    Cart removeFromCart(String sessionId, String productId);

    void clearCart(String sessionId);
}

