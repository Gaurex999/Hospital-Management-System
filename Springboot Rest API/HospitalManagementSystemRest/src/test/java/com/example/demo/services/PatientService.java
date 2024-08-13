package com.example.demo.services;

import java.util.Optional;

import java.util.*;
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
	
}
