package com.example.demo.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.example.demo.entities.UserEntity;
import com.example.demo.services.UserService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

	   @Autowired
	    private UserService userService;

	    @GetMapping
	    public List<UserEntity> getAllUsers() {
	        return userService.getAllUsers();
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<UserEntity> getUserById(@PathVariable int id) {
	        Optional<UserEntity> user = userService.getUserById(id);
	        if (user.isPresent()) {
	            return ResponseEntity.ok(user.get());
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

	    @PostMapping
	    public UserEntity createUser(@RequestBody UserEntity user) {
	        return userService.createUser(user);
	    }

	    @PutMapping("/{id}")
	    public ResponseEntity<UserEntity> updateUser(@PathVariable int id, @RequestBody UserEntity userDetails) {
	        UserEntity updatedUser = userService.updateUser(id, userDetails);
	        return ResponseEntity.ok(updatedUser);
	    }
	    
	    
	    @GetMapping("/check-username")
	    public ResponseEntity<Boolean> checkUsername(@RequestParam String username) {
	        boolean exists = userService.usernameExists(username);
	        return ResponseEntity.ok(exists);
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
	        userService.deleteUser(id);
	        return ResponseEntity.noContent().build();
	    }
	    
	    @PutMapping("/change-password/{id}")
	    public ResponseEntity<String> changePassword(@PathVariable int id, @RequestBody Map<String, String> passwords) {
	        String oldPassword = passwords.get("oldPassword");
	        String newPassword = passwords.get("newPassword");

	        boolean success = userService.changePassword(id, oldPassword, newPassword);
	        if (success) {
	            return ResponseEntity.ok("Password changed successfully");
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to change password");
	        }
	    }
	
}
