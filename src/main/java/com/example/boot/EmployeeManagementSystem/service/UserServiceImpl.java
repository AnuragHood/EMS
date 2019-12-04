package com.example.boot.EmployeeManagementSystem.service;

import com.example.boot.EmployeeManagementSystem.bean.User;
import com.example.boot.EmployeeManagementSystem.repo.RoleRepo;
import com.example.boot.EmployeeManagementSystem.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
public class UserServiceImpl {
    @Autowired
    private UserRepo userRepository;
    @Autowired
    private RoleRepo roleRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public void save(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles(new HashSet<>(roleRepository.findAll()));
        userRepository.save(user);
    }
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
