package com.shopdetails.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "roles")
public class Role  extends AuditModel {


    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "roles_sequence")
    @SequenceGenerator(name = "roles_sequence", sequenceName = "ROLE_SEQUENCE", allocationSize = 1)
    private Long id;
    private String name;

//    @ManyToMany(mappedBy = "roles")
//    private List<User> users;
}
