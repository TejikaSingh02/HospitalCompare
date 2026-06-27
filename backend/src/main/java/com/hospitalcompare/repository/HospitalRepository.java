package com.hospitalcompare.repository;

import com.hospitalcompare.model.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface HospitalRepository extends JpaRepository<Hospital, Long> {
    List<Hospital> findByCityIgnoreCase(String city);

    @Query("SELECT h FROM Hospital h WHERE " +
           "(:query IS NULL OR LOWER(h.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(h.city) LIKE LOWER(CONCAT('%', :query, '%'))) AND " +
           "(:city IS NULL OR LOWER(h.city) = LOWER(:city)) AND " +
           "(:type IS NULL OR h.type = :type) AND " +
           "(:minRating IS NULL OR h.rating >= :minRating)")
    List<Hospital> searchHospitals(
        @Param("query") String query,
        @Param("city") String city,
        @Param("type") String type,
        @Param("minRating") Double minRating
    );
}
