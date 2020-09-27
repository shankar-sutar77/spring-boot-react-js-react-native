package com.shopdetails.service;

import com.shopdetails.Repository.AddressRepository;
import com.shopdetails.model.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AddressManager {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private Validation validation;


    public Address createOrUpdateAddress(Map<String, Object> partyAddress) {

        Long id = partyAddress.get("id") != null ? Long.parseLong(partyAddress.get("id").toString()) : null;

        String fullName = partyAddress.get("fullName") != null ? (String) partyAddress.get("fullName") : null;
        String addressDetails = partyAddress.get("address") != null ? (String) partyAddress.get("address") : null;
        String city = partyAddress.get("city") != null ? (String) partyAddress.get("city") : null;
        String state = partyAddress.get("state") != null ? (String) partyAddress.get("state") : null;
        String zipCode = partyAddress.get("zipCode") != null ? (String) partyAddress.get("zipCode") : null;

        Address address = new Address();
        if (id != null) {
            address = addressRepository.findById(id).get();
        }
        if (validation.isPresent(fullName))
            address.setFullName(fullName);

        if (validation.isPresent(addressDetails))
            address.setAddress(addressDetails);

        if (validation.isPresent(city))
            address.setCity(city);

        if (validation.isPresent(state))
            address.setState(state);

        if (validation.isPresent(zipCode))
            address.setZipCode(zipCode);

        addressRepository.save(address);
        return address;
    }
}
