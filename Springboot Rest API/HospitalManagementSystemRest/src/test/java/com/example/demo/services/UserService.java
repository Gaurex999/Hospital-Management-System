package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.*;
import com.example.demo.repositories.UserRepository;


@Service
public class UserService {

	  @Autowired
	    private UserRepository userRepository;
	  
	

	    public List<UserEntity> getAllUsers() {
	        return userRepository.findAll();
	    }

	    public Optional<UserEntity> getUserById(int userId) {
	        return userRepository.findById(userId);
	    }

	    public UserEntity createUser(UserEntity user) {
	        return userRepository.save(user);
	    }
	    
	    public boolean usernameExists(String username) {
	        Optional<UserEntity> user = userRepository.findByUserName(username);
	        return user.isPresent();
	    }

	    public UserEntity updateUser(int userId, UserEntity userDetails) {
	        UserEntity user = userRepository.findById(userId).orElseThrow();
	        user.setRoleId(userDetails.getRoleId());
	        user.setUserName(userDetails.getUserName());
	        user.setPassword(userDetails.getPassword());
	        user.setActive(userDetails.getActive());
	        return userRepository.save(user);
	    }

	    public void deleteUser(int userId) {
	        userRepository.deleteById(userId);
	    }
	
	  
	    
	
}
