package com.hospitalcompare.repository;

import com.hospitalcompare.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findByHospitalId(Long hospitalId);
    List<Doctor> findBySpecializationIgnoreCase(String specialization);
}
