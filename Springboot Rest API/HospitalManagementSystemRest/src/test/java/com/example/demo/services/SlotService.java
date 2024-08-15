package com.example.demo.services;
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

	    public void generateSlots(int doctorId, LocalDateTime start, LocalDateTime end, LocalDateTime date) {
	        List<Slot> slots = new ArrayList<>();

	        while (start.isBefore(end)) {
	            Slot slot =  new Slot();
	            slot.setDoctorId(doctorId);
	            slot.setSlotDate(date); // Set the slot date
	            slot.setStartTime(start);
	            slot.setEndTime(start.plusMinutes(30)); // Assuming each slot is 30 minutes
	            slots.add(slot);

	            start = start.plusMinutes(30);
	        }

	        slotRepository.saveAll(slots); // Save all slots at once
	    }

	    public List<Slot> fetchSlots(int doctorId) {
	        return slotRepository.findByDoctorId(doctorId);
	    }
	
}
