package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "doctor")
@Data

public class DoctorEntity {

	   @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "doctor_id")
	    private int doctorId;

	    @Column(name = "user_id")
	    private Integer userId;

	    @Column(name = "first_name")
	    private String firstName;

	    @Column(name = "last_name")
	    private String lastName;

	    @Column(name = "address")
	    private String address;

	    @Column(name = "qualification")	
	    private String qualification;

	    @Column(name = "contact_no")
	    private Double contactNo;

	    @Column(name = "email_id")
	    private String emailId;

	    @Column(name = "aadhar_no")
	    private Double aadharNo;

	    @Column(name = "department_id")
	    private Integer departmentId;
	
}
