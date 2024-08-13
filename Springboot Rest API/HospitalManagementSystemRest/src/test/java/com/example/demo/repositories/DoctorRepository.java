package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.DoctorEntity;

@Repository
public interface DoctorRepository extends JpaRepository<DoctorEntity, Integer> {
}
