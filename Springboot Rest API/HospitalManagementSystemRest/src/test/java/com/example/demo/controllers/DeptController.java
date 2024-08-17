package com.example.demo.controllers;

import com.example.demo.entities.DepartmentEntity;
import com.example.demo.entities.DoctorEntity;
import com.example.demo.entities.Slot;
import com.example.demo.repositories.DepartmentRepository;
import com.example.demo.repositories.DoctorRepository;
import com.example.demo.repositories.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.demo.services.DeptService;
import java.util.List;


@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api")
public class DeptController {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private SlotRepository slotRepository;
    
    @Autowired
    private DeptService departmentService; // Use the combined service

    @GetMapping("/fetchDoctByDept/{id}")
    public List<DoctorEntity> fetchDoctorsByDepartment(@PathVariable Integer id) {
        return doctorRepository.findByDepartmentId(id);
    }

    @GetMapping("/fetchSlotByDoct/{id}")
    public List<Slot> fetchSlotsByDoctor(@PathVariable Integer id) {
        return slotRepository.findByDoctorId(id);
    }
    
    @GetMapping("/departments")
    public List<DepartmentEntity> getDepartments() {
        return departmentService.getAllDepartments(); // Use the combined service
    }
    
}
