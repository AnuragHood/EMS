package com.example.boot.EmployeeManagementSystem.repo;

import com.example.boot.EmployeeManagementSystem.bean.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role,Long> {
}
