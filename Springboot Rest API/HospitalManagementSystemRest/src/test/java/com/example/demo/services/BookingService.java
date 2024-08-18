package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.entities.Booking;
import com.example.demo.repositories.BookingRepository;
import java.util.*;

@Service
public class BookingService {
    
	@Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Optional<Booking> getBookingById(int id) {  // Changed Long to int
        return bookingRepository.findById(id);
    }

    public Booking createOrUpdateBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public void deleteBooking(int id) {  // Changed Long to int
        bookingRepository.deleteById(id);
    }
}
