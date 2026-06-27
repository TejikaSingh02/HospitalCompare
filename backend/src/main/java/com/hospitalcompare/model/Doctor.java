package com.hospitalcompare.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "doctors")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Long hospitalId;

    private String qualification;
    private String specialization;
    private Integer experienceYears;
    private Double consultationFee;
    private Double rating;
    private String languages;
    private String avatarUrl;
}
