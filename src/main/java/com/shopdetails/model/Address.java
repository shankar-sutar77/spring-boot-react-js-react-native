package com.shopdetails.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "address")
public class Address extends AuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "address_sequence")
    @SequenceGenerator(name = "address_sequence", sequenceName = "ADDRESS_SEQUENCE", allocationSize = 1)
    private Long id;
    private String fullName;
    private String city;
    private String state;
    private String zipCode;
    private String address;

}
