package com.shopdetails.service;

import com.shopdetails.Repository.CustomLoggerRepository;
import com.shopdetails.model.CustomLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CustomLoggerManager {

    @Autowired
    private CustomLoggerRepository customLoggerRepository;

    @Autowired
    private Validation validation;


    public CustomLogger createLog(Map<String, Object> logDetails) {

        CustomLogger customLogger = new CustomLogger();

        if (validation.isPresent(logDetails.get("name")))
            customLogger.setName((String) logDetails.get("name"));

        if (validation.isPresent(logDetails.get("type")))
            customLogger.setType((String) logDetails.get("type"));

        if (validation.isPresent(logDetails.get("description")))
            customLogger.setDescription((String) logDetails.get("description"));

        if (validation.isPresent(logDetails.get("logDetails")))
            customLogger.setLogDetails((Map<String, Object>) logDetails.get("logDetails"));

        customLoggerRepository.save(customLogger);

        return customLogger;
    }

    public List<CustomLogger> getAllLogs() {
        return customLoggerRepository.findAll();
    }
}
