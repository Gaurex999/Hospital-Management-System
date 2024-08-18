package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;
import java.util.stream.Collectors;

import com.example.demo.entities.Booking;
import com.example.demo.entities.Slot;
import com.example.demo.repositories.BookingRepository;
import com.example.demo.services.BookingService;
import com.example.demo.services.SlotService;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/bookings")
@RestController
public class BookingController {

	 @Autowired
	    private BookingService bookingService;
	    
	    @Autowired
	    private SlotService slotService;
	   
	    @Autowired
	    private BookingRepository bookingRepository;

	    @GetMapping
	    public ResponseEntity<List<Booking>> getAllBookings() {
	        List<Booking> bookings = bookingService.getAllBookings();
	        return new ResponseEntity<>(bookings, HttpStatus.OK);
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<Booking> getBookingById(@PathVariable int id) {
	        Optional<Booking> booking = bookingService.getBookingById(id);
	        return booking.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	    }

	    @PostMapping
	    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
	        Booking createdBooking = bookingService.createOrUpdateBooking(booking);
	        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<Booking> updateBooking(@PathVariable int id, @RequestBody Booking booking) {
	        if (bookingService.getBookingById(id).isPresent()) {
	            booking.setBookingId(id);  // Ensure ID is of type int
	            Booking updatedBooking = bookingService.createOrUpdateBooking(booking);
	            return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteBooking(@PathVariable int id) {
	        if (bookingService.getBookingById(id).isPresent()) {
	            bookingService.deleteBooking(id);
	            return ResponseEntity.noContent().build();
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }
	    
	    @GetMapping("/slots/{doctorId}")
	    public ResponseEntity<List<Map<String, Object>>> getSlotsByDoctorId(@PathVariable int doctorId) {
	        List<Slot> slots = slotService.fetchSlots(doctorId); // Updated method call
	        List<Booking> bookings = bookingRepository.findByDoctorId(doctorId);

	        List<Map<String, Object>> slotsWithStatus = slots.stream().map(slot -> {
	            Map<String, Object> slotWithStatus = new HashMap<>();
	            slotWithStatus.put("slotId", slot.getSlotId());
	            slotWithStatus.put("startTime", slot.getStartTime());
	            slotWithStatus.put("endTime", slot.getEndTime());
	            slotWithStatus.put("isBooked", bookings.stream().anyMatch(booking -> booking.getSlotId() == slot.getSlotId()));
	            return slotWithStatus;
	        }).collect(Collectors.toList());

	        return new ResponseEntity<>(slotsWithStatus, HttpStatus.OK);
	    }
	    
	    @GetMapping("/bookings/doctor/{doctorId}")
	    public List<Booking> getBookingsByDoctor(@PathVariable int doctorId) {
	        return bookingRepository.findByDoctorId(doctorId);
	    }
    
}
