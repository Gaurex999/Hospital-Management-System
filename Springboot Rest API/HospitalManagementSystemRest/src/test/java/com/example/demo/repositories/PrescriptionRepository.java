package com.example.demo.repositories;

import com.example.demo.entities.PrescriptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrescriptionRepository extends JpaRepository<PrescriptionEntity, Integer> {
    List<PrescriptionEntity> findByPatient_PatientId(int patientId);
}
