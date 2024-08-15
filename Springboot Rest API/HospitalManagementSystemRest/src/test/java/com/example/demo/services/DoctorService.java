package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.DoctorEntity;
import com.example.demo.repositories.DoctorRepository;

@Service
public class DoctorService {
	  @Autowired
	    private DoctorRepository doctorRepository;

	    public List<DoctorEntity> getAllDoctors() {
	        return doctorRepository.findAll();
	    }

	    public Optional<DoctorEntity> getDoctorById(int doctorId) {
	        Optional<DoctorEntity> doctor = doctorRepository.findById(doctorId);
	        System.out.println("Fetching doctor with ID: " + doctorId);
	        doctor.ifPresent(d -> System.out.println("Found doctor: " + d));
	        return doctor;
	    }

	    public DoctorEntity saveDoctor(DoctorEntity doctor) {
	        return doctorRepository.save(doctor);
	    }

	    public void deleteDoctor(int doctorId) {
	        doctorRepository.deleteById(doctorId);
	    }

	    // Method to get doctor by userId
	    public DoctorEntity getDoctorByUserId(Integer userId) {
	        return doctorRepository.findByUserId(userId);
	    }
	    
	}

