package com.example.demo.services;

import com.example.demo.entities.DepartmentEntity;
import com.example.demo.repositories.DepartmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class DeptService {


    @Autowired
    private DepartmentRepository departmentRepository; // Use the instance

    public List<DepartmentEntity> getAllDepartments() {
        return departmentRepository.findAll(); // Call on the instance
    }

    public DepartmentEntity getDepartmentById(Integer id) {
        Optional<DepartmentEntity> department = departmentRepository.findById(id);
        return department.orElse(null);
    }
}