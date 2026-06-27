package com.hospitalcompare.repository;

import com.hospitalcompare.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByHospitalIdAndIsApprovedTrue(Long hospitalId);
}
