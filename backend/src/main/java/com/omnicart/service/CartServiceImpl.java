package com.omnicart.service;

import com.omnicart.exception.ResourceNotFoundException;
import com.omnicart.model.Cart;
import com.omnicart.model.CartItem;
import com.omnicart.model.ProductEntity;
import com.omnicart.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ProductRepository productRepository;

    private static final String CART_KEY_PREFIX = "omnicart:cart:";
    private static final Duration CART_TTL = Duration.ofHours(24);

    private String getCartKey(String sessionId) {
        return CART_KEY_PREFIX + sessionId;
    }

    @Override
    public Cart getCart(String sessionId) {
        String key = getCartKey(sessionId);
        Object cached = redisTemplate.opsForValue().get(key);

        if (cached instanceof Cart cart) {
            return cart;
        }

        Cart newCart = Cart.builder()
                .sessionId(sessionId)
                .items(new ArrayList<>())
                .build();
        newCart.recalculateTotals();
        saveCart(newCart);
        return newCart;
    }

    @Override
    public Cart addToCart(String sessionId, String productId, int quantity, String license) {
        Cart cart = getCart(sessionId);

        ProductEntity product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id", productId));

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId) &&
                        (license == null || license.equals(item.getSelectedLicense())))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            String img = product.getImages() != null && !product.getImages().isEmpty()
                    ? product.getImages().get(0)
                    : "";

            CartItem newItem = CartItem.builder()
                    .productId(product.getId())
                    .productName(product.getName())
                    .price(product.getPrice())
                    .quantity(Math.max(1, quantity))
                    .selectedLicense(license != null ? license : "Commercial License")
                    .imageUrl(img)
                    .build();

            cart.getItems().add(newItem);
        }

        cart.recalculateTotals();
        saveCart(cart);
        log.info("Session {} added item {} to cart. Total items: {}", sessionId, productId, cart.getTotalQuantity());
        return cart;
    }

    @Override
    public Cart updateQuantity(String sessionId, String productId, int quantity) {
        Cart cart = getCart(sessionId);

        if (quantity <= 0) {
            return removeFromCart(sessionId, productId);
        }

        cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst()
                .ifPresent(item -> item.setQuantity(quantity));

        cart.recalculateTotals();
        saveCart(cart);
        return cart;
    }

    @Override
    public Cart removeFromCart(String sessionId, String productId) {
        Cart cart = getCart(sessionId);
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        cart.recalculateTotals();
        saveCart(cart);
        log.info("Session {} removed item {} from cart", sessionId, productId);
        return cart;
    }

    @Override
    public void clearCart(String sessionId) {
        String key = getCartKey(sessionId);
        redisTemplate.delete(key);
        log.info("Session {} cart cleared from Redis cache", sessionId);
    }

    private void saveCart(Cart cart) {
        String key = getCartKey(cart.getSessionId());
        redisTemplate.opsForValue().set(key, cart, CART_TTL);
    }
}

