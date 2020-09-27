package com.shopdetails.service;

import com.shopdetails.Repository.PartyRepository;
import com.shopdetails.model.Address;
import com.shopdetails.model.Party;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PartyManager {

    @Autowired
    private PartyRepository partyRepository;

    @Autowired
    private AddressManager addressManager;

    @Autowired
    private Validation validation;

    public List<Party> getAllParties() {
        return partyRepository.findAll();
    }

    public Party getPartyById(Long id) {
        return partyRepository.findById(id).get();
    }

    public Party createOrUpdateParty(Map<String, Object> body) {

        Long id = body.get("id") != null? Long.parseLong(body.get("id").toString()) : null;

        Party party = new Party();
        if (id != null) {
            party = getPartyById(id);
        }

        if (validation.isPresent(body.get("name")))
            party.setName(body.get("name").toString());

        if (validation.isPresent(body.get("address"))) {
            Map<String, Object> address = (Map<String, Object>) body.get("address");
            Address address1 = addressManager.createOrUpdateAddress(address);
            party.setAddress(address1);
        }

        partyRepository.save(party);

        return party;
    }
}
