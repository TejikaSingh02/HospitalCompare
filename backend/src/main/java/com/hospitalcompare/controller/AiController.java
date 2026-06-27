package com.hospitalcompare.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AiController {

    @PostMapping("/recommend")
    public ResponseEntity<Map<String, Object>> getAiRecommendation(@RequestBody Map<String, String> request) {
        String disease = request.getOrDefault("disease", "General Consultation");
        String location = request.getOrDefault("location", "Delhi/NCR");
        String budget = request.getOrDefault("budget", "Moderate");
        String hospitalType = request.getOrDefault("hospitalType", "Private");

        Map<String, Object> response = new HashMap<>();
        response.put("recommendedHospital", "Apex Heart & Super Specialty Hospital");
        response.put("matchScore", "96%");
        response.put("reasoning", "Selected based on high cardiac success rate (98.4%), NABH accreditation, and 24x7 CathLab availability within your target location.");
        response.put("pros", new String[]{
            "Top-tier Cardio-Thoracic ICU",
            "Cashless approval with major TPA insurers",
            "Zero waiting time for emergency admissions"
        });
        response.put("cons", new String[]{
            "Consultation fees are slightly above city average",
            "High peak weekend visitor traffic"
        });
        response.put("estimatedCost", "₹35,000 - ₹85,000 (Inclusive of procedure & stay)");
        response.put("alternativeOptions", new String[]{"Metro Care Multi-Specialty Hospital", "AIIMS Central Research Institute"});

        return ResponseEntity.ok(response);
    }

    @PostMapping("/analyze-report")
    public ResponseEntity<Map<String, Object>> analyzeReport(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        response.put("summary", "Patient report indicates mild left ventricular hypertrophy with normal ejection fraction (62%). Blood chemistry shows elevated LDL cholesterol levels.");
        response.put("suggestedDepartment", "Cardiology");
        response.put("keyTerms", new String[]{"Hypertrophy", "Ejection Fraction", "Lipid Profile", "LDL"});
        response.put("disclaimer", "CRITICAL NOTICE: AI analysis is generated for educational support only and does not constitute a clinical diagnosis. Always consult a licensed medical practitioner.");

        return ResponseEntity.ok(response);
    }
}
