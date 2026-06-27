package com.hospitalcompare.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "medical_reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private String fileName;
    private String fileUrl;

    @Column(columnDefinition = "TEXT")
    private String summaryText;

    private String suggestedDepartment;
    private String keyTerms;

    @Builder.Default
    private LocalDateTime uploadedAt = LocalDateTime.now();
}
