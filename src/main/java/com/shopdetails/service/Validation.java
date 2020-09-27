package com.shopdetails.service;

import org.springframework.stereotype.Service;

@Service
public class Validation {
    public Boolean isPresent(Object value) { return value != null && !String.valueOf(value).trim().equals(""); }
}
