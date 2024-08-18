package com.example.demo.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;



@Entity
@Table(name = "booking")
@Data
public class Booking {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int bookingId; // Changed to int

	    private int doctorId; // Changed to int
	    private int patientId; // Changed to int
	    private int slotId; // Changed to int
	    private String bookingStatus;
	    private LocalDate bookingDate;

	    // Getters and Setters
	    public int getBookingId() {
	        return bookingId;
	    }

	    public void setBookingId(int bookingId) {
	        this.bookingId = bookingId;
	    }

	    public int getDoctorId() {
	        return doctorId;
	    }

	    public void setDoctorId(int doctorId) {
	        this.doctorId = doctorId;
	    }

	    public int getPatientId() {
	        return patientId;
	    }

	    public void setPatientId(int patientId) {
	        this.patientId = patientId;
	    }

	    public int getSlotId() {
	        return slotId;
	    }

	    public void setSlotId(int slotId) {
	        this.slotId = slotId;
	    }

	    public String getBookingStatus() {
	        return bookingStatus;
	    }

	    public void setBookingStatus(String bookingStatus) {
	        this.bookingStatus = bookingStatus;
	    }

	    public LocalDate getBookingDate() {
	        return bookingDate;
	    }

	    public void setBookingDate(LocalDate bookingDate) {
	        this.bookingDate = bookingDate;
	    }
	}
	

