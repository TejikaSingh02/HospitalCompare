package com.hospitalcompare.controller;

import com.hospitalcompare.model.Hospital;
import com.hospitalcompare.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hospitals")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class HospitalController {

    private final HospitalRepository hospitalRepository;

    @GetMapping
    public ResponseEntity<List<Hospital>> getAllHospitals(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) Double minRating) {
        
        List<Hospital> hospitals = hospitalRepository.searchHospitals(query, city, type, minRating);
        return ResponseEntity.ok(hospitals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Hospital> getHospitalById(@PathVariable Long id) {
        return hospitalRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/compare")
    public ResponseEntity<List<Hospital>> compareHospitals(@RequestBody Map<String, List<Long>> request) {
        List<Long> ids = request.get("hospitalIds");
        if (ids == null || ids.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        List<Hospital> hospitals = hospitalRepository.findAllById(ids);
        return ResponseEntity.ok(hospitals);
    }
}
