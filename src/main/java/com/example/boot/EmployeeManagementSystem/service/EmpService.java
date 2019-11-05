package com.example.boot.EmployeeManagementSystem.service;

import com.example.boot.EmployeeManagementSystem.bean.Employee;

import java.util.Optional;

public interface EmpService {
    Iterable<Employee> getEmployees(Integer index1, Integer index2);

    Employee createEmployee(Employee employee);

    String updateEmployee(Employee employee);

    String deleteEmployee(Long id);

    Optional<Employee> getEmpById(Long id);

    Iterable<Employee> searchEmployee(String param, int index1, int index2);

    Integer getRecordCount();

    Integer getSearchRecordCount(String param);
}
