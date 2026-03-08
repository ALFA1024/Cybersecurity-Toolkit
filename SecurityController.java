package com.security.controller;

import com.security.dto.HashRequest;
import com.security.dto.HashResponse;
import com.security.service.SecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * REST Controller for Security Operations
 */
@RestController
@RequestMapping("/api/security")
@CrossOrigin(origins = "*")
public class SecurityController {

    @Autowired
    private SecurityService securityService;

    /**
     * Hash text using multiple algorithms
     */
    @PostMapping("/hash")
    public ResponseEntity<HashResponse> generateHashes(@RequestBody HashRequest request) {
        try {
            HashResponse response = securityService.generateHashes(request.getText(), request.getAlgorithms());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Generate random password
     */
    @PostMapping("/generate-password")
    public ResponseEntity<Map<String, String>> generatePassword(
            @RequestParam int length,
            @RequestParam boolean uppercase,
            @RequestParam boolean lowercase,
            @RequestParam boolean numbers,
            @RequestParam boolean symbols) {
        try {
            String password = securityService.generatePassword(length, uppercase, lowercase, numbers, symbols);
            Map<String, String> response = new HashMap<>();
            response.put("password", password);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Check password strength
     */
    @PostMapping("/check-password-strength")
    public ResponseEntity<Map<String, Object>> checkPasswordStrength(@RequestParam String password) {
        try {
            Map<String, Object> strength = securityService.checkPasswordStrength(password);
            return ResponseEntity.ok(strength);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Encode text to Base64
     */
    @PostMapping("/base64/encode")
    public ResponseEntity<Map<String, String>> encodeBase64(@RequestParam String text) {
        String encoded = securityService.encodeBase64(text);
        Map<String, String> response = new HashMap<>();
        response.put("encoded", encoded);
        return ResponseEntity.ok(response);
    }

    /**
     * Decode Base64 text
     */
    @PostMapping("/base64/decode")
    public ResponseEntity<Map<String, String>> decodeBase64(@RequestParam String text) {
        try {
            String decoded = securityService.decodeBase64(text);
            Map<String, String> response = new HashMap<>();
            response.put("decoded", decoded);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Encode URL
     */
    @PostMapping("/url/encode")
    public ResponseEntity<Map<String, String>> encodeURL(@RequestParam String text) {
        String encoded = securityService.encodeURL(text);
        Map<String, String> response = new HashMap<>();
        response.put("encoded", encoded);
        return ResponseEntity.ok(response);
    }

    /**
     * Decode URL
     */
    @PostMapping("/url/decode")
    public ResponseEntity<Map<String, String>> decodeURL(@RequestParam String text) {
        try {
            String decoded = securityService.decodeURL(text);
            Map<String, String> response = new HashMap<>();
            response.put("decoded", decoded);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Health check
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "Cybersecurity Toolkit is running");
        return ResponseEntity.ok(response);
    }
}
