import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, ShieldCheck, Phone, Clock, Calendar, User, CheckCircle, Award, Stethoscope } from 'lucide-react';
import { MOCK_HOSPITALS, MOCK_DOCTORS } from '../services/mockData';
import { useAuth } from '../context/AuthContext';

export default function HospitalDetailPage() {
  const { id } = useParams();
  const hospital = MOCK_HOSPITALS.find((h) => h.id === Number(id)) || MOCK_HOSPITALS[0];
  const hospitalDoctors = MOCK_DOCTORS.filter((d) => d.hospitalId === hospital.id);

  const { user } = useAuth();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingDate, setBookingDate] = useState('2026-06-30');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in as a registered user to book appointment slots.");
      return;
    }
    setBookingConfirmed(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="relative h-72 md:h-96 rounded-3xl overflow-hidden border border-slate-800">
        <img src={hospital.coverImageUrl} alt={hospital.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6 md:p-10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-lg">{hospital.type} Institution</span>
              {hospital.isNabhAccredited && (
                <span className="bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> NABH Accredited
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white">{hospital.name}</h1>
            <p className="text-slate-300 text-sm flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-400" /> {hospital.address}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="glass-card p-4 rounded-2xl text-center border border-slate-800">
              <div className="text-slate-400 text-xs">Consultation Fee</div>
              <div className="text-xl font-bold text-emerald-400 mt-1">₹{hospital.consultationFee}</div>
            </div>
            <div className="glass-card p-4 rounded-2xl text-center border border-slate-800">
              <div className="text-slate-400 text-xs">Rating</div>
              <div className="text-xl font-bold text-amber-400 mt-1 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-400" /> {hospital.rating}
              </div>
            </div>
            <div className="glass-card p-4 rounded-2xl text-center border border-slate-800">
              <div className="text-slate-400 text-xs">ICU Beds Free</div>
              <div className="text-xl font-bold text-white mt-1">{hospital.availableBeds} Beds</div>
            </div>
            <div className="glass-card p-4 rounded-2xl text-center border border-slate-800">
              <div className="text-slate-400 text-xs">Avg Wait Time</div>
              <div className="text-xl font-bold text-slate-300 mt-1">{hospital.waitingTimeMinutes}m</div>
            </div>
          </div>

          {/* Specialties */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-lg">Specialized Departments</h3>
            <div className="flex flex-wrap gap-2">
              {hospital.specialties.map((sp, i) => (
                <span key={i} className="bg-slate-900 text-slate-200 text-xs px-3 py-1.5 rounded-xl border border-slate-800 font-medium">
                  {sp}
                </span>
              ))}
            </div>
          </div>

          {/* Doctors List */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-xl">Available Specialists ({hospitalDoctors.length})</h3>
            <div className="space-y-4">
              {hospitalDoctors.map((doc) => (
                <div key={doc.id} className="glass-card p-5 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={doc.avatarUrl} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-700" />
                    <div>
                      <h4 className="font-bold text-white text-base">{doc.name}</h4>
                      <p className="text-xs text-slate-400">{doc.qualification}</p>
                      <div className="flex items-center gap-3 text-xs mt-1">
                        <span className="text-brand-400 font-semibold">{doc.specialization}</span>
                        <span className="text-slate-500">• {doc.experienceYears} Years Exp</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => { setSelectedDoctor(doc); setBookingConfirmed(false); }}
                    className="w-full sm:w-auto bg-brand-600 hover:bg-brand-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all"
                  >
                    Book Consultation (₹{doc.consultationFee})
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base">Hospital Information</h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-rose-400" /> Emergency Hotline: <strong className="text-white">{hospital.emergencyContact}</strong>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-400" /> Operating Hours: <strong className="text-white">24 Hours / 7 Days</strong>
              </div>
            </div>
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">Accepted TPA Insurances</span>
              <div className="flex flex-wrap gap-1.5">
                {hospital.acceptedInsurances.map((ins, idx) => (
                  <span key={idx} className="bg-slate-900 text-slate-300 text-[10px] px-2 py-1 rounded border border-slate-800">
                    {ins}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 max-w-md w-full space-y-6 relative animate-scaleIn">
            <button onClick={() => setSelectedDoctor(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>

            {bookingConfirmed ? (
              <div className="text-center py-6 space-y-4">
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="font-extrabold text-white text-2xl">Appointment Confirmed!</h3>
                <p className="text-slate-300 text-xs">Slot confirmed with <strong>{selectedDoctor.name}</strong> for {bookingDate} at {selectedSlot || '10:00 AM'}. Receipt sent to your email.</p>
                <button onClick={() => setSelectedDoctor(null)} className="w-full py-3 bg-brand-600 text-white font-bold rounded-xl text-xs">
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-brand-400 uppercase">Consultation Slot</span>
                  <h3 className="font-extrabold text-white text-xl">Book {selectedDoctor.name}</h3>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300">Select Date</label>
                  <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="w-full bg-slate-900 text-white text-xs px-3 py-2.5 rounded-xl border border-slate-800" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300">Select Available Time Slot</label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedDoctor.availableSlots.map((slot, i) => (
                      <button
                        type="button" key={i} onClick={() => setSelectedSlot(slot)}
                        className={`py-2 text-xs font-semibold rounded-xl border ${selectedSlot === slot ? 'bg-brand-600 text-white border-brand-500' : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'}`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="submit" className="w-full py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-600/20">
                  Confirm Booking (Pay at Hospital ₹{selectedDoctor.consultationFee})
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
