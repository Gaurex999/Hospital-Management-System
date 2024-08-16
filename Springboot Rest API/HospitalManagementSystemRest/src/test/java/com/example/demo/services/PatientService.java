package com.example.demo.services;

import java.util.Optional;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.PatientEntity;
import com.example.demo.repositories.PatientRepository;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public List<PatientEntity> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<PatientEntity> getPatientById(int patientId) {
        return patientRepository.findById(patientId);
    }

    public PatientEntity savePatient(PatientEntity patient) {
        return patientRepository.save(patient);
    }

    public void deletePatient(int patientId) {
        patientRepository.deleteById(patientId);
    }
    
    public Optional<PatientEntity> updatePatientProfile(int patientId, PatientEntity patientDetails) {
        Optional<PatientEntity> patient = patientRepository.findById(patientId);
        
        if (patient.isPresent()) {
            PatientEntity updatedPatient = patient.get();
            updatedPatient.setPatientName(patientDetails.getPatientName());
            updatedPatient.setDateOfBirth(patientDetails.getDateOfBirth());
            updatedPatient.setBloodGroup(patientDetails.getBloodGroup());
            updatedPatient.setPatientAddress(patientDetails.getPatientAddress());
            updatedPatient.setPatientAadharNo(patientDetails.getPatientAadharNo());
            updatedPatient.setPatientEmailId(patientDetails.getPatientEmailId());
            updatedPatient.setPatientContactNo(patientDetails.getPatientContactNo());

            patientRepository.save(updatedPatient);
            return Optional.of(updatedPatient);
        } else {
            return Optional.empty();
        }
    }
}
