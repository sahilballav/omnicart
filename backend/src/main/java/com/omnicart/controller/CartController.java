package com.omnicart.controller;

import com.omnicart.dto.ApiResponse;
import com.omnicart.model.Cart;
import com.omnicart.service.CartService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000"})
public class CartController {

    private final CartService cartService;

    private String resolveSessionId(String sessionId) {
        if (sessionId == null || sessionId.isBlank()) {
            return "sess-" + UUID.randomUUID();
        }
        return sessionId;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Cart>> getCart(
            @RequestHeader(value = "X-Session-ID", required = false) String sessionId
    ) {
        String activeSession = resolveSessionId(sessionId);
        Cart cart = cartService.getCart(activeSession);
        return ResponseEntity.ok(ApiResponse.of("Shopping cart retrieved", cart));
    }

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<Cart>> addItem(
            @RequestHeader(value = "X-Session-ID", required = false) String sessionId,
            @RequestBody AddItemRequest request
    ) {
        String activeSession = resolveSessionId(sessionId);
        Cart cart = cartService.addToCart(
                activeSession,
                request.getProductId(),
                request.getQuantity() > 0 ? request.getQuantity() : 1,
                request.getLicense()
        );
        return ResponseEntity.ok(ApiResponse.of("Item added to cart", cart));
    }

    @PutMapping("/items/{productId}")
    public ResponseEntity<ApiResponse<Cart>> updateQuantity(
            @RequestHeader(value = "X-Session-ID", required = false) String sessionId,
            @PathVariable String productId,
            @RequestParam int quantity
    ) {
        String activeSession = resolveSessionId(sessionId);
        Cart cart = cartService.updateQuantity(activeSession, productId, quantity);
        return ResponseEntity.ok(ApiResponse.of("Cart quantity updated", cart));
    }

    @DeleteMapping("/items/{productId}")
    public ResponseEntity<ApiResponse<Cart>> removeItem(
            @RequestHeader(value = "X-Session-ID", required = false) String sessionId,
            @PathVariable String productId
    ) {
        String activeSession = resolveSessionId(sessionId);
        Cart cart = cartService.removeFromCart(activeSession, productId);
        return ResponseEntity.ok(ApiResponse.of("Item removed from cart", cart));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> clearCart(
            @RequestHeader(value = "X-Session-ID", required = false) String sessionId
    ) {
        String activeSession = resolveSessionId(sessionId);
        cartService.clearCart(activeSession);
        return ResponseEntity.ok(ApiResponse.of("Shopping cart cleared", null));
    }

    @Data
    public static class AddItemRequest {
        private String productId;
        private int quantity;
        private String license;
    }
}

