package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootApplication
class HospitalManagementSystemRestApplicationTests {

	public static void main(String[] args)
	{
		SpringApplication.run(HospitalManagementSystemRestApplication.class, args);
		System.out.println("hello");
	}

}
