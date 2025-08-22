package com.sushmitha.E_commerce.controller;


import com.sushmitha.E_commerce.model.Cart;
import com.sushmitha.E_commerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173") // Allow React app to call these endpoints
public class CartController {

    @Autowired
    private CartService cartService;

    // POST /api/cart/create - Create new cart
    @PostMapping("/create")
    public ResponseEntity<Cart> createCart() {
        Cart cart = cartService.createCart();
        return ResponseEntity.ok(cart);
    }

    // GET /api/cart/{id} - Get cart by ID
    @GetMapping("/{id}")
    public ResponseEntity<Cart> getCart(@PathVariable Long id) {
        try {
            Cart cart = cartService.getCart(id);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // POST /api/cart/{id}/add - Add product to cart
    @PostMapping("/{id}/add")
    public ResponseEntity<Cart> addToCart(
            @PathVariable Long id,
            @RequestParam Long productId,
            @RequestParam(defaultValue = "1") Integer quantity) {
        try {
            Cart cart = cartService.addToCart(id, productId, quantity);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // DELETE /api/cart/item/{itemId} - Remove item from cart
    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<Cart> removeFromCart(@PathVariable Long itemId) {
        try {
            Cart cart = cartService.removeFromCart(itemId);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /api/cart/{id}/clear - Clear entire cart
    @DeleteMapping("/{id}/clear")
    public ResponseEntity<Cart> clearCart(@PathVariable Long id) {
        try {
            Cart cart = cartService.clearCart(id);
            return ResponseEntity.ok(cart);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}