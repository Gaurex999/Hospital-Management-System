package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.example.demo.entities.PatientEntity;



@Repository
public interface PatientRepository extends JpaRepository<PatientEntity, Integer>{
	
	 PatientEntity findByUserId(Integer userId);
   
}
