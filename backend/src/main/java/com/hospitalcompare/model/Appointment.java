package com.hospitalcompare.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    @Column(nullable = false)
    private Long hospitalId;

    @Column(nullable = false)
    private Long doctorId;

    private String doctorName;
    private String hospitalName;

    private LocalDate appointmentDate;
    private String timeSlot;
    private String status; // CONFIRMED, CANCELLED, COMPLETED
    private String patientNotes;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
