package com.hospitalcompare.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private String userName;

    @Column(nullable = false)
    private Long hospitalId;

    private Integer rating;
    private String comment;

    @Builder.Default
    private Boolean isApproved = true;

    @Builder.Default
    private Integer helpfulVotes = 0;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
