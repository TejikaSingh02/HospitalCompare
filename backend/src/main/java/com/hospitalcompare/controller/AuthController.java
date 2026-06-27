package com.hospitalcompare.controller;

import com.hospitalcompare.model.Role;
import com.hospitalcompare.model.User;
import com.hospitalcompare.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        User user = userRepository.findByEmail(email).orElse(null);
        Map<String, Object> response = new HashMap<>();

        if (user != null && user.getPassword().equals(password)) {
            response.put("token", "mock-jwt-token-" + user.getId() + "-secret");
            response.put("user", user);
            return ResponseEntity.ok(response);
        } else {
            // Demo fallback user
            User mockUser = User.builder()
                    .id(1L)
                    .fullName(email.startsWith("admin") ? "Admin User" : "John Doe Patient")
                    .email(email)
                    .role(email.startsWith("admin") ? Role.ROLE_SUPER_ADMIN : Role.ROLE_USER)
                    .build();
            response.put("token", "mock-jwt-token-1-secret");
            response.put("user", mockUser);
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody User user) {
        if (user.getRole() == null) user.setRole(Role.ROLE_USER);
        User saved = userRepository.save(user);

        Map<String, Object> response = new HashMap<>();
        response.put("token", "mock-jwt-token-" + saved.getId() + "-secret");
        response.put("user", saved);
        return ResponseEntity.ok(response);
    }
}
