package com.hospitalcompare.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "hospitals")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String city;

    private String state;
    private String address;
    private Double latitude;
    private Double longitude;

    private String type; // Private / Government
    private Double rating;
    private Integer reviewCount;

    private Boolean isNabhAccredited;
    private Boolean is24x7;
    private Boolean hasEmergency;
    private Boolean hasIcu;
    private Boolean hasBloodBank;
    private Boolean hasParking;
    private Boolean hasWheelchairAccess;

    private Integer availableBeds;
    private String emergencyContact;
    private String coverImageUrl;
    private Double consultationFee;

    @ElementCollection
    @CollectionTable(name = "hospital_specialties", joinColumns = @JoinColumn(name = "hospital_id"))
    @Column(name = "specialty")
    @Builder.Default
    private List<String> specialties = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "hospital_insurances", joinColumns = @JoinColumn(name = "hospital_id"))
    @Column(name = "insurance_company")
    @Builder.Default
    private List<String> acceptedInsurances = new ArrayList<>();
}
