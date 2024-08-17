package com.example.demo.repositories;

import com.example.demo.entities.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.example.demo.entities.DoctorEntity;

@Repository
public interface DoctorRepository extends JpaRepository<DoctorEntity, Integer> {
	  DoctorEntity findByUserId(Integer userId);
	  List<Slot> findByDoctorId(Integer doctorId);
	  List<DoctorEntity> findByDepartmentId(Integer departmentId);
}
