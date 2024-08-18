package com.example.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.PatientEntity;
import com.example.demo.services.PatientService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping
    public ResponseEntity<List<PatientEntity>> getAllPatients() {
        List<PatientEntity> patients = patientService.getAllPatients();
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

    @GetMapping("/patient")
    public ResponseEntity<?> getPatientById(@RequestParam("id") int patientId) {
        Optional<PatientEntity> patient = patientService.getPatientById(patientId);
        if (patient.isPresent()) {
            return new ResponseEntity<>(patient.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("{\"error\":\"Patient not found\"}", HttpStatus.NOT_FOUND);
        }
    }	

    @PostMapping
    public ResponseEntity<PatientEntity> createPatient(@RequestBody PatientEntity patient) {
        PatientEntity newPatient = patientService.savePatient(patient);
        return new ResponseEntity<>(newPatient, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientEntity> updatePatient(@PathVariable("id") int patientId, @RequestBody PatientEntity patientDetails) {
        Optional<PatientEntity> patient = patientService.getPatientById(patientId);
        
        if (patient.isPresent()) {
            PatientEntity updatedPatient = patient.get();
            updatedPatient.setPatientName(patientDetails.getPatientName());
            updatedPatient.setDateOfBirth(patientDetails.getDateOfBirth());
            updatedPatient.setBloodGroup(patientDetails.getBloodGroup());
            updatedPatient.setPatientAddress(patientDetails.getPatientAddress());
            updatedPatient.setPatientAadharNo(patientDetails.getPatientAadharNo());
            updatedPatient.setPatientEmailId(patientDetails.getPatientEmailId());
            updatedPatient.setPatientContactNo(patientDetails.getPatientContactNo());

            PatientEntity savedPatient = patientService.savePatient(updatedPatient);
            return new ResponseEntity<>(savedPatient, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable("id") int patientId) {
        patientService.deletePatient(patientId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // API endpoint for updating patient profile
    @PutMapping("/profile/{id}")
    public ResponseEntity<PatientEntity> updatePatientProfile(@PathVariable("id") int patientId, @RequestBody PatientEntity patientDetails) {
        Optional<PatientEntity> patient = patientService.updatePatientProfile(patientId, patientDetails);
        
        return patient.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                      .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}