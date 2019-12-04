package com.example.boot.EmployeeManagementSystem.repo;

import com.example.boot.EmployeeManagementSystem.bean.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Long> {
    User findByUsername(String username);
}
