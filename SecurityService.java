package com.security.service;

import com.security.dto.HashResponse;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.*;

/**
 * Security Service for performing cryptographic operations
 */
@Service
public class SecurityService {

    private static final String LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    private static final String UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final String NUMBERS = "0123456789";
    private static final String SYMBOLS = "!@#$%^&*()_+-=[]{};\':\"\\|,./<>?";

    /**
     * Generate hashes for text using specified algorithms
     */
    public HashResponse generateHashes(String text, List<String> algorithms) throws Exception {
        HashResponse response = new HashResponse();
        Map<String, String> hashes = new HashMap<>();

        for (String algorithm : algorithms) {
            switch (algorithm.toUpperCase()) {
                case "MD5":
                    hashes.put("MD5", DigestUtils.md5Hex(text));
                    break;
                case "SHA-1":
                case "SHA1":
                    hashes.put("SHA-1", DigestUtils.sha1Hex(text));
                    break;
                case "SHA-256":
                case "SHA256":
                    hashes.put("SHA-256", DigestUtils.sha256Hex(text));
                    break;
                case "SHA-512":
                case "SHA512":
                    hashes.put("SHA-512", DigestUtils.sha512Hex(text));
                    break;
                default:
                    throw new IllegalArgumentException("Unsupported algorithm: " + algorithm);
            }
        }

        response.setHashes(hashes);
        response.setSuccess(true);
        return response;
    }

    /**
     * Generate random password
     */
    public String generatePassword(int length, boolean uppercase, boolean lowercase,
                                   boolean numbers, boolean symbols) {
        if (length < 4 || length > 128) {
            throw new IllegalArgumentException("Password length must be between 4 and 128");
        }

        StringBuilder characters = new StringBuilder();
        if (lowercase) characters.append(LOWERCASE);
        if (uppercase) characters.append(UPPERCASE);
        if (numbers) characters.append(NUMBERS);
        if (symbols) characters.append(SYMBOLS);

        if (characters.length() == 0) {
            throw new IllegalArgumentException("At least one character type must be selected");
        }

        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(characters.length());
            password.append(characters.charAt(randomIndex));
        }

        return password.toString();
    }

    /**
     * Check password strength
     */
    public Map<String, Object> checkPasswordStrength(String password) {
        Map<String, Object> result = new HashMap<>();
        int strength = 0;
        List<String> feedback = new ArrayList<>();

        // Length checks
        if (password.length() >= 8) strength += 20;
        else feedback.add("Password should be at least 8 characters long");

        if (password.length() >= 12) strength += 10;
        if (password.length() >= 16) strength += 10;

        // Character type checks
        if (password.matches(".*[a-z].*")) {
            strength += 15;
        } else {
            feedback.add("Add lowercase letters (a-z)");
        }

        if (password.matches(".*[A-Z].*")) {
            strength += 15;
        } else {
            feedback.add("Add uppercase letters (A-Z)");
        }

        if (password.matches(".*[0-9].*")) {
            strength += 15;
        } else {
            feedback.add("Add numbers (0-9)");
        }

        if (password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,./<>?].*")) {
            strength += 15;
        } else {
            feedback.add("Add special characters (!@#$%^&*)");
        }

        // Check for common patterns
        if (password.matches("(.)\\1{2,}")) {
            strength -= 10;
            feedback.add("Avoid repeating characters");
        }

        strength = Math.min(100, Math.max(0, strength));

        result.put("strength", strength);
        result.put("score", getStrengthLabel(strength));
        result.put("feedback", feedback);
        result.put("secure", strength >= 70);

        return result;
    }

    /**
     * Get strength label based on score
     */
    private String getStrengthLabel(int strength) {
        if (strength < 30) return "Very Weak";
        if (strength < 50) return "Weak";
        if (strength < 70) return "Fair";
        if (strength < 90) return "Good";
        return "Excellent";
    }

    /**
     * Encode text to Base64
     */
    public String encodeBase64(String text) {
        return Base64.encodeBase64String(text.getBytes());
    }

    /**
     * Decode Base64 text
     */
    public String decodeBase64(String text) {
        byte[] decodedBytes = Base64.decodeBase64(text);
        return new String(decodedBytes);
    }

    /**
     * Encode URL
     */
    public String encodeURL(String text) {
        try {
            return URLEncoder.encode(text, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("UTF-8 encoding not supported", e);
        }
    }

    /**
     * Decode URL
     */
    public String decodeURL(String text) {
        try {
            return URLDecoder.decode(text, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("UTF-8 encoding not supported", e);
        }
    }
}
