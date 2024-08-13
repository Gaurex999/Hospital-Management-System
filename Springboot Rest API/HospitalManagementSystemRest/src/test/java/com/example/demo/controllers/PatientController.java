package com.example.demo.controllers;

import java.util.List; // Corrected import
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.PatientEntity;
import com.example.demo.services.PatientService;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping
    public ResponseEntity<List<PatientEntity>> getAllPatients() {
        List<PatientEntity> patients = patientService.getAllPatients(); // Corrected method call
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @GetMapping("/patient")
    public ResponseEntity<PatientEntity> getPatientById(@RequestParam("id") int patientId) {
        Optional<PatientEntity> patient = patientService.getPatientById(patientId);
        return patient.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                      .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    

    @PostMapping
    public ResponseEntity<PatientEntity> createPatient(@RequestBody PatientEntity patient) {
        PatientEntity newPatient = patientService.savePatient(patient); // Corrected method call
        return new ResponseEntity<>(newPatient, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientEntity> updatePatient(@PathVariable("id") int patientId, @RequestBody PatientEntity patientDetails) {
        Optional<PatientEntity> patient = patientService.getPatientById(patientId); // Corrected method call
        
        if (patient.isPresent()) {
            PatientEntity updatedPatient = patient.get();
            updatedPatient.setPatientName(patientDetails.getPatientName());
            updatedPatient.setDateOfBirth(patientDetails.getDateOfBirth());
            updatedPatient.setBloodGroup(patientDetails.getBloodGroup());
            updatedPatient.setPatientAddress(patientDetails.getPatientAddress());
            updatedPatient.setPatientAadharNo(patientDetails.getPatientAadharNo());
            updatedPatient.setPatientEmailId(patientDetails.getPatientEmailId());
            updatedPatient.setPatientContactNo(patientDetails.getPatientContactNo());

            final PatientEntity savedPatient = patientService.savePatient(updatedPatient); // Corrected method call
            return new ResponseEntity<>(savedPatient, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}") // Moved out of @PutMapping method
    public ResponseEntity<Void> deletePatient(@PathVariable("id") int patientId) {
        patientService.deletePatient(patientId); // Corrected method call
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
