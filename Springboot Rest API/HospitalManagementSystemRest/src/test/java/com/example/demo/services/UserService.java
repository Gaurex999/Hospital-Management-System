package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.*;
import com.example.demo.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

	  @Autowired
	    private UserRepository userRepository;
	  
	  @Autowired
	    private PasswordEncoder passwordEncoder;

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
	
	    public boolean changePassword(int userId, String oldPassword, String newPassword) {
	        Optional<UserEntity> userOpt = userRepository.findById(userId);
	        if (userOpt.isPresent()) {
	            UserEntity user = userOpt.get();
	            
	            // Check if the old password matches the encrypted password
	            if (passwordEncoder.matches(oldPassword, user.getPassword())) {
	                
	                // Encrypt the new password
	                String encryptedNewPassword = passwordEncoder.encode(newPassword);
	                
	                // Update the user's password
	                user.setPassword(encryptedNewPassword);
	                userRepository.save(user);
	                
	                return true;
	            } else {
	                // Old password doesn't match
	                System.out.println("Old password does not match for user ID: " + userId);
	                return false;
	            }
	        }
	        // User not found
	        System.out.println("User not found with ID: " + userId);
	        return false;
	    }

	    
	
}
