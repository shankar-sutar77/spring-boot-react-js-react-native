package com.shopdetails.controller;

import com.shopdetails.model.CustomLogger;
import com.shopdetails.service.CustomLoggerManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/api")
public class CustomLoggerController {

    @Autowired
    private CustomLoggerManager customLoggerManager;


    @PostMapping(path = "/createLog")
    public CustomLogger createLog(@RequestBody Map<String, Object> body) {
        System.out.println("*********** Logging **************");
        return customLoggerManager.createLog(body);
    }

    @GetMapping(path = "/getAllLogs")
    public List<CustomLogger> getAllLogs() {
        return customLoggerManager.getAllLogs();
    }
}
