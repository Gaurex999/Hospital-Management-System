package com.example.demo.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Slot;
import com.example.demo.services.SlotService;


@RestController
@RequestMapping("/slots")
@CrossOrigin(origins = "http://localhost:3000")
public class SlotController {

	  @Autowired
	    private SlotService slotService;

	    @PostMapping("/generate")
	    public void generateSlots(@RequestParam int doctorId, 
	                              @RequestParam String startTime, 
	                              @RequestParam String endTime, 
	                              @RequestParam String slotDate) {
	        LocalDateTime start = LocalDateTime.parse(startTime);
	        LocalDateTime end = LocalDateTime.parse(endTime);
	        LocalDateTime date = LocalDateTime.parse(slotDate);

	        slotService.generateSlots(doctorId, start, end, date);
	    }

	    @GetMapping("/fetch")
	    public List<Slot> fetchSlots(@RequestParam int doctorId) {
	        return slotService.fetchSlots(doctorId);
	    }
	    
	
	
}
