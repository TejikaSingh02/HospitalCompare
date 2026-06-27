import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import ComparePage from './pages/ComparePage';
import MatchScorePage from './pages/MatchScorePage';
import InsuranceAndCostPage from './pages/InsuranceAndCostPage';
import LabsAndPharmacyPage from './pages/LabsAndPharmacyPage';
import SymptomCheckerPage from './pages/SymptomCheckerPage';
import AiAssistantPage from './pages/AiAssistantPage';
import HospitalDetailPage from './pages/HospitalDetailPage';
import EmergencyPage from './pages/EmergencyPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AiChatbotDrawer from './components/ai/AiChatbotDrawer';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/match-score" element={<MatchScorePage />} />
          <Route path="/insurance-and-cost" element={<InsuranceAndCostPage />} />
          <Route path="/labs-pharmacy" element={<LabsAndPharmacyPage />} />
          <Route path="/symptom-checker" element={<SymptomCheckerPage />} />
          <Route path="/ai-assistant" element={<AiAssistantPage />} />
          <Route path="/hospital/:id" element={<HospitalDetailPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
      <Footer />
      <AiChatbotDrawer />
    </div>
  );
}
