package com.shopdetails.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "parties")
public class Party extends AuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "party_sequence")
    @SequenceGenerator(name = "party_sequence", sequenceName = "PARTY_SEQUENCE", allocationSize = 1)
    private Long id;
    private String name;

    @OneToOne
    private Address address;

}
