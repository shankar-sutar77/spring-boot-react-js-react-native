package com.shopdetails.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User extends AuditModel {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_Sequence")
    @SequenceGenerator(name = "user_Sequence", sequenceName = "USER_SEQUENCE", allocationSize = 1)
    private Long id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String fullName;
    private String email;
    private String password;

    @OneToOne
    private Role role;

    public User() {}

    public User(String firstName, String middleName, String lastName, String fullName, String email) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.fullName = fullName;
        this.email = email;
    }
}
