package com.example.demo.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.ManyToAny;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.Data;




@Entity
@Data
@Table(name = "slot")
public class Slot {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "slot_id")
	    private Integer slotId;

	    @Column(name = "doctor_id")
	    private Integer doctorId;

	    @Column(name = "slot_date")
	    private LocalDateTime slotDate; // Updated field for the date of the slot

	    @Column(name = "start_time")
	    private LocalDateTime startTime;

	    @Column(name = "end_time")
	    private LocalDateTime endTime;

	    // Optionally, you can add constructors, if needed
	    public Slot() {}

	    public Slot(Integer doctorId, LocalDateTime slotDate, LocalDateTime startTime, LocalDateTime endTime) {
	        this.doctorId = doctorId;
	        this.slotDate = slotDate; // Include the slot date
	        this.startTime = startTime;
	        this.endTime = endTime;
	    }
	
	
}
