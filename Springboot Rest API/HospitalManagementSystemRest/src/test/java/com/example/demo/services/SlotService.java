package com.example.demo.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.entities.Slot;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.repositories.SlotRepository;

@Service
public class SlotService {

    @Autowired
    private SlotRepository slotRepository;

    public void generateSlots(Integer doctorId, LocalDateTime start, LocalDateTime end, LocalDate date) {
        List<Slot> slots = new ArrayList<>();

        LocalDateTime currentStart = start;
        while (currentStart.isBefore(end)) {
            LocalDateTime currentEnd = currentStart.plusMinutes(30); // Assuming 30-minute slots
            if (currentEnd.isAfter(end)) break;

            Slot slot = new Slot();
            slot.setDoctorId(doctorId);
            slot.setSlotDate(date);
            slot.setStartTime(currentStart);
            slot.setEndTime(currentEnd);

            slots.add(slot);
            currentStart = currentEnd;
        }

        slotRepository.saveAll(slots);
    }

    public List<Slot> fetchSlots(Integer doctorId) {
        return slotRepository.findByDoctorId(doctorId);
    }
}
