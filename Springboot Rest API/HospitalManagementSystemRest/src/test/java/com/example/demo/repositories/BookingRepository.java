package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.*;
import com.example.demo.entities.Booking;


@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {  // Changed Long to Integer
    List<Booking> findByDoctorId(int doctorId);
    List<Booking> findByPatientId(int patientId);
}