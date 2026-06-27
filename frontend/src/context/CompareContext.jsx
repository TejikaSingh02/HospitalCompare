import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [selectedHospitalIds, setSelectedHospitalIds] = useState([1, 2]);

  const toggleHospitalForCompare = (id) => {
    setSelectedHospitalIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((hId) => hId !== id);
      } else {
        if (prev.length >= 4) {
          alert("You can compare a maximum of 4 hospitals at a time.");
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  const clearCompareList = () => setSelectedHospitalIds([]);

  return (
    <CompareContext.Provider value={{ selectedHospitalIds, toggleHospitalForCompare, clearCompareList }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
