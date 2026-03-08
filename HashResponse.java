package com.security.dto;

import java.util.Map;

/**
 * DTO for hash response
 */
public class HashResponse {
    private boolean success;
    private Map<String, String> hashes;
    private String message;

    public HashResponse() {
    }

    public HashResponse(boolean success, Map<String, String> hashes) {
        this.success = success;
        this.hashes = hashes;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public Map<String, String> getHashes() {
        return hashes;
    }

    public void setHashes(Map<String, String> hashes) {
        this.hashes = hashes;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
