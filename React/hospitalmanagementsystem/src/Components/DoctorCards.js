// components/DoctorCard.js
import React from 'react';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <img src={doctor.imageUrl} alt={doctor.name} className="doctor-card__image" />
      <h3 className="doctor-card__name">{doctor.name}</h3>
      <p className="doctor-card__specialty">{doctor.specialty}</p>
      <p className="doctor-card__location">{doctor.location}</p>
    </div>
  );
};

export default DoctorCard;
