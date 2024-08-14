package com.example.demo.services;

import com.example.demo.entities.PrescriptionEntity;
import com.example.demo.repositories.PrescriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrescriptionService {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    public List<PrescriptionEntity> getPrescriptionsByPatientId(int patientId) {
        return prescriptionRepository.findByPatient_PatientId(patientId);
    }

    public PrescriptionEntity savePrescription(PrescriptionEntity prescription) {
        return prescriptionRepository.save(prescription);
    }
}
