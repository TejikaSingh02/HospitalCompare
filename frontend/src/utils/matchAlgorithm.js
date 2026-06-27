import { MOCK_HOSPITALS } from '../services/mockData';

export function calculateHospitalMatchScore(hospital, userPref) {
  let score = 0;
  let maxPossible = 100;
  let breakdown = {
    matches: [],
    warnings: []
  };

  // 1. Specialty Match (Weight: 25)
  if (userPref.specialty) {
    const hasSpec = hospital.specialties.some(s => s.toLowerCase().includes(userPref.specialty.toLowerCase()));
    if (hasSpec) {
      score += 25;
      breakdown.matches.push(`Has top-tier ${userPref.specialty} department`);
    } else {
      breakdown.warnings.push(`Specialty ${userPref.specialty} is covered under general medicine`);
    }
  } else {
    score += 20;
  }

  // 2. Insurance Match (Weight: 25)
  if (userPref.insurance) {
    const hasIns = hospital.acceptedInsurances.some(i => i.toLowerCase().includes(userPref.insurance.toLowerCase()));
    if (hasIns) {
      score += 25;
      breakdown.matches.push(`Empaneled with ${userPref.insurance} for 100% cashless treatment`);
    } else {
      breakdown.warnings.push(`Reimbursement required for ${userPref.insurance} (Not instant cashless)`);
    }
  } else {
    score += 20;
  }

  // 3. Budget Match (Weight: 20)
  if (userPref.budget) {
    if (hospital.consultationFee <= userPref.budget) {
      score += 20;
      breakdown.matches.push(`Consultation fee (₹${hospital.consultationFee}) is within your budget (₹${userPref.budget})`);
    } else {
      score += 10;
      breakdown.warnings.push(`Consultation fee (₹${hospital.consultationFee}) is above target budget`);
    }
  } else {
    score += 15;
  }

  // 4. Rating Match (Weight: 15)
  if (hospital.rating >= (userPref.minRating || 4.5)) {
    score += 15;
    breakdown.matches.push(`Exceptional patient rating of ${hospital.rating}⭐ (${hospital.reviewCount}+ reviews)`);
  } else {
    score += Math.round((hospital.rating / 5) * 15);
    breakdown.warnings.push(`Rating is ${hospital.rating}⭐`);
  }

  // 5. Accreditation & Beds (Weight: 15)
  if (hospital.isNabhAccredited) {
    score += 10;
    breakdown.matches.push("NABH Quality Accredited Clinical Standards");
  }
  if (hospital.availableBeds > 20) {
    score += 5;
    breakdown.matches.push(`High bed availability (${hospital.availableBeds} ICU beds free)`);
  } else {
    breakdown.warnings.push("High bed occupancy rate currently");
  }

  const matchPercentage = Math.min(99, Math.max(60, score));

  return {
    hospital,
    matchPercentage,
    breakdown
  };
}

export function getRankedHospitals(userPref) {
  return MOCK_HOSPITALS
    .map(h => calculateHospitalMatchScore(h, userPref))
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
}
