package com.shopdetails.controller;

import com.shopdetails.Repository.UserRepository;
import com.shopdetails.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository userRepository;


    @GetMapping(path = "/getAllUsers")
    public Map<String, Object> getAllUsers() {
        System.out.println("*********getAllUsers********");
        List<User> users = userRepository.findAll();
        Map<String, Object> result = new HashMap<>();
        result.put("users", users);
        return result;
    }

    @PostMapping(value = "/validateUser")
    public Map<String, Object> validateUser(@RequestBody Map<String, Object> body) {

        String email = body.get("email") != null ? (String) body.get("email") : null;
        String password = body.get("password") != null ? (String) body.get("password") : null;

        Map<String, Object> result = new HashMap<>();
        User user = userRepository.findByEmailAndPassword(email, password);
        if (user != null && user.getId() != null) {
            result.put("authenticated", true);
        } else {
            result.put("authenticated", false);
        }

        return result;
    }


    @PostMapping(value = "/createOrUpdateUser")
    public Map<String, Object> createOrUpdateUser(@RequestBody Map<String, Object> body) {

        Long id = body.get("id") != null ? Long.parseLong(body.get("id").toString()) : null;
        String username = body.get("username") != null ? (String) body.get("username") : null;
        String email = body.get("email") != null ? (String) body.get("email") : null;
        String password = body.get("password") != null ? (String) body.get("password") : null;
        Map<String, Object> result = new HashMap<>();
        User user = userRepository.findByEmail(email);
        if (user != null) {
            result.put("result", false);
        } else {

            User newUser = new User();
            newUser.setFullName(username);
            newUser.setEmail(email);
            newUser.setPassword(password);
            userRepository.save(newUser);
            result.put("result", true);
        }
        return result;
    }
}
