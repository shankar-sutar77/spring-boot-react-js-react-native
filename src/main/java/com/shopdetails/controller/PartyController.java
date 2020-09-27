package com.shopdetails.controller;

import com.shopdetails.Repository.AddressRepository;
import com.shopdetails.model.Address;
import com.shopdetails.model.Party;
import com.shopdetails.service.AddressManager;
import com.shopdetails.service.PartyManager;
import com.shopdetails.service.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PartyController {

    @Autowired
    private PartyManager partyManager;

    @Autowired
    private AddressManager addressManager;

    @Autowired
    private Validation validation;


    @GetMapping(path = "/getAllParties")
    public Map<String, Object> getAllParties() {
        Map<String,Object> result = new HashMap<>();
        List<Party> parties = partyManager.getAllParties();
        result.put("parties", parties);
        return result;
    }

    @GetMapping(path = "createParty/{name}/{fullName}")
    public void test(@PathVariable String name, @PathVariable String fullName ) {

        Map<String,Object> party = new HashMap<>();
        Map<String,Object> address = new HashMap<>();

        party.put("name", name);
//        party.put("id", 1);

//        address.put("id",3);
        address.put("fullName", fullName);
        address.put("address", "pay layout tin factory");
        address.put("city", "banglore");
        address.put("state", "karnataka");
        address.put("zipCode", "560100");

        party.put("address", address);
        createOrUpdateParty(party);
    }

    @PostMapping(path = "createOrUpdateParty")
    public Map<String,Object> createOrUpdateParty(@RequestBody Map<String,Object> body) {

        Map<String ,Object> result = new HashMap<>();

        partyManager.createOrUpdateParty(body);

        return result;
    }
}
