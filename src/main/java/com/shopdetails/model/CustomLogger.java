package com.shopdetails.model;

import com.fasterxml.jackson.databind.util.JSONPObject;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Map;

@Getter
@Setter
@Entity
@Table(name = "custom_logs")
public class CustomLogger extends AuditModel {

    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE, generator = "custom_logger_sequence")
    @SequenceGenerator(name = "custom_logger_sequence", sequenceName = "CUSTOM_LOGGER_SEQUENCE", allocationSize = 1)
    private Long id;
    private String name;
    private String type;
    private String description;

    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb")
    private Map<String,Object> logDetails;

}
