package com.security.dto;

import java.util.List;

/**
 * DTO for hash request
 */
public class HashRequest {
    private String text;
    private List<String> algorithms;

    public HashRequest() {
    }

    public HashRequest(String text, List<String> algorithms) {
        this.text = text;
        this.algorithms = algorithms;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public List<String> getAlgorithms() {
        return algorithms;
    }

    public void setAlgorithms(List<String> algorithms) {
        this.algorithms = algorithms;
    }
}
