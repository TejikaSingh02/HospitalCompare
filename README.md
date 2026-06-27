# 🏥 HospitalCompare – Smart Healthcare Decision & Comparison Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-HospitalCompare-brightgreen?style=for-the-badge&logo=render)](https://hospital-compare-frontend.onrender.com)
[![GitHub Repository](https://img.shields.io/badge/GitHub-TejikaSingh02%2FHospitalCompare-blue?style=for-the-badge&logo=github)](https://github.com/TejikaSingh02/HospitalCompare)

> 🌐 **Live Web App URL**: [https://hospital-compare-frontend.onrender.com](https://hospital-compare-frontend.onrender.com)

![HospitalCompare Banner](https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200)

**HospitalCompare** is an enterprise-grade full-stack healthcare discovery and matrix decision platform. It empowers patients to compare hospitals side-by-side across 25+ parameters (consultation fees, ICU rates, doctor availability, NABH accreditation, cashless insurance clearance, and verified patient ratings) while leveraging **Google Gemini AI** for clinical triage and report summarization.

---

## 🌟 Key Features & Architecture Standouts

### 🏆 1. Hospital Match Score™ (Personalized Weighted Algorithm)
- Evaluates user clinical priorities across **5 weighted metrics** (Specialty fit, TPA cashless clearance, Consultation budget, Patient rating thresholds, and NABH accreditation/ICU bed availability).
- Provides **Explainable AI Insights** explaining *why* each hospital matched (e.g., *"Empaneled with Star Health for 100% cashless treatment"*).

### 🤖 2. Gemini AI Health Navigator
- **Interactive Symptom Triage**: Self-filling natural language input bar for custom symptom analysis and clinical specialty recommendations.
- **Medical Report Summarizer**: PDF/Image OCR summarizer extracting medical jargon, highlighting abnormal lab values, and suggesting specialist consultations.
- **AI Health Assistant Chatbot**: Floating conversational advisor.

### 💰 3. Cashless Insurance & Surgical Cost Calculator
- **Instant TPA Lookup**: Select insurers (*Star Health, HDFC ERGO, Care Health, Ayushman Bharat PM-JAY, CGHS, Niva Bupa*) to find 100% cashless empaneled hospitals.
- **Procedure Cost Estimator**: Side-by-side cost breakdowns for major surgeries (*Angioplasty, Knee Replacement, Gallbladder, Kidney Transplant*) across Government vs. Private institutions.

### 📊 4. Multi-Dimensional Matrix Comparison & Radar Visuals
- Side-by-side matrix comparison of up to 4 hospitals.
- Integrated **Recharts Radar Charts** comparing Hygiene, Clinical Quality, Waiting Time Efficiency, and Staff Courtesy.

### 🧪 5. Diagnostic Labs & Generic Medicine Marketplace
- City-wise directory for pathology centers (*Dr. Lal PathLabs, Agilus/SRL, Metropolis, JNMC Pathology Wing*).
- Generic substitute finder with up to 80% savings.

---

## 🛠 Tech Stack

- **Frontend**: React 18 (Vite), Tailwind CSS, Framer Motion, Recharts, Lucide Icons, React Router v6, Axios.
- **Backend**: Java 21, Spring Boot 3.2, Spring Security (JWT), Spring Data JPA, Hibernate, OpenAPI 3.0 (Swagger UI).
- **Database**: MySQL 8.0 / H2 Memory DB.
- **DevOps**: Docker, Docker Compose, Deployment blueprints for Render.

---

## 🚀 Quick Start Guide

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Access client app at `http://localhost:3000`.

### Backend Setup
```bash
cd backend
mvnw spring-boot:run
```
Access Swagger API Docs at `http://localhost:8080/swagger-ui.html`.
