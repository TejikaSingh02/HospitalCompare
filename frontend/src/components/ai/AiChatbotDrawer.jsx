import React, { useState } from 'react';
import { MessageSquare, X, Send, Sparkles, ShieldAlert, Bot } from 'lucide-react';
import { MOCK_HOSPITALS } from '../../services/mockData';

export default function AiChatbotDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hello! I am your Gemini AI Health Assistant. Ask me about symptoms (e.g., knee pain, heart chest pain, fever), required diagnostic tests, or top hospitals in any city like Aligarh, Agra, Mathura, Delhi, or Mumbai!" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      let botReply = "";
      const query = userMsg.toLowerCase();

      // Check city mention
      let matchedCity = "";
      if (query.includes('aligarh')) matchedCity = "Aligarh";
      else if (query.includes('agra')) matchedCity = "Agra";
      else if (query.includes('mathura')) matchedCity = "Mathura";
      else if (query.includes('delhi')) matchedCity = "New Delhi";
      else if (query.includes('mumbai')) matchedCity = "Mumbai";

      const cityHospitals = matchedCity 
        ? MOCK_HOSPITALS.filter(h => h.city.toLowerCase().includes(matchedCity.toLowerCase()))
        : MOCK_HOSPITALS;

      if (query.includes('knee') || query.includes('joint') || query.includes('ortho')) {
        const topHospital = cityHospitals.find(h => h.specialties.includes('Orthopedics')) || cityHospitals[0];
        botReply = `For knee replacement or joint stiffness, consult the Orthopedics department. Recommended tests include Digital X-Rays and MRI. In ${matchedCity || 'your area'}, top choice is ${topHospital.name} (Fee: ₹${topHospital.consultationFee}, Rating: ${topHospital.rating}⭐).`;
      } else if (query.includes('heart') || query.includes('chest') || query.includes('cardio')) {
        const topHospital = cityHospitals.find(h => h.specialties.includes('Cardiology')) || cityHospitals[0];
        botReply = `Chest discomfort requires immediate Evaluation by Cardiology. Required tests: ECG, Lipid Profile & Echo. Recommended hospital in ${matchedCity || 'our network'}: ${topHospital.name} with 24x7 CathLab (Fee: ₹${topHospital.consultationFee}).`;
      } else if (query.includes('headache') || query.includes('brain') || query.includes('neuro')) {
        const topHospital = cityHospitals.find(h => h.specialties.includes('Neurology') || h.specialties.includes('Neurosciences')) || cityHospitals[0];
        botReply = `Chronic headaches or dizziness should be evaluated by Neurology. Recommended tests: Brain MRI / CT Scan. Top choice: ${topHospital.name} in ${topHospital.city}.`;
      } else if (matchedCity) {
        botReply = `In ${matchedCity}, we recommend ${cityHospitals[0].name} (${cityHospitals[0].type}) and ${cityHospitals[1]?.name || 'District Hospital'}. Both offer 24x7 emergency and cashless insurance clearance.`;
      } else {
        botReply = "I analyze symptoms to recommend departments, tests, and cost estimates. Please mention your symptom or city (e.g. 'Best hospital for heart in Aligarh' or 'Knee surgery cost').";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: botReply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-accent-600 to-purple-600 hover:from-accent-500 text-white p-4 rounded-full shadow-2xl shadow-accent-600/40 flex items-center gap-2 font-bold text-xs transition-transform hover:scale-105"
      >
        <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
        <span>Ask AI Assistant</span>
      </button>

      {/* Chat Drawer */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-slate-950/95 backdrop-blur-xl border-l border-slate-800 flex flex-col justify-between shadow-2xl animate-slideLeft">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-accent-600 flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Gemini AI Health Assistant</h4>
                <span className="text-[10px] text-emerald-400 font-semibold">Online • Educational Advisor</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${m.sender === 'user' ? 'bg-brand-600 text-white rounded-br-none' : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-900/40">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text" placeholder="e.g. Best hospital for heart in Aligarh..." value={input} onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-slate-900 text-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-800 focus:outline-none"
              />
              <button type="submit" className="bg-brand-600 text-white p-2.5 rounded-xl hover:bg-brand-500">
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-slate-500 text-center">AI assistant does not provide formal medical diagnoses.</p>
          </div>
        </div>
      )}
    </>
  );
}
