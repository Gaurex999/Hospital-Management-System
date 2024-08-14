package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.PrescriptionEntity;
import com.example.demo.services.PrescriptionService;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
public class PrescriptionController {
    @Autowired
    private PrescriptionService prescriptionService;

    @GetMapping("/patient")
    public List<PrescriptionEntity> getPrescriptionsByPatientId(@RequestParam("patientId") int patientId) {
        return prescriptionService.getPrescriptionsByPatientId(patientId);
    }
}
