package com.hospitalcompare.config;

import com.hospitalcompare.model.*;
import com.hospitalcompare.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final HospitalRepository hospitalRepository;
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        if (hospitalRepository.count() > 0) return;

        // Seed Users
        userRepository.save(User.builder()
                .fullName("Demo Patient")
                .email("patient@hospitalcompare.com")
                .password("password123")
                .role(Role.ROLE_USER)
                .build());

        userRepository.save(User.builder()
                .fullName("System Admin")
                .email("admin@hospitalcompare.com")
                .password("admin123")
                .role(Role.ROLE_SUPER_ADMIN)
                .build());

        // Seed Hospitals
        Hospital h1 = hospitalRepository.save(Hospital.builder()
                .name("Apex Heart & Super Specialty Hospital")
                .city("New Delhi")
                .state("Delhi")
                .address("Sector 12, RK Puram")
                .latitude(28.5672)
                .longitude(77.1746)
                .type("Private")
                .rating(4.9)
                .reviewCount(324)
                .isNabhAccredited(true)
                .is24x7(true)
                .hasEmergency(true)
                .hasIcu(true)
                .hasBloodBank(true)
                .hasParking(true)
                .hasWheelchairAccess(true)
                .availableBeds(45)
                .emergencyContact("+91 11 2671 0000")
                .coverImageUrl("https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=800")
                .consultationFee(1200.0)
                .specialties(List.of("Cardiology", "Neurology", "Orthopedics", "Oncology"))
                .acceptedInsurances(List.of("Star Health", "HDFC ERGO", "Care Health", "Max Bupa"))
                .build());

        Hospital h2 = hospitalRepository.save(Hospital.builder()
                .name("Metro Care Multi-Specialty Hospital")
                .city("Mumbai")
                .state("Maharashtra")
                .address("Bandra West, Hill Road")
                .latitude(19.0596)
                .longitude(72.8295)
                .type("Private")
                .rating(4.7)
                .reviewCount(210)
                .isNabhAccredited(true)
                .is24x7(true)
                .hasEmergency(true)
                .hasIcu(true)
                .hasBloodBank(false)
                .hasParking(true)
                .hasWheelchairAccess(true)
                .availableBeds(18)
                .emergencyContact("+91 22 4910 8888")
                .coverImageUrl("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800")
                .consultationFee(950.0)
                .specialties(List.of("Pediatrics", "Gastroenterology", "Cardiology", "Dermatology"))
                .acceptedInsurances(List.of("Star Health", "ICICI Lombard", "Care Health"))
                .build());

        Hospital h3 = hospitalRepository.save(Hospital.builder()
                .name("Apollo Super Specialty Hospital")
                .city("Chennai")
                .state("Tamil Nadu")
                .address("21 Greams Lane, Thousand Lights")
                .latitude(13.0604)
                .longitude(80.2496)
                .type("Private")
                .rating(4.9)
                .reviewCount(540)
                .isNabhAccredited(true)
                .is24x7(true)
                .hasEmergency(true)
                .hasIcu(true)
                .hasBloodBank(true)
                .hasParking(true)
                .hasWheelchairAccess(true)
                .availableBeds(60)
                .emergencyContact("+91 44 2829 0200")
                .coverImageUrl("https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800")
                .consultationFee(1300.0)
                .specialties(List.of("Cardiology", "Organ Transplant", "Oncology", "Neurology"))
                .acceptedInsurances(List.of("Star Health", "Apollo Munich", "ICICI Lombard", "HDFC ERGO"))
                .build());

        Hospital h4 = hospitalRepository.save(Hospital.builder()
                .name("Yashoda Medical City & Institute")
                .city("Hyderabad")
                .state("Telangana")
                .address("Hitec City, Mindspace Road")
                .latitude(17.4435)
                .longitude(78.3772)
                .type("Private")
                .rating(4.8)
                .reviewCount(390)
                .isNabhAccredited(true)
                .is24x7(true)
                .hasEmergency(true)
                .hasIcu(true)
                .hasBloodBank(true)
                .hasParking(true)
                .hasWheelchairAccess(true)
                .availableBeds(50)
                .emergencyContact("+91 40 4567 8900")
                .coverImageUrl("https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800")
                .consultationFee(1050.0)
                .specialties(List.of("Oncology", "Neurology", "Robotic Surgery", "Gastroenterology"))
                .acceptedInsurances(List.of("Star Health", "Care Health", "Arogyasri", "HDFC ERGO"))
                .build());

        // Seed Doctors
        doctorRepository.save(Doctor.builder()
                .name("Dr. Rajesh Sharma")
                .hospitalId(h1.getId())
                .qualification("MD, DM (Cardiology), FACC")
                .specialization("Cardiology")
                .experienceYears(18)
                .consultationFee(1500.0)
                .rating(4.9)
                .languages("English, Hindi")
                .avatarUrl("https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300")
                .build());

        doctorRepository.save(Doctor.builder()
                .name("Dr. Venkatraman Swamy")
                .hospitalId(h3.getId())
                .qualification("FRCS, MCh (Cardiothoracic Surgery)")
                .specialization("Cardiology")
                .experienceYears(25)
                .consultationFee(1600.0)
                .rating(5.0)
                .languages("English, Tamil, Telugu")
                .avatarUrl("https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300")
                .build());
    }
}
