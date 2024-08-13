package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "patient")
public class PatientEntity {

	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "patient_id")
	    private int patientId;

	    @Column(name = "user_id")
	    private int userId;

	    @Column(name = "patient_name")
	    private String patientName;

	    @Column(name = "date_of_birth")
	    private String dateOfBirth;

	    @Column(name = "blood_group")
	    private String bloodGroup;

	    @Column(name = "patient_address")
	    private String patientAddress;

	    @Column(name = "patient_aadhar_no")
	    private String patientAadharNo;

	    @Column(name = "patient_email_id")
	    private String patientEmailId;

	    @Column(name = "patient_contact_no")
	    private double patientContactNo;

	    // Getters and Setters
	
}
