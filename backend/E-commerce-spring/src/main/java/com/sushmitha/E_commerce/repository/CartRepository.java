package com.sushmitha.E_commerce.repository;

import com.sushmitha.E_commerce.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    // JpaRepository gives us basic methods like:
    // - save()
    // - findById()
    // - findAll()
    // - deleteById()
}
