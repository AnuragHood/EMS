package com.example.boot.EmployeeManagementSystem.service;

public interface SecurityService {

    String findLoggedInUsername();

    void autoLogin(String username, String password);
}
